import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract } from "ton-core";
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
          ? "EQATBr6L5eDWA6w7Lj85ebYqDa1nJnL2UJZ-xoH0wk6WbPfB"
          : "EQBVa1c5fEf02D1DUxjoIVJtzy7gMznyaiteVN8nCbEFFwce"
      )
    );
    return client.open(contract) as OpenedContract<NftMinter>;
  }, [client]);

  return {
    address: minterContract?.address.toString(),
    sendMintNft: (data: any) => {
      console.log(data);
      const message: MintNft = {
        $$type: "MintNft",
        body: data.body,
        amount: data.amount,
        collection_address: data.address,
      };
      return minterContract?.send(sender, { value: data.value }, message);
    },
  };
}
