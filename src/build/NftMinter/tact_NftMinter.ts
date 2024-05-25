import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from "ton-core";

export type StateInit = {
  $$type: "StateInit";
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  let sc_0 = slice;
  let _code = sc_0.loadRef();
  let _data = sc_0.loadRef();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  let _code = source.readCell();
  let _data = source.readCell();
  return { $$type: "StateInit" as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  let builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: "Context";
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  let sc_0 = slice;
  let _bounced = sc_0.loadBit();
  let _sender = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _raw = sc_0.loadRef();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  let _bounced = source.readBoolean();
  let _sender = source.readAddress();
  let _value = source.readBigNumber();
  let _raw = source.readCell();
  return {
    $$type: "Context" as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: "SendParameters";
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  let sc_0 = slice;
  let _bounce = sc_0.loadBit();
  let _to = sc_0.loadAddress();
  let _value = sc_0.loadIntBig(257);
  let _mode = sc_0.loadIntBig(257);
  let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  let _bounce = source.readBoolean();
  let _to = source.readAddress();
  let _value = source.readBigNumber();
  let _mode = source.readBigNumber();
  let _body = source.readCellOpt();
  let _code = source.readCellOpt();
  let _data = source.readCellOpt();
  return {
    $$type: "SendParameters" as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  let builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: "Deploy";
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "Deploy" as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: "DeployOk";
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  return { $$type: "DeployOk" as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: "FactoryDeploy";
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _cashback = sc_0.loadAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _cashback = source.readAddress();
  return {
    $$type: "FactoryDeploy" as const,
    queryId: _queryId,
    cashback: _cashback,
  };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type Transfer = {
  $$type: "Transfer";
  query_id: bigint;
  new_owner: Address;
};

export function storeTransfer(src: Transfer) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1578759217, 32);
    b_0.storeUint(src.query_id, 64);
    b_0.storeAddress(src.new_owner);
  };
}

export function loadTransfer(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1578759217) {
    throw Error("Invalid prefix");
  }
  let _query_id = sc_0.loadUintBig(64);
  let _new_owner = sc_0.loadAddress();
  return {
    $$type: "Transfer" as const,
    query_id: _query_id,
    new_owner: _new_owner,
  };
}

function loadTupleTransfer(source: TupleReader) {
  let _query_id = source.readBigNumber();
  let _new_owner = source.readAddress();
  return {
    $$type: "Transfer" as const,
    query_id: _query_id,
    new_owner: _new_owner,
  };
}

function storeTupleTransfer(source: Transfer) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.query_id);
  builder.writeAddress(source.new_owner);
  return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTransfer(src)).endCell());
    },
    parse: (src) => {
      return loadTransfer(src.loadRef().beginParse());
    },
  };
}

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

export function loadMintNft(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1542219593) {
    throw Error("Invalid prefix");
  }
  let _body = sc_0.loadRef();
  let _amount = sc_0.loadIntBig(257);
  let _collection_address = sc_0.loadAddress();
  return {
    $$type: "MintNft" as const,
    body: _body,
    amount: _amount,
    collection_address: _collection_address,
  };
}

function loadTupleMintNft(source: TupleReader) {
  let _body = source.readCell();
  let _amount = source.readBigNumber();
  let _collection_address = source.readAddress();
  return {
    $$type: "MintNft" as const,
    body: _body,
    amount: _amount,
    collection_address: _collection_address,
  };
}

function storeTupleMintNft(source: MintNft) {
  let builder = new TupleBuilder();
  builder.writeCell(source.body);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.collection_address);
  return builder.build();
}

function dictValueParserMintNft(): DictionaryValue<MintNft> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeMintNft(src)).endCell());
    },
    parse: (src) => {
      return loadMintNft(src.loadRef().beginParse());
    },
  };
}

export type ChangeCollectionOwner = {
  $$type: "ChangeCollectionOwner";
  collection_address: Address;
  body: Cell;
};

export function storeChangeCollectionOwner(src: ChangeCollectionOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1158906450, 32);
    b_0.storeAddress(src.collection_address);
    b_0.storeRef(src.body);
  };
}

export function loadChangeCollectionOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1158906450) {
    throw Error("Invalid prefix");
  }
  let _collection_address = sc_0.loadAddress();
  let _body = sc_0.loadRef();
  return {
    $$type: "ChangeCollectionOwner" as const,
    collection_address: _collection_address,
    body: _body,
  };
}

function loadTupleChangeCollectionOwner(source: TupleReader) {
  let _collection_address = source.readAddress();
  let _body = source.readCell();
  return {
    $$type: "ChangeCollectionOwner" as const,
    collection_address: _collection_address,
    body: _body,
  };
}

function storeTupleChangeCollectionOwner(source: ChangeCollectionOwner) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.collection_address);
  builder.writeCell(source.body);
  return builder.build();
}

function dictValueParserChangeCollectionOwner(): DictionaryValue<ChangeCollectionOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeChangeCollectionOwner(src)).endCell()
      );
    },
    parse: (src) => {
      return loadChangeCollectionOwner(src.loadRef().beginParse());
    },
  };
}

export type TransferNFT = {
  $$type: "TransferNFT";
  contractAddress: Address;
  itemIndex: bigint;
};

export function storeTransferNFT(src: TransferNFT) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(429635489, 32);
    b_0.storeAddress(src.contractAddress);
    b_0.storeInt(src.itemIndex, 257);
  };
}

export function loadTransferNFT(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 429635489) {
    throw Error("Invalid prefix");
  }
  let _contractAddress = sc_0.loadAddress();
  let _itemIndex = sc_0.loadIntBig(257);
  return {
    $$type: "TransferNFT" as const,
    contractAddress: _contractAddress,
    itemIndex: _itemIndex,
  };
}

function loadTupleTransferNFT(source: TupleReader) {
  let _contractAddress = source.readAddress();
  let _itemIndex = source.readBigNumber();
  return {
    $$type: "TransferNFT" as const,
    contractAddress: _contractAddress,
    itemIndex: _itemIndex,
  };
}

function storeTupleTransferNFT(source: TransferNFT) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.contractAddress);
  builder.writeNumber(source.itemIndex);
  return builder.build();
}

function dictValueParserTransferNFT(): DictionaryValue<TransferNFT> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeTransferNFT(src)).endCell());
    },
    parse: (src) => {
      return loadTransferNFT(src.loadRef().beginParse());
    },
  };
}

export type CollectionData = {
  $$type: "CollectionData";
  next_item_index: bigint;
  collection_content: Cell;
  owner_address: Address;
};

export function storeCollectionData(src: CollectionData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeInt(src.next_item_index, 257);
    b_0.storeRef(src.collection_content);
    b_0.storeAddress(src.owner_address);
  };
}

export function loadCollectionData(slice: Slice) {
  let sc_0 = slice;
  let _next_item_index = sc_0.loadIntBig(257);
  let _collection_content = sc_0.loadRef();
  let _owner_address = sc_0.loadAddress();
  return {
    $$type: "CollectionData" as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function loadTupleCollectionData(source: TupleReader) {
  let _next_item_index = source.readBigNumber();
  let _collection_content = source.readCell();
  let _owner_address = source.readAddress();
  return {
    $$type: "CollectionData" as const,
    next_item_index: _next_item_index,
    collection_content: _collection_content,
    owner_address: _owner_address,
  };
}

function storeTupleCollectionData(source: CollectionData) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.next_item_index);
  builder.writeCell(source.collection_content);
  builder.writeAddress(source.owner_address);
  return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeCollectionData(src)).endCell());
    },
    parse: (src) => {
      return loadCollectionData(src.loadRef().beginParse());
    },
  };
}

export type ItemData = {
  $$type: "ItemData";
  owner: Address;
  collection_address: Address;
  item_index: bigint;
  individual_content: Cell;
};

export function storeItemData(src: ItemData) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.owner);
    b_0.storeAddress(src.collection_address);
    b_0.storeInt(src.item_index, 257);
    b_0.storeRef(src.individual_content);
  };
}

export function loadItemData(slice: Slice) {
  let sc_0 = slice;
  let _owner = sc_0.loadAddress();
  let _collection_address = sc_0.loadAddress();
  let _item_index = sc_0.loadIntBig(257);
  let _individual_content = sc_0.loadRef();
  return {
    $$type: "ItemData" as const,
    owner: _owner,
    collection_address: _collection_address,
    item_index: _item_index,
    individual_content: _individual_content,
  };
}

function loadTupleItemData(source: TupleReader) {
  let _owner = source.readAddress();
  let _collection_address = source.readAddress();
  let _item_index = source.readBigNumber();
  let _individual_content = source.readCell();
  return {
    $$type: "ItemData" as const,
    owner: _owner,
    collection_address: _collection_address,
    item_index: _item_index,
    individual_content: _individual_content,
  };
}

function storeTupleItemData(source: ItemData) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.owner);
  builder.writeAddress(source.collection_address);
  builder.writeNumber(source.item_index);
  builder.writeCell(source.individual_content);
  return builder.build();
}

function dictValueParserItemData(): DictionaryValue<ItemData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeItemData(src)).endCell());
    },
    parse: (src) => {
      return loadItemData(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwner = {
  $$type: "ChangeOwner";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwner(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwner" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwnerOk = {
  $$type: "ChangeOwnerOk";
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error("Invalid prefix");
  }
  let _queryId = sc_0.loadUintBig(64);
  let _newOwner = sc_0.loadAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  let _queryId = source.readBigNumber();
  let _newOwner = source.readAddress();
  return {
    $$type: "ChangeOwnerOk" as const,
    queryId: _queryId,
    newOwner: _newOwner,
  };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  let builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwnerOk(src.loadRef().beginParse());
    },
  };
}

type NftMinter_init_args = {
  $$type: "NftMinter_init_args";
  g_address: Address;
};

function initNftMinter_init_args(src: NftMinter_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.g_address);
  };
}

async function NftMinter_init(g_address: Address) {
  const __code = Cell.fromBase64(
    "te6ccgECGAEABOAAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCEgQFAgFYDg8E9O2i7fsBkjB/4HAh10nCH5UwINcLH94gghBb7GdJuo7DMNMfAYIQW+xnSbry4IHUgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzBsE4IAopQkwP/y9Ns8f+AgghBFE4JSuuMCIIIQlGqYtrrjAsAABgcICQCcyPhDAcx/AcoAVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WWCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsoAye1UAp74QlJQxwWOkoIK+vCAMnJQA38BFEMwbW3bPOCCAMQT+EFvJBNfA4IRZaC8ACSovvL0+EFvJBNfA4IRZaC8AFADqBKhclgDfwEUQzBtbds8DAwBnjDTHwGCEEUTglK68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUWWwSggDCI/hCUmDHBfL0ggr68IByWH8BFEMwbW3bPH8MAVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CgH0jvT5ASCC8KL0PGR/yhg0unF2F3kPqM5v5u4Mt30LPvCompOzMXbyuo4SMDCCAMWQ+EJSMMcF8vRwf9sx4CCC8LEOfBqNDjLVQ/NVmQh0Na/lfU1vRw8tKqnK5OjJZIyuuo4SMDCCAMWQ+EJSMMcF8vR/f9sx4JEw4nALATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAwBpILwvrKTWoIImxVNMvmcQ3eqlgqhFTZswsYCdV42uX9QXOy6jqyBPJX4QlJAxwXy9PhCf/gnbxD4QW8kE18DoYIJycOAoYBCECNtbW3bPH/bMeAMAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AA0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCASAQEQIBSBYXAhG22Btnm2eNhjASEwCVt3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwThOy6ctWadluZ0HSzbKM3RSQAbztRNDUAfhj0gABjkb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gBVIGwT4Pgo1wsKgwm68uCJFAAI+CdvEAFG+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHR2zwVAAj4QgF/ABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVJhZVNSOFo2MUFuVVk3WkpzTndjTk56elV4dUFOQWtTV1l4YVE5bWZwcjl3gg"
  );
  const __system = Cell.fromBase64(
    "te6cckECGgEABOoAAQHAAQEFoUmHAgEU/wD0pBP0vPLICwMCAWIEDwN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLgghIFDgT07aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEFvsZ0m6jsMw0x8BghBb7GdJuvLggdSBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMGwTggCilCTA//L02zx/4CCCEEUTglK64wIgghCUapi2uuMCwAAGBwgKAp74QlJQxwWOkoIK+vCAMnJQA38BFEMwbW3bPOCCAMQT+EFvJBNfA4IRZaC8ACSovvL0+EFvJBNfA4IRZaC8AFADqBKhclgDfwEUQzBtbds8DAwBnjDTHwGCEEUTglK68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUWWwSggDCI/hCUmDHBfL0ggr68IByWH8BFEMwbW3bPH8MAVAw0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CQE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwMAfSO9PkBIILwovQ8ZH/KGDS6cXYXeQ+ozm/m7gy3fQs+8Kiak7MxdvK6jhIwMIIAxZD4QlIwxwXy9HB/2zHgIILwsQ58Go0OMtVD81WZCHQ1r+V9TW9HDy0qqcrk6MlkjK66jhIwMIIAxZD4QlIwxwXy9H9/2zHgkTDicAsBpILwvrKTWoIImxVNMvmcQ3eqlgqhFTZswsYCdV42uX9QXOy6jqyBPJX4QlJAxwXy9PhCf/gnbxD4QW8kE18DoYIJycOAoYBCECNtbW3bPH/bMeAMAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AA0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAnMj4QwHMfwHKAFUgWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbKAMntVAIBWBAXAgEgERYCEbbYG2ebZ42GMBIVAbztRNDUAfhj0gABjkb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0gBVIGwT4Pgo1wsKgwm68uCJEwFG+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHR2zwUAAj4QgF/AAj4J28QAJW3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJACAUgYGQARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1SYWVTUjhaNjFBblVZN1pKc053Y05OenpVeHVBTkFrU1dZeGFROW1mcHI5d4ICHj94A="
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initNftMinter_init_args({ $$type: "NftMinter_init_args", g_address })(
    builder
  );
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const NftMinter_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  15509: { message: `Only deployer is allowed to withdraw` },
  41620: { message: `Minting Disabled` },
  49699: { message: `Only owner is allowed to change contract owner` },
  50195: { message: `Not Enough Tons sent for minting!!` },
  50576: { message: `Only deployer is allowed to call this function` },
  62742: { message: `non-sequential NFTs` },
};

const NftMinter_types: ABIType[] = [
  {
    name: "StateInit",
    header: null,
    fields: [
      { name: "code", type: { kind: "simple", type: "cell", optional: false } },
      { name: "data", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "Context",
    header: null,
    fields: [
      {
        name: "bounced",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "sender",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "raw", type: { kind: "simple", type: "slice", optional: false } },
    ],
  },
  {
    name: "SendParameters",
    header: null,
    fields: [
      {
        name: "bounce",
        type: { kind: "simple", type: "bool", optional: false },
      },
      {
        name: "to",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "value",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "mode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: true } },
      { name: "code", type: { kind: "simple", type: "cell", optional: true } },
      { name: "data", type: { kind: "simple", type: "cell", optional: true } },
    ],
  },
  {
    name: "Deploy",
    header: 2490013878,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "DeployOk",
    header: 2952335191,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
    ],
  },
  {
    name: "FactoryDeploy",
    header: 1829761339,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "cashback",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "Transfer",
    header: 1578759217,
    fields: [
      {
        name: "query_id",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "new_owner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "MintNft",
    header: 1542219593,
    fields: [
      { name: "body", type: { kind: "simple", type: "cell", optional: false } },
      {
        name: "amount",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "collection_address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ChangeCollectionOwner",
    header: 1158906450,
    fields: [
      {
        name: "collection_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      { name: "body", type: { kind: "simple", type: "cell", optional: false } },
    ],
  },
  {
    name: "TransferNFT",
    header: 429635489,
    fields: [
      {
        name: "contractAddress",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "itemIndex",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "CollectionData",
    header: null,
    fields: [
      {
        name: "next_item_index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "collection_content",
        type: { kind: "simple", type: "cell", optional: false },
      },
      {
        name: "owner_address",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ItemData",
    header: null,
    fields: [
      {
        name: "owner",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "collection_address",
        type: { kind: "simple", type: "address", optional: false },
      },
      {
        name: "item_index",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
      {
        name: "individual_content",
        type: { kind: "simple", type: "cell", optional: false },
      },
    ],
  },
  {
    name: "ChangeOwner",
    header: 2174598809,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
  {
    name: "ChangeOwnerOk",
    header: 846932810,
    fields: [
      {
        name: "queryId",
        type: { kind: "simple", type: "uint", optional: false, format: 64 },
      },
      {
        name: "newOwner",
        type: { kind: "simple", type: "address", optional: false },
      },
    ],
  },
];

const NftMinter_getters: ABIGetter[] = [
  {
    name: "balance",
    arguments: [],
    returnType: { kind: "simple", type: "int", optional: false, format: 257 },
  },
];

const NftMinter_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "MintNft" } },
  { receiver: "internal", message: { kind: "text", text: "Stop Mint" } },
  { receiver: "internal", message: { kind: "text", text: "Begin Mint" } },
  { receiver: "internal", message: { kind: "text", text: "withdraw safe" } },
  {
    receiver: "internal",
    message: { kind: "typed", type: "ChangeCollectionOwner" },
  },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class NftMinter implements Contract {
  static async init(g_address: Address) {
    return await NftMinter_init(g_address);
  }

  static async fromInit(g_address: Address) {
    const init = await NftMinter_init(g_address);
    const address = contractAddress(0, init);
    return new NftMinter(address, init);
  }

  static fromAddress(address: Address) {
    return new NftMinter(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: NftMinter_types,
    getters: NftMinter_getters,
    receivers: NftMinter_receivers,
    errors: NftMinter_errors,
  };

  constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message:
      | MintNft
      | "Stop Mint"
      | "Begin Mint"
      | "withdraw safe"
      | ChangeCollectionOwner
      | Deploy
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "MintNft"
    ) {
      body = beginCell().store(storeMintNft(message)).endCell();
    }
    if (message === "Stop Mint") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === "Begin Mint") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (message === "withdraw safe") {
      body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "ChangeCollectionOwner"
    ) {
      body = beginCell().store(storeChangeCollectionOwner(message)).endCell();
    }
    if (
      message &&
      typeof message === "object" &&
      !(message instanceof Slice) &&
      message.$$type === "Deploy"
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (body === null) {
      throw new Error("Invalid message type");
    }

    await provider.internal(via, { ...args, body: body });
  }

  async getBalance(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("balance", builder.build())).stack;
    let result = source.readBigNumber();
    return result;
  }
}
