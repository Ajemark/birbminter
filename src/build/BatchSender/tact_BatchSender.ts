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
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

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
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
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
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

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
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
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
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
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
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
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
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
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
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
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
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

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
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
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
        }
    }
}

export type TxInfo = {
    $$type: 'TxInfo';
    amount: bigint;
    to: Address;
    body: string;
}

export function storeTxInfo(src: TxInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.to);
        b_0.storeStringRefTail(src.body);
    };
}

export function loadTxInfo(slice: Slice) {
    let sc_0 = slice;
    let _amount = sc_0.loadIntBig(257);
    let _to = sc_0.loadAddress();
    let _body = sc_0.loadStringRefTail();
    return { $$type: 'TxInfo' as const, amount: _amount, to: _to, body: _body };
}

function loadTupleTxInfo(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _to = source.readAddress();
    let _body = source.readString();
    return { $$type: 'TxInfo' as const, amount: _amount, to: _to, body: _body };
}

function storeTupleTxInfo(source: TxInfo) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.to);
    builder.writeString(source.body);
    return builder.build();
}

function dictValueParserTxInfo(): DictionaryValue<TxInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTxInfo(src)).endCell());
        },
        parse: (src) => {
            return loadTxInfo(src.loadRef().beginParse());
        }
    }
}

export type Data = {
    $$type: 'Data';
    address: Dictionary<bigint, Address>;
    amount: Dictionary<bigint, bigint>;
    comment: Dictionary<bigint, Cell>;
    length: bigint;
}

export function storeData(src: Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4188364806, 32);
        b_0.storeDict(src.address, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeDict(src.amount, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
        b_0.storeDict(src.comment, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell());
        b_0.storeInt(src.length, 257);
    };
}

export function loadData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4188364806) { throw Error('Invalid prefix'); }
    let _address = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _amount = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    let _comment = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), sc_0);
    let _length = sc_0.loadIntBig(257);
    return { $$type: 'Data' as const, address: _address, amount: _amount, comment: _comment, length: _length };
}

function loadTupleData(source: TupleReader) {
    let _address = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _amount = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _comment = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Cell(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'Data' as const, address: _address, amount: _amount, comment: _comment, length: _length };
}

function storeTupleData(source: Data) {
    let builder = new TupleBuilder();
    builder.writeCell(source.address.size > 0 ? beginCell().storeDictDirect(source.address, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeCell(source.amount.size > 0 ? beginCell().storeDictDirect(source.amount, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.comment.size > 0 ? beginCell().storeDictDirect(source.comment, Dictionary.Keys.BigInt(257), Dictionary.Values.Cell()).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserData(): DictionaryValue<Data> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeData(src)).endCell());
        },
        parse: (src) => {
            return loadData(src.loadRef().beginParse());
        }
    }
}

 type BatchSender_init_args = {
    $$type: 'BatchSender_init_args';
}

function initBatchSender_init_args(src: BatchSender_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function BatchSender_init() {
    const __code = Cell.fromBase64('te6ccgECGgEABVAAART/APSkE/S88sgLAQIBYgIDAs7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UFQQCAVgREgSw7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEPmlYAa6jqAw0x8BghD5pWAGuvLggfQE9AT0BIEBAdcAVTBsFNs8f+AgwAAi10nBIbDjAiCCEJRqmLa64wLAAAUGBwgBEiCTIMIAiuhfBQkAkFuL5mdW5kcyByZWNlaXZlZIjQtW0RFQlVHXSBGaWxlIGNvbnRyYWN0c1xiYXRjaF9zZW5kZXIudGFjdDozMjo5g/hQw/hQwfwFQMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fw4BtI7U+QGC8L6yk1qCCJsVTTL5nEN3qpYKoRU2bMLGAnVeNrl/UFzsuo6sgTyV+EJSIMcF8vT4Qn/4J28Q+EFvJBNfA6GCCJiWgKGAQhAjbW1t2zx/2zHgkTDicA8B9otWZpcnN0iNC5bREVCVUddIEZpbGUgY29udHJhY3RzXGJhdGNoX3NlbmRlci50YWN0OjM5OjEzg/hQw/hQwJIEBASJZ9AxvoZIwbd8gbvLQgIEBAVRVAFJAQTP0DG+hlAHXADCSW23iIG7y0IAkgQEBJFn0DW+hkjBt3woE+CBu8tCAIds8jQuW0RFQlVHXSBGaWxlIGNvbnRyYWN0c1xiYXRjaF9zZW5kZXIudGFjdDo0NDoxM4P4UMP4UMCPbPI0LltERUJVR10gRmlsZSBjb250cmFjdHNcYmF0Y2hfc2VuZGVyLnRhY3Q6NDU6MTOD+FDD+FDAk2zwLCwsMAN7IIcEAmIAtAcsHAaMB3iGCODJ8snNBGdO3qaoduY4gcCBxjhQEeqkMpjAlqBKgBKoHAqQhwABFMOYwM6oCzwGOK28AcI4RI3qpCBJvjAGkA3qpBCDAABTmMyKlA5xTAm+BpjBYywcCpVnkMDHiydACJIn+FDD+FDByf1gUQzBtbds8pQ0PAFxbREVCVUddIEZpbGUgY29udHJhY3RzXGJhdGNoX3NlbmRlci50YWN0OjQ2OjEzATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPA8ByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAEACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIBMUAgFIGBkCD7bYG2ebZ4YwFRYAubd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4DepO98qiy3jjqenvAqzhk0E4TsunLVmnZbmdB0s2yjN0UkAF27UTQ1AH4Y9IAAY4g+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHgMPgo1wsKgwm68uCJ2zwXAAj4J28QAAT4QgARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1QODh4UGVpb1c5aGg4dU41NGJzVkxTUTVTc2M0NVhmdXlUdEZSNllta0hXOYIA==');
    const __system = Cell.fromBase64('te6cckECHAEABVoAAQHAAQEFoAFZAgEU/wD0pBP0vPLICwMCAWIEEgLO0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wds88uCCyPhDAcx/AcoAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVBUFBLDtou37AZIwf+BwIddJwh+VMCDXCx/eIIIQ+aVgBrqOoDDTHwGCEPmlYAa68uCB9AT0BPQEgQEB1wBVMGwU2zx/4CDAACLXScEhsOMCIIIQlGqYtrrjAsAABgwNDwESIJMgwgCK6F8FBwH2i1Zmlyc3SI0LltERUJVR10gRmlsZSBjb250cmFjdHNcYmF0Y2hfc2VuZGVyLnRhY3Q6Mzk6MTOD+FDD+FDAkgQEBIln0DG+hkjBt3yBu8tCAgQEBVFUAUkBBM/QMb6GUAdcAMJJbbeIgbvLQgCSBAQEkWfQNb6GSMG3fCAT4IG7y0IAh2zyNC5bREVCVUddIEZpbGUgY29udHJhY3RzXGJhdGNoX3NlbmRlci50YWN0OjQ0OjEzg/hQw/hQwI9s8jQuW0RFQlVHXSBGaWxlIGNvbnRyYWN0c1xiYXRjaF9zZW5kZXIudGFjdDo0NToxM4P4UMP4UMCTbPAkJCQoA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AIkif4UMP4UMHJ/WBRDMG1t2zylCxAAXFtERUJVR10gRmlsZSBjb250cmFjdHNcYmF0Y2hfc2VuZGVyLnRhY3Q6NDY6MTMAkFuL5mdW5kcyByZWNlaXZlZIjQtW0RFQlVHXSBGaWxlIGNvbnRyYWN0c1xiYXRjaF9zZW5kZXIudGFjdDozMjo5g/hQw/hQwfwFQMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fw4BOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8EAG0jtT5AYLwvrKTWoIImxVNMvmcQ3eqlgqhFTZswsYCdV42uX9QXOy6jqyBPJX4QlIgxwXy9PhCf/gnbxD4QW8kE18DoYIImJaAoYBCECNtbW3bPH/bMeCRMOJwEAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wARAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgFYExkCASAUGAIPttgbZ5tnhjAVFwF27UTQ1AH4Y9IAAY4g+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDHgMPgo1wsKgwm68uCJ2zwWAAT4QgAI+CdvEAC5t3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQAgFIGhsAEbCvu1E0NIAAYAB1sm7jQ1aXBmczovL1FtUDg4eFBlaW9XOWhoOHVONTRic1ZMU1E1U3NjNDVYZnV5VHRGUjZZbWtIVzmCB822+c');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initBatchSender_init_args({ $$type: 'BatchSender_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const BatchSender_errors: { [key: number]: { message: string } } = {
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
}

const BatchSender_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TxInfo","header":null,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"body","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"Data","header":4188364806,"fields":[{"name":"address","type":{"kind":"dict","key":"int","value":"address"}},{"name":"amount","type":{"kind":"dict","key":"int","value":"int"}},{"name":"comment","type":{"kind":"dict","key":"int","value":"cell","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const BatchSender_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const BatchSender_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Data"}},
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw safe"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class BatchSender implements Contract {
    
    static async init() {
        return await BatchSender_init();
    }
    
    static async fromInit() {
        const init = await BatchSender_init();
        const address = contractAddress(0, init);
        return new BatchSender(address, init);
    }
    
    static fromAddress(address: Address) {
        return new BatchSender(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  BatchSender_types,
        getters: BatchSender_getters,
        receivers: BatchSender_receivers,
        errors: BatchSender_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Data | null | 'withdraw safe' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Data') {
            body = beginCell().store(storeData(message)).endCell();
        }
        if (message === null) {
            body = new Cell();
        }
        if (message === 'withdraw safe') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}