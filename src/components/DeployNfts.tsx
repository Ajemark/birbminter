import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Address,
  beginCell,
  Cell,
  toNano,
  TupleItemCell,
  TupleItemInt,
} from "ton-core";
import { TupleItemSlice } from "ton-core/dist/tuple/tuple";
import { Queries } from "../contracts/getgemsCollection/NftCollection.data";
import { useTonClient } from "../store/tonClient";
import { decodeOffChainContent } from "../contracts/nft-content/nftContent";
import { Buffer } from "buffer";
import { useNFTContract } from "../hooks/useNFTContract";
import { ApiSettings } from "./ApiSettings";
import { MintNft, storeMintNft } from "../utils/utils";

window.Buffer = window.Buffer || Buffer;

interface CollectionInfo {
  content: string;
  base: string;
  owner: Address;
  // nftEditable: boolean;
  nextItemIndex: string;
}
export function DeployNfts() {
  const tonClient = useTonClient();
  const { fetchCode, getCode, sendChangeOwner, sendContractChangeOwner } =
    useNFTContract();

  const [collectionInfo, setCollectionInfo] = useState<CollectionInfo>({
    content: "",
    base: "",
    owner: new Address(0, Buffer.from([])),
    nextItemIndex: "1",
  });

  const [collectionAddress, setCollectionAddress] = useState(
    "EQA23il1enpk1ibZ19tiJrmZeTGWW1dhio-Bb1wYjs0h9thr"
  );
  // const [collectionAddress, setCollectionAddress] = useState(
  //   "kQD6Hny_fI0d1eioEVEL5vPWizsWtl6hK1R69qJIYgqk7SjD"
  // );

  const zeroAddress = new Address(0, Buffer.from([]));
  const [start, setStart] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const [refCode, setRefCode] = useState<number>(1);
  const [code, setCode] = useState<bigint | null>(null);
  const [batchSize, setBatchSize] = useState<number>(50);
  const [template, setTemplate] = useState<string>("{id}.json");
  const [mintGram, setMintGram] = useState<string>("0.05");
  const [colOwner, setColOwner] = useState(zeroAddress.toString());
  const [error, setError] = useState("");
  const [disableBTN, setdisableBTN] = useState(false);
  const [load, setLoad] = useState(false);
  const totalNFT = 4995;

  const replaceId = (template: string, id: number) => {
    return template.replace(/{id}/g, id.toString());
  };

  const getRefData = async () => {
    if (!tonConnectUI.account?.address) return;
    if (code) return;

    setTimeout(() => {
      let getD = async () => {
        setLoad(!load);
        setCode(
          (await fetchCode(Address.parse(tonConnectUI.account?.address!))) ?? 1n
        );
      };
      getD();
    }, 3000);
  };

  const updateInfo = async () => {
    setCollectionInfo({
      content: "",
      base: "",
      owner: new Address(0, Buffer.from([])),
      // nftEditable: false,
      nextItemIndex: "-1",
    });

    let address: Address;
    try {
      address = Address.parse(collectionAddress);
    } catch (e) {
      return;
    }
    const account = await tonClient.value.getContractState(address);

    const contentInfo = await tonClient.value.callGetMethod(
      address,
      "get_collection_data"
    );

    const [nextItemIndex, collectionContent, collectionOwner] = [
      contentInfo.stack.pop(),
      contentInfo.stack.pop(),
      contentInfo.stack.pop(),
    ] as [
      TupleItemInt, // bn
      TupleItemCell, // cell
      TupleItemSlice, // slice
    ];
    const content = decodeOffChainContent(collectionContent.cell);

    const baseInfo = await tonClient.value.callGetMethod(
      address,
      "get_nft_content",
      [
        {
          type: "int",
          value: 0n,
        },
        { type: "cell", cell: new Cell() },
      ]
    );

    const cell = (baseInfo.stack.pop() as TupleItemCell).cell;
    const baseContent = decodeOffChainContent(cell);

    setCollectionInfo({
      nextItemIndex: nextItemIndex.value.toString(),
      content,
      base: baseContent,
      owner: collectionOwner.cell.asSlice().loadAddress(),
      // nftEditable: isNftCollectionNftEditable(
      //   Cell.fromBoc(account.data || Buffer.from([]))[0]
      // ),
    });
    setStart(Number(nextItemIndex.value));
  };

  useEffect(() => {
    updateInfo();
  }, [collectionAddress, tonClient]);

  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    getRefData();
  }, [tonConnectUI, load, tonConnectUI.account?.address, tonClient]);

  const mintContent = useMemo(() => {
    if (!count || count < 1) {
      return [];
    }

    if (!tonConnectUI.account?.address) {
      return [];
    }

    const messages = [];

    const ids = [...Array(count)].map((_, i) => start + i);

    while (ids.length > 0) {
      const nftIds = ids.splice(0, batchSize);

      const mintBody = nftIds.map((i) => {
        return Queries.batchMint({
          items: [
            {
              passAmount: toNano(mintGram),
              content: replaceId(template || "", i),
              index: i,
              ownerAddress: Address.parse(tonConnectUI.account?.address || ""),
            },
          ],
        });
      });

      messages.push(...mintBody);
    }

    return messages;
  }, [
    start,
    count,
    template,
    collectionInfo,
    tonConnectUI.account,
    tonClient,
    mintGram,
  ]);

  useEffect(() => {
    if (disableBTN)
      setTimeout(() => {
        setdisableBTN(false);
      }, 10000);

    if (error == "") return;
    setTimeout(() => {
      setError("");
    }, 4000);
  }, [error, disableBTN]);

  const sendTx = useCallback(async () => {
    setError("");
    if (count < 0) {
      setError("Kindly Enter number of nft to mint");
      return;
    }

    if (!tonConnectUI.connected) {
      setError("Kindly Connect Your Wallet");
      return;
    }

    const isGiveAway =
      Address.normalize(tonConnectUI.account?.address!) ==
      Address.normalize(
        Address.parse("UQDMlia7vYESpFmCnQdYwrPXKuv1O4e6HDXC7jS-rb9R2j99")
      );

    console.log(refCode);
    const messages = mintContent.map((content) => {
      const mess: MintNft = {
        $$type: "MintNft",
        body: content,
        refCode: BigInt(refCode),
        amount: 1n,
        collection_address: Address.parse(collectionAddress),
      };

      const body = beginCell().store(storeMintNft(mess)).endCell();

      return {
        address: "EQDAJH6RrRtrDMPW5N5q7zPsVv8t1X3sIpDiVmAItQClmLF8",
        amount: !isGiveAway
          ? (toNano((6).toString()) + toNano("0.05")).toString()
          : toNano("0.05").toString(),
        payload: body?.toBoc().toString("base64"),
      };
    });
    setdisableBTN(true);
    const res = tonConnectUI.sendTransaction({
      messages,
      validUntil: Date.now() + 5 * 60 * 1000,
    });

    setTimeout(() => {
      updateInfo();
      setdisableBTN(false);
    }, 10000);
  }, [mintContent]);

  const sendChangeTx = useCallback(() => {
    console.log("first");
    setError("");
    if (!tonConnectUI.connected) {
      setError("Kindly Connect Your Wallet");
      return;
    }

    console.log(colOwner.toString(), zeroAddress.toString());
    if (colOwner.toString() == zeroAddress.toString()) {
      setError("Enter new owner address");
      return;
    }

    const query = Queries.changeOwner({
      newOwner: Address.parse(colOwner),
    });

    sendChangeOwner({
      body: query,
      address: Address.parse(collectionAddress),
    });
  }, [colOwner]);

  const sendChangeContractTx = useCallback(() => {
    setError("");
    if (!tonConnectUI.connected) {
      setError("Kindly Connect Your Wallet");
      return;
    }

    console.log(colOwner.toString(), zeroAddress.toString());
    if (colOwner.toString() == zeroAddress.toString()) {
      setError("Enter new owner address");
      return;
    }

    sendContractChangeOwner({
      address: Address.parse(collectionAddress),
    });
  }, [colOwner]);

  return (
    <div className="mx-auto min-h-[100vh] w-full bg-[#2f2f33] pb-16 flex flex-col">
      {error != "" && (
        <div className="fixed z-[99999999999999]  top-[calc(50%)] left-0 w-[100vw] h-[100vh]">
          <div
            className="p-4 mb-4 text-center mx-auto w-[80%] text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium text-xl">Danger Alert!</span> <br />{" "}
            {error}
          </div>
        </div>
      )}

      <div className="w-full relative h-[250px] lg:h-[350px] bg-[url('https://ipfs.io/ipfs/QmWbKPPavM9Uu6zq8TkTNDajrGuLxb3zyUkmDKUmjbR8Ht/B16C866E-068E-46E2-842F-866817CECF1D.jpeg')] ">
        <div className="bg-[rgba(0,0,0,0.4)] absolute top-0 left-0 w-full h-full"></div>
      </div>
      <div className="lg:mt-[-180px] mt-[-110px] max-w-2xl justify-between w-full mx-auto items-center flex p-10 z-40">
        <img
          className="w-[100px] h-[100px] lg:w-[200px] lg:h-[200px] rounded-xl"
          src="https://ipfs.io/ipfs/QmcSQadxGMin8VuZGBVUTSykLTsiNnoacgv2UnNkgjMt38/IMG_8168.jpeg"
        />
        <div className="flex justify-end flex-col items-end   lg:mt-[-150px]  ">
          <TonConnectButton />
          <ApiSettings />
        </div>
      </div>

      <div className="w-[70%] max-w-2xl mt-[30px] text-white mx-auto">
        <h2 className="text-lg text-center uppercase font-bold mb-4">
          Mint Birb Nfts
        </h2>

        <div className="bg-gray-700 p-5 rounded-xl">
          <div className="flex justify-between ">
            <div className="flex items-center">
              <p>Your Referral Code </p>
            </div>
            <p>
              {code == null ? (
                <button
                  onClick={getCode}
                  className="px-2 rounded-lg py-1 bg-blue-600"
                >
                  Get Code
                </button>
              ) : (
                code.toString()
              )}
            </p>
          </div>
          <div className="flex my-2 justify-between ">
            <p>Total NFT </p> <p>{totalNFT}</p>
          </div>
          <div className="bg-[#2f2f33] my-3">
            <div
              className="h-1"
              style={{
                background: "#007aff",
                width: `${(Number(collectionInfo.nextItemIndex) / totalNFT) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-gray-500 text-center">
            Minted {collectionInfo.nextItemIndex} out of {totalNFT} NFT
          </p>
        </div>

        <div className="mt-5">
          <p className="my-2">
            Number of NFTs to be minted (4 Maximum limit per mint) 6 Ton per NFT
          </p>
          <input
            type="text"
            name=""
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full h-10 rounded-lg bg-gray-300 p-3 text-black"
          />
        </div>
        <div className="mt-5 ">
          <p className="my-2">Enter Referral Code</p>
          <div className="flex overflow-hidden rounded-lg bg-gray-300 h-10">
            <input
              type="text"
              name=""
              value={refCode}
              onChange={(e) => setRefCode(Number(e.target.value))}
              className="flex-1 h-10 p-3 text-black"
            />
            {/* <button className="p-2 bg-blue-600 w-fit">Get refCode</button> */}
          </div>
        </div>

        <div className="flex justify-center">
          <button
            disabled={Number(collectionInfo.nextItemIndex) < 0 || disableBTN}
            onClick={sendTx}
            style={{
              opacity:
                Number(collectionInfo.nextItemIndex) < 0 &&
                !tonConnectUI.connected
                  ? 0.3
                  : 1,
            }}
            className="mt-4 px-4 py-2 rounded text-white w-[50%] bg-blue-600 "
          >
            {disableBTN ? "Please Wait ..." : "Mint Birb"}
          </button>
        </div>

        {/* collectionInfo.owner.toString() ==
          Address.parse(tonConnectUI.account?.address!).toString() &&  */}
        {/* {tonConnectUI.account && (
          <div className="flex mt-10 flex-col justify-center">
            <input
              type="text"
              name=""
              value={colOwner}
              onChange={(e) => setColOwner(e.target.value)}
              className="w-full h-10 rounded-lg bg-gray-300 p-3 text-black"
            />
            <button
              onClick={sendChangeTx}
              style={{
                opacity: !tonConnectUI.connected ? 0.3 : 1,
              }}
              className="mt-4 px-4 py-2 rounded text-white w-[50%] bg-blue-600 "
            >
              Change NFT Col Owner
            </button>
          </div>
        )}

        {tonConnectUI.account && (
          <div className="flex mt-10 flex-col justify-center">
            <input
              type="text"
              name=""
              value={colOwner}
              onChange={(e) => setColOwner(e.target.value)}
              className="w-full h-10 rounded-lg bg-gray-300 p-3 text-black"
            />
            <button
              onClick={sendChangeContractTx}
              style={{
                opacity: !tonConnectUI.connected ? 0.3 : 1,
              }}
              className="mt-4 px-4 py-2 rounded text-white w-[50%] bg-blue-600 "
            >
              Change Minter Owner
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}
