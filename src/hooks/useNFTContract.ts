import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, toNano } from "ton-core";
import { useQuery } from "@tanstack/react-query";
import { CHAIN } from "@tonconnect/protocol";
import { MintNft, NftMinter } from "../wrappers/NftMinter";

export function useNFTContract() {
  const { client } = useTonClient();
  const { sender, network } = useTonConnect();

  const minterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new NftMinter(
      Address.parse(
        network === CHAIN.MAINNET
          ? "EQA23il1enpk1ibZ19tiJrmZeTGWW1dhio-Bb1wYjs0h9thr"
          : "EQBfhSH-QZisZD9JepF8L-C6wrD3Dma1SEYztvQhQAnGBoU3"
      ) // replace with your address from tutorial 2 step 8
    );
    return client.open(contract) as OpenedContract<NftMinter>;
  }, [client]);

  // const { data, isFetching } = useQuery(
  //   ["counter"],
  //   async () => {
  //     if (!minterContract) return null;
  //     return (await minterContract!.getCounter()).toString();
  //   },
  //   { refetchInterval: 3000 }
  // );

  return {
    // value: isFetching ? null : data,
    address: minterContract?.address.toString(),
    sendMintNft: (data: any) => {
      const message: MintNft = {
        $$type: "MintNft",
        body: data,
      };
      return minterContract?.send(sender, { value: toNano("0.2") }, message);
    },
  };
}
