import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";
import { Address, OpenedContract, toNano } from "ton-core";
import { CHAIN } from "@tonconnect/protocol";
import { useQuery } from "@tanstack/react-query";
import {
  ChangeCollectionOwner,
  ChangeContractOwner,
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
          ? "EQDAJH6RrRtrDMPW5N5q7zPsVv8t1X3sIpDiVmAItQClmLF8"
          : "kQAEbR8KLw8qHaOru5wUZon-c-e3xEgvGuwhb-yQX6W9rA2g"
      )
    );
    return client.open(contract) as OpenedContract<NftMinter>;
  }, [client]);
  // ? "EQCrapCQJNp5yySehDBOaRqx6OumZLBZMJPGhLuCy2_ymwjt"
  // : "EQBVa1c5fEf02D1DUxjoIVJtzy7gMznyaiteVN8nCbEFFwce"

  // const { data, isFetching } = useQuery(
  //   ["allCodes"],
  //   async () => {
  //     if (!minterContract) return null;
  //     return await minterContract!.getUserCode();
  //   },
  //   { refetchInterval: 3000 }
  // );

  // const { data, isFetching } = useQuery(
  //   ["allCodes"],
  //   async () => {
  //     if (!minterContract) return null;
  //     return (await minterContract!.getAllCodes());
  //   },
  //   { refetchInterval: 3000 }
  // );

  return {
    // referralCode: isFetching ? null : data?.get(minterContract?.address!),
    address: minterContract?.address.toString(),
    sendMintNft: (data: any) => {
      const message: MintNft = {
        $$type: "MintNft",
        body: data.body,
        amount: data.amount,
        refCode: 110n,
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
    sendContractChangeOwner: (data: any) => {
      const message: ChangeContractOwner = {
        $$type: "ChangeContractOwner",
        newOwner: data.address,
      };
      return minterContract?.send(sender, { value: toNano("0.05") }, message);
    },
    getCode: () => {
      return minterContract?.send(
        sender,
        { value: toNano("0.05") },
        "get referral code"
      );
    },
    fetchCode: async (address: Address) => {
      return (await minterContract!.getUserCode()).get(address);
    },
    // getOwner: async (address: Address) => {
    //   return (await minterContract!.getOwner);
    // },
  };
}
