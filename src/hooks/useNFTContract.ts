import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, toNano } from "ton-core";
import { CHAIN } from "@tonconnect/protocol";
import {
  ChangeCollectionOwner,
  MintNft,
  NftMinter,
} from "../wrappers/NftMinter";

export function useNFTContract() {
  const { client } = useTonClient();
  const { sender, network } = useTonConnect();

  const minterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = new NftMinter(
      Address.parse(
        network === CHAIN.MAINNET
          ? "EQCrapCQJNp5yySehDBOaRqx6OumZLBZMJPGhLuCy2_ymwjt"
          : "kQDkj6cv-MWCEflGL937yR3cxT-v0eST4ljyLoba_YSO_mLM"
      )
    );
    return client.open(contract) as OpenedContract<NftMinter>;
  }, [client]);
  // : "EQBVa1c5fEf02D1DUxjoIVJtzy7gMznyaiteVN8nCbEFFwce"

  return {
    address: minterContract?.address.toString(),
    sendMintNft: (data: any) => {
      // console.log(data);
      const message: MintNft = {
        $$type: "MintNft",
        body: data.body,
        amount: data.amount,
        collection_address: data.address,
      };
      return minterContract?.send(sender, { value: data.value }, message);
    },
    sendChangeOwner: (data: any) => {
      const message: ChangeCollectionOwner = {
        $$type: "ChangeCollectionOwner",
        body: data.body,
        collection_address: data.address,
      };
      return minterContract?.send(sender, { value: toNano("0.05") }, message);
    },
  };
}
