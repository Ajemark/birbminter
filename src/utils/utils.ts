import { Address, Builder, Cell, beginCell } from "ton";
import { Buffer } from "buffer";

window.Buffer = window.Buffer || Buffer;

export const Mint = (params: {
  queryId?: number;
  passAmount: bigint;
  itemIndex: number;
  itemOwnerAddress: Address;
  itemContent: string;
}) => {
  const msgBody = beginCell();

  msgBody.storeUint(1, 32);
  msgBody.storeUint(params.queryId || 0, 64);
  msgBody.storeUint(params.itemIndex, 64);
  msgBody.storeCoins(params.passAmount);

  const itemContent = beginCell();
  itemContent.storeBuffer(Buffer.from(params.itemContent));

  const nftItemMessage = beginCell();

  nftItemMessage.storeAddress(params.itemOwnerAddress);
  nftItemMessage.storeRef(itemContent);

  msgBody.storeRef(nftItemMessage);

  return msgBody.endCell();
};

export const changeOwner = (params: {
  queryId?: number;
  newOwner: Address;
}) => {
  const msgBody = beginCell();
  msgBody.storeUint(3, 32);
  msgBody.storeUint(params.queryId || 0, 64);
  msgBody.storeAddress(params.newOwner);
  return msgBody.endCell();
};

export type MintNft = {
  $$type: "MintNft";
  body: Cell;
  amount: bigint;
  collection_address: Address;
};

export function storeMintNft(src: MintNft) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1542219593, 32);
    b_0.storeRef(src.body);
    b_0.storeInt(src.amount, 257);
    b_0.storeAddress(src.collection_address);
  };
}
