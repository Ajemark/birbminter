import { useTonConnectUI } from "@tonconnect/ui-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Address, Cell, toNano, TupleItemCell, TupleItemInt } from "ton-core";
import { TupleItemSlice } from "ton-core/dist/tuple/tuple";
import {
  isNftCollectionNftEditable,
  Queries,
} from "../contracts/getgemsCollection/NftCollection.data";
import { useTonClient } from "../store/tonClient";
import { decodeOffChainContent } from "../contracts/nft-content/nftContent";
import { Buffer } from "buffer";
import { useNFTContract } from "../hooks/useNFTContract";

window.Buffer = window.Buffer || Buffer;

interface CollectionInfo {
  content: string;
  base: string;
  owner: Address;
  nftEditable: boolean;
  nextItemIndex: string;
}
export function DeployNfts() {
  const tonClient = useTonClient();
  const { sendMintNft } = useNFTContract();

  const [collectionInfo, setCollectionInfo] = useState<CollectionInfo>({
    content: "",
    base: "",

    owner: new Address(0, Buffer.from([])),
    nftEditable: false,
    nextItemIndex: "-1",
  });

  const [collectionAddress, setCollectionAddress] = useState(
    "kQC-1FqrPMzrppHUqRDx5TFvfyNDUD4gdSy15YkG8c8GIYST"
  );
  const [start, setStart] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const [batchSize, setBatchSize] = useState<number>(50);
  const [template, setTemplate] = useState<string>("{id}.json");
  const [mintGram, setMintGram] = useState<string>("0.05");

  const replaceId = (template: string, id: number) => {
    return template.replace(/{id}/g, id.toString());
  };

  const updateInfo = async () => {
    setCollectionInfo({
      content: "",
      base: "",
      owner: new Address(0, Buffer.from([])),
      nftEditable: false,
      nextItemIndex: "-1",
    });

    let address: Address;
    try {
      address = Address.parse(collectionAddress);
    } catch (e) {
      return;
    }
    const account = await tonClient.value.getContractState(address);
    const info = await tonClient.value.callGetMethod(address, "royalty_params");

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
      nftEditable: isNftCollectionNftEditable(
        Cell.fromBoc(account.data || Buffer.from([]))[0]
      ),
    });
    setStart(Number(nextItemIndex.value));
  };

  useEffect(() => {
    updateInfo();
  }, [collectionAddress, tonClient]);

  const [tonConnectUI] = useTonConnectUI();

  const mintContent = useMemo(() => {
    if (!count || count < 1) {
      return [];
    }

    if (!tonConnectUI.account?.address) {
      return [];
    }

    const messages: {
      address: string;

      amount: string;

      stateInit?: string;

      payload?: string;
    }[] = [];

    const ids = [...Array(count)].map((_, i) => start + i);
    while (ids.length > 0) {
      const nftIds = ids.splice(0, batchSize);
      // console.log("nftIds len", nftIds.length);

      return collectionInfo.nftEditable
        ? Queries.batchMintEditable({
            items: nftIds.map((i) => {
              return {
                passAmount: toNano(mintGram),
                content: replaceId(template || "", i),
                index: i,
                ownerAddress: Address.parse(
                  tonConnectUI.account?.address || ""
                ),
                editorAddress: Address.parse(
                  tonConnectUI.account?.address || ""
                ),
              };
            }),
          })
        : Queries.batchMint({
            items: nftIds.map((i) => {
              return {
                passAmount: toNano(mintGram),
                content: replaceId(template || "", i),
                index: i,
                ownerAddress: Address.parse(
                  tonConnectUI.account?.address || ""
                ),
              };
            }),
          });
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

  const sendTx = useCallback(() => {
    sendMintNft(mintContent);
  }, [mintContent]);

  return (
    <div className="container mx-auto gap-2 flex flex-col">
      <div className="">
        <div>
          <label htmlFor="collectionAddress">Collection Address:</label>
          <input
            className="w-full px-2 py-2 bg-gray-200 rounded"
            type="text"
            id="collectionAddress"
            value={collectionAddress}
            onChange={(e) => setCollectionAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="py-2">
        <div>
          <label htmlFor="collectionBase">Collection Base:</label>
          <input
            className="w-full px-2 py-2 bg-gray-200 rounded"
            type="text"
            id="collectionBase"
            value={collectionInfo?.base}
            readOnly
          />
        </div>

        <div>
          <label htmlFor="collectionIndex">Next Item Index:</label>
          <input
            className="w-full px-2 py-2 bg-gray-200 rounded"
            type="text"
            id="collectionIndex"
            value={collectionInfo?.nextItemIndex}
            readOnly
          />
        </div>
      </div>

      <h3 className="font-bold text-lg">Mint settings:</h3>

      <div className="flex">
        <div>
          <label htmlFor="mintGram">Initial NFT Balance:</label>
          <div className="text-sm text-gray-500">
            0.05 is recommended for normal nfts, but you can use 0.01 for
            testing purposes
          </div>
          <input
            className="w-full px-2 py-2 bg-gray-200 rounded"
            type="number"
            id="mintGram"
            value={mintGram}
            onChange={(e) => setMintGram(e.target.value)}
          />
        </div>
      </div>

      {/* <div className="flex">
        <div>
          <label htmlFor="mintStart">Start from:</label>
          <input
            className="w-full px-2 py-2 bg-gray-200 rounded"
            type="number"
            id="mintStart"
            value={start}
            onChange={(e) => setStart(parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </div>

      <div className="flex">
        <div>
          <label htmlFor="batchSize">Batch size:</label>
          <div className="text-sm text-gray-500">
            Nfts per message. 100 should work for network, but tonkeeper allows
            only 50
          </div>
          <input
            className="w-full px-2 py-2 bg-gray-200 rounded"
            type="number"
            id="batchSize"
            value={batchSize}
            onChange={(e) => setBatchSize(parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </div>

      <div className="flex">
        <div>
          <label htmlFor="mintCount">Nfts to mint:</label>
          <div className="text-sm text-gray-500">
            Max: 4 * batchSize ({4 * batchSize}). If your wallet (w5 for
            example) support sending more than 4 messages, you can use more
            batches
          </div>
          <input
            className="w-full px-2 py-2 bg-gray-200 rounded"
            type="number"
            id="mintCount"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </div> */}

      <div className="flex">
        <div>
          {/* <label htmlFor="mintTemplate">
            Nft content template (replaces {"{id}"} with your nft id):
          </label>
          <input
            className="w-full px-2 py-2 bg-gray-200 rounded"
            type="text"
            id="mintTemplate"
            value={template || ""}
            onChange={(e) => setTemplate(e.target.value)}
          />
          <div>Last nft example: {replaceId(template, start + count - 1)}</div> */}
          <div>
            Full url (If you click on that url, valid nft metadata should be
            opened in your browser):{" "}
            <a
              href={`${collectionInfo.base}/${replaceId(template, start + count - 1)}`}
            >
              {replaceId(template, start + count - 1)}
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={sendTx}
        className="mt-4 px-4 py-2 rounded text-white bg-blue-600 w-32"
      >
        Send Mint Tx
      </button>
    </div>
  );
}
