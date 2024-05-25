import { Address, beginCell } from "ton";
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
