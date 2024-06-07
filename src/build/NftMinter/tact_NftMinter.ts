import {
  TupleReader,
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
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
  refCode: bigint;
};

export function storeMintNft(src: MintNft) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(1696451610, 32);
    b_0.storeRef(src.body);
    b_0.storeInt(src.amount, 257);
    b_0.storeAddress(src.collection_address);
    b_0.storeInt(src.refCode, 257);
  };
}

export function loadMintNft(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 1696451610) {
    throw Error("Invalid prefix");
  }
  let _body = sc_0.loadRef();
  let _amount = sc_0.loadIntBig(257);
  let _collection_address = sc_0.loadAddress();
  let _refCode = sc_0.loadIntBig(257);
  return {
    $$type: "MintNft" as const,
    body: _body,
    amount: _amount,
    collection_address: _collection_address,
    refCode: _refCode,
  };
}

function loadTupleMintNft(source: TupleReader) {
  let _body = source.readCell();
  let _amount = source.readBigNumber();
  let _collection_address = source.readAddress();
  let _refCode = source.readBigNumber();
  return {
    $$type: "MintNft" as const,
    body: _body,
    amount: _amount,
    collection_address: _collection_address,
    refCode: _refCode,
  };
}

function storeTupleMintNft(source: MintNft) {
  let builder = new TupleBuilder();
  builder.writeCell(source.body);
  builder.writeNumber(source.amount);
  builder.writeAddress(source.collection_address);
  builder.writeNumber(source.refCode);
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

export type ChangeContractOwner = {
  $$type: "ChangeContractOwner";
  newOwner: Address;
};

export function storeChangeContractOwner(src: ChangeContractOwner) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeUint(278038460, 32);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeContractOwner(slice: Slice) {
  let sc_0 = slice;
  if (sc_0.loadUint(32) !== 278038460) {
    throw Error("Invalid prefix");
  }
  let _newOwner = sc_0.loadAddress();
  return { $$type: "ChangeContractOwner" as const, newOwner: _newOwner };
}

function loadTupleChangeContractOwner(source: TupleReader) {
  let _newOwner = source.readAddress();
  return { $$type: "ChangeContractOwner" as const, newOwner: _newOwner };
}

function storeTupleChangeContractOwner(source: ChangeContractOwner) {
  let builder = new TupleBuilder();
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeContractOwner(): DictionaryValue<ChangeContractOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(
        beginCell().store(storeChangeContractOwner(src)).endCell()
      );
    },
    parse: (src) => {
      return loadChangeContractOwner(src.loadRef().beginParse());
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
  admin: Address;
};

function initNftMinter_init_args(src: NftMinter_init_args) {
  return (builder: Builder) => {
    let b_0 = builder;
    b_0.storeAddress(src.g_address);
    b_0.storeAddress(src.admin);
  };
}

async function NftMinter_init(g_address: Address, admin: Address) {
  const __code = Cell.fromBase64(
    "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"
  );
  const __system = Cell.fromBase64(
    "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"
  );
  let builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initNftMinter_init_args({ $$type: "NftMinter_init_args", g_address, admin })(
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
    header: 1696451610,
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
      {
        name: "refCode",
        type: { kind: "simple", type: "int", optional: false, format: 257 },
      },
    ],
  },
  {
    name: "ChangeContractOwner",
    header: 278038460,
    fields: [
      {
        name: "newOwner",
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
  {
    name: "allCodes",
    arguments: [],
    returnType: { kind: "dict", key: "int", value: "address" },
  },
  {
    name: "userCode",
    arguments: [],
    returnType: { kind: "dict", key: "address", value: "int" },
  },
];

const NftMinter_receivers: ABIReceiver[] = [
  { receiver: "internal", message: { kind: "typed", type: "MintNft" } },
  { receiver: "internal", message: { kind: "text", text: "Stop Mint" } },
  { receiver: "internal", message: { kind: "text", text: "Begin Mint" } },
  { receiver: "internal", message: { kind: "text", text: "withdraw safe" } },
  {
    receiver: "internal",
    message: { kind: "text", text: "get referral code" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "ChangeCollectionOwner" },
  },
  {
    receiver: "internal",
    message: { kind: "typed", type: "ChangeContractOwner" },
  },
  { receiver: "internal", message: { kind: "typed", type: "Deploy" } },
];

export class NftMinter implements Contract {
  static async init(g_address: Address, admin: Address) {
    return await NftMinter_init(g_address, admin);
  }

  static async fromInit(g_address: Address, admin: Address) {
    const init = await NftMinter_init(g_address, admin);
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
      | "get referral code"
      | ChangeCollectionOwner
      | ChangeContractOwner
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
    if (message === "get referral code") {
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
      message.$$type === "ChangeContractOwner"
    ) {
      body = beginCell().store(storeChangeContractOwner(message)).endCell();
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

  async getAllCodes(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("allCodes", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      Dictionary.Values.Address(),
      source.readCellOpt()
    );
    return result;
  }

  async getUserCode(provider: ContractProvider) {
    let builder = new TupleBuilder();
    let source = (await provider.get("userCode", builder.build())).stack;
    let result = Dictionary.loadDirect(
      Dictionary.Keys.Address(),
      Dictionary.Values.BigInt(257),
      source.readCellOpt()
    );
    return result;
  }
}
