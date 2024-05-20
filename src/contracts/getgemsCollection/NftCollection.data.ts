import {
  Address,
  beginCell,
  Cell,
  contractAddress,
  Dictionary,
  DictionaryValue,
  StateInit,
  storeStateInit,
} from "ton-core";

import { encodeOffChainContent } from "../nft-content/nftContent";
import { Buffer } from "buffer";

// window.Buffer = window.Buffer || Buffer;

export const NftItemEditableCode =
  "B5EE9C72410212010002E5000114FF00F4A413F4BCF2C80B0102016202030202CE0405020120101102012006070201200E0F04F70C8871C02497C0F83434C0C05C6C2497C0F83E903E900C7E800C5C75C87E800C7E800C3C00816CE38596DB088D148CB1C17CB865407E90353E900C040D3C00F801F4C7F4CFE08417F30F45148C2EA3A28C8412040DC409841140B820840BF2C9A8948C2EB8C0A0840701104A948C2EA3A28C8412040DC409841140A008090A0B00113E910C1C2EBCB8536001F65136C705F2E191FA4021F001FA40D20031FA00820AFAF0801CA121945315A0A1DE22D70B01C300209206A19136E220C2FFF2E192218E3E821005138D91C8500ACF16500CCF1671244A145446B0708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00105894102B385BE20C0080135F03333334347082108B77173504C8CBFF58CF164430128040708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB0001F65134C705F2E191FA4021F001FA40D20031FA00820AFAF0801CA121945315A0A1DE22D70B01C300209206A19136E220C2FFF2E192218E3E8210511A4463C85008CF16500CCF1671244814544690708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00103894102B365BE20D0046E03136373782101A0B9D5116BA9E5131C705F2E19A01D4304400F003E05F06840FF2F00082028E3527F0018210D53276DB103845006D71708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB0093303335E25503F0030082028E3527F0018210D53276DB103848006D71708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB0093303630E25503F00300413B513434CFFE900835D27080271FC07E90353E900C040D440D380C1C165B5B5B600025013232CFD400F3C58073C5B30073C5B27B5520000DBF03A78013628C000BBC7E7F80118400CB5C98";
export const NftItemCode =
  "B5EE9C7241020D010001D0000114FF00F4A413F4BCF2C80B0102016202030202CE04050009A11F9FE00502012006070201200B0C02D70C8871C02497C0F83434C0C05C6C2497C0F83E903E900C7E800C5C75C87E800C7E800C3C00812CE3850C1B088D148CB1C17CB865407E90350C0408FC00F801B4C7F4CFE08417F30F45148C2EA3A1CC840DD78C9004F80C0D0D0D4D60840BF2C9A884AEB8C097C12103FCBC20080900113E910C1C2EBCB8536001F65135C705F2E191FA4021F001FA40D20031FA00820AFAF0801BA121945315A0A1DE22D70B01C300209206A19136E220C2FFF2E192218E3E821005138D91C85009CF16500BCF16712449145446A0708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB00104794102A375BE20A00727082108B77173505C8CBFF5004CF1610248040708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB000082028E3526F0018210D53276DB103744006D71708010C8CB055007CF165005FA0215CB6A12CB1FCB3F226EB39458CF17019132E201C901FB0093303234E25502F003003B3B513434CFFE900835D27080269FC07E90350C04090408F80C1C165B5B60001D00F232CFD633C58073C5B3327B5520BF75041B";

export const NftItemEditableCodeCell = Cell.fromBoc(
  Buffer.from(NftItemEditableCode, "hex")
)[0];

export const NftItemCodeCell = Cell.fromBoc(Buffer.from(NftItemCode, "hex"))[0];

export const NftCollectionCodeBoc =
  "te6cckECFAEAAh8AART/APSkE/S88sgLAQIBYgkCAgEgBAMAJbyC32omh9IGmf6mpqGC3oahgsQCASAIBQIBIAcGAC209H2omh9IGmf6mpqGAovgngCOAD4AsAAvtdr9qJofSBpn+pqahg2IOhph+mH/SAYQAEO4tdMe1E0PpA0z/U1NQwECRfBNDUMdQw0HHIywcBzxbMyYAgLNDwoCASAMCwA9Ra8ARwIfAFd4AYyMsFWM8WUAT6AhPLaxLMzMlx+wCAIBIA4NABs+QB0yMsCEsoHy//J0IAAtAHIyz/4KM8WyXAgyMsBE/QA9ADLAMmAE59EGOASK3wAOhpgYC42Eit8H0gGADpj+mf9qJofSBpn+pqahhBCDSenKgpQF1HFBuvgoDoQQhUZYBWuEAIZGWCqALnixJ9AQpltQnlj+WfgOeLZMAgfYBwGyi544L5cMiS4ADxgRLgAXGBEuAB8YEYGYHgAkExIREAA8jhXU1DAQNEEwyFAFzxYTyz/MzMzJ7VTgXwSED/LwACwyNAH6QDBBRMhQBc8WE8s/zMzMye1UAKY1cAPUMI43gED0lm+lII4pBqQggQD6vpPywY/egQGTIaBTJbvy9AL6ANQwIlRLMPAGI7qTAqQC3gSSbCHis+YwMlBEQxPIUAXPFhPLP8zMzMntVABgNQLTP1MTu/LhklMTugH6ANQwKBA0WfAGjhIBpENDyFAFzxYTyz/MzMzJ7VSSXwXiN0CayQ==";

export const NftCollectionCodeCell = Cell.fromBoc(
  Buffer.from(NftCollectionCodeBoc, "base64")
)[0];

export type RoyaltyParams = {
  royaltyFactor: number;
  royaltyBase: number;
  royaltyAddress: Address;
};

export type NftCollectionData = {
  ownerAddress: Address;
  nextItemIndex: bigint;
  collectionContent: string;
  commonContent: string;
  nftItemCode: Cell;
  royaltyParams: RoyaltyParams;
};

export type CollectionMintItemInput = {
  passAmount: bigint;
  index: number;
  ownerAddress: Address;
  content: string;
};

export type CollectionEditableMintItemInput = {
  passAmount: bigint;
  index: number;
  ownerAddress: Address;
  content: string;
  editorAddress: Address;
};

export const MintDictValue: DictionaryValue<CollectionMintItemInput> = {
  serialize(src, builder) {
    const nftItemMessage = beginCell();

    const itemContent = beginCell();
    itemContent.storeBuffer(Buffer.from(src.content));

    nftItemMessage.storeAddress(src.ownerAddress);
    nftItemMessage.storeRef(itemContent);

    builder.storeCoins(src.passAmount);
    builder.storeRef(nftItemMessage);
  },
  parse() {
    return {
      passAmount: 0n,
      index: 0,
      content: "",
      ownerAddress: new Address(0, Buffer.from([])),
      editorAddress: new Address(0, Buffer.from([])),
    };
  },
};

export const MintEditableDictValue: DictionaryValue<CollectionEditableMintItemInput> =
  {
    serialize(src, builder) {
      const nftItemMessage = beginCell();

      const itemContent = beginCell();
      itemContent.storeBuffer(Buffer.from(src.content));

      nftItemMessage.storeAddress(src.ownerAddress);
      nftItemMessage.storeAddress(src.editorAddress);
      nftItemMessage.storeRef(itemContent);

      builder.storeCoins(src.passAmount);
      builder.storeRef(nftItemMessage);
    },
    parse() {
      return {
        passAmount: 0n,
        index: 0,
        content: "",
        ownerAddress: new Address(0, Buffer.from([])),
        editorAddress: new Address(0, Buffer.from([])),
      };
    },
  };

// default#_ royalty_factor:uint16 royalty_base:uint16 royalty_address:MsgAddress = RoyaltyParams;
// storage#_ owner_address:MsgAddress next_item_index:uint64
//           ^[collection_content:^Cell common_content:^Cell]
//           nft_item_code:^Cell
//           royalty_params:^RoyaltyParams
//           = Storage;

// return
// (ds~load_msg_addr(), ;; owner_address
//  ds~load_uint(64), ;; next_item_index
//  ds~load_ref(), ;; content
//  ds~load_ref(), ;; nft_item_code
//  ds~load_ref()  ;; royalty_params
//  );

export function isNftCollectionNftEditable(data: Cell) {
  const s = data.asSlice();
  s.loadRef();

  const itemCode = s.loadRef();
  if (itemCode.equals(NftItemCodeCell)) {
    return false;
  }

  if (itemCode.equals(NftItemEditableCodeCell)) {
    return true;
  }

  throw new Error("Unknown nft item code");
}

export function buildNftCollectionDataCell(data: NftCollectionData): Cell {
  const dataCell = beginCell();

  dataCell.storeAddress(data.ownerAddress);
  dataCell.storeUint(data.nextItemIndex, 64);

  const contentCell = beginCell();

  const collectionContent = encodeOffChainContent(data.collectionContent);

  const commonContent = beginCell();
  commonContent.storeBuffer(Buffer.from(data.commonContent));
  // commonContent.storeString(data.commonContent)

  contentCell.storeRef(collectionContent);
  contentCell.storeRef(commonContent.asCell());
  dataCell.storeRef(contentCell);

  dataCell.storeRef(data.nftItemCode);

  const royaltyCell = beginCell();
  royaltyCell.storeUint(data.royaltyParams.royaltyFactor, 16);
  royaltyCell.storeUint(data.royaltyParams.royaltyBase, 16);
  royaltyCell.storeAddress(data.royaltyParams.royaltyAddress);
  dataCell.storeRef(royaltyCell);

  return dataCell.endCell();
}

export function buildNftCollectionStateInit(conf: NftCollectionData) {
  const dataCell = buildNftCollectionDataCell(conf);
  const stateInit: StateInit = {
    code: NftCollectionCodeCell,
    data: dataCell,
  };

  const stateInitCell = beginCell().store(storeStateInit(stateInit)).endCell();

  const address = contractAddress(0, {
    code: NftCollectionCodeCell,
    data: dataCell,
  });

  return {
    stateInit: stateInitCell,
    stateInitMessage: stateInit,
    address,
  };
}

export const OperationCodes = {
  Mint: 1,
  BatchMint: 2,
  ChangeOwner: 3,
  EditContent: 4,
  GetRoyaltyParams: 0x693d3950,
  GetRoyaltyParamsResponse: 0xa8cb00ad,
};

export const Queries = {
  mint: (params: {
    queryId?: number;
    passAmount: bigint;
    itemIndex: number;
    itemOwnerAddress: Address;
    itemContent: string;
  }) => {
    const msgBody = beginCell();

    msgBody.storeUint(OperationCodes.Mint, 32);
    msgBody.storeUint(params.queryId || 0, 64);
    msgBody.storeUint(params.itemIndex, 64);
    msgBody.storeCoins(params.passAmount);

    const itemContent = beginCell();
    // itemContent.storeString(params.itemContent)
    itemContent.storeBuffer(Buffer.from(params.itemContent));

    const nftItemMessage = beginCell();

    nftItemMessage.storeAddress(params.itemOwnerAddress);
    nftItemMessage.storeRef(itemContent);

    msgBody.storeRef(nftItemMessage);

    return msgBody.endCell();
  },
  batchMint: (params: {
    queryId?: number;
    items: CollectionMintItemInput[];
  }) => {
    if (params.items.length > 250) {
      throw new Error("Too long list");
    }

    const dict = Dictionary.empty(Dictionary.Keys.Uint(64), MintDictValue);
    for (const item of params.items) {
      dict.set(item.index, item);
    }

    const msgBody = beginCell();

    msgBody.storeUint(OperationCodes.BatchMint, 32);
    msgBody.storeUint(params.queryId || 0, 64);
    msgBody.storeDict(dict);

    return msgBody.endCell();
  },

  mintEditable: (params: {
    queryId?: number;
    item: CollectionEditableMintItemInput;
  }) => {
    const msgBody = beginCell();

    msgBody.storeUint(OperationCodes.Mint, 32);
    msgBody.storeUint(params.queryId || 0, 64);
    msgBody.storeUint(params.item.index, 64);
    msgBody.storeCoins(params.item.passAmount);

    const itemContent = beginCell();
    // itemContent.storeString(params.itemContent)
    itemContent.storeBuffer(Buffer.from(params.item.content));

    const nftItemMessage = beginCell();

    nftItemMessage.storeAddress(params.item.ownerAddress);
    nftItemMessage.storeAddress(params.item.editorAddress);
    nftItemMessage.storeRef(itemContent);

    msgBody.storeRef(nftItemMessage);

    return msgBody.endCell();
  },
  batchMintEditable: (params: {
    queryId?: number;
    items: CollectionEditableMintItemInput[];
  }) => {
    if (params.items.length > 250) {
      throw new Error("Too long list");
    }

    // let itemsMap = new Map<string, CollectionEditableMintItemInput>()

    // for (let item of params.items) {
    //     itemsMap.set(item.index.toString(10), item)
    // }

    // let dictCell = serializeDict(itemsMap, 64, (src, cell) => {
    //     let nftItemMessage = beginCell()

    //     let itemContent = beginCell()
    //     // itemContent.storeString(packages.content)
    //     itemContent.storeBuffer(Buffer.from(src.content))

    //     nftItemMessage.storeAddress(src.ownerAddress)
    //     nftItemMessage.storeAddress(src.editorAddress)
    //     nftItemMessage.storeRef(itemContent)

    //     cell.storeCoins(src.passAmount)
    //     cell.storeRef(nftItemMessage)
    // })

    const dict = Dictionary.empty(
      Dictionary.Keys.Uint(64),
      MintEditableDictValue
    );

    for (const item of params.items) {
      dict.set(item.index, item);
    }

    const msgBody = beginCell();

    msgBody.storeUint(OperationCodes.BatchMint, 32);
    msgBody.storeUint(params.queryId || 0, 64);
    msgBody.storeDict(dict);

    return msgBody.endCell();
  },

  changeOwner: (params: { queryId?: number; newOwner: Address }) => {
    const msgBody = beginCell();
    msgBody.storeUint(OperationCodes.ChangeOwner, 32);
    msgBody.storeUint(params.queryId || 0, 64);
    msgBody.storeAddress(params.newOwner);
    return msgBody.endCell();
  },
  getRoyaltyParams: (params: { queryId?: number }) => {
    const msgBody = beginCell();
    msgBody.storeUint(OperationCodes.GetRoyaltyParams, 32);
    msgBody.storeUint(params.queryId || 0, 64);
    return msgBody.endCell();
  },
  editContent: (params: {
    queryId?: number;
    collectionContent: string;
    commonContent: string;
    royaltyParams: RoyaltyParams;
  }) => {
    const msgBody = beginCell();
    msgBody.storeUint(OperationCodes.EditContent, 32);
    msgBody.storeUint(params.queryId || 0, 64);

    const royaltyCell = beginCell();
    royaltyCell.storeUint(params.royaltyParams.royaltyFactor, 16);
    royaltyCell.storeUint(params.royaltyParams.royaltyBase, 16);
    royaltyCell.storeAddress(params.royaltyParams.royaltyAddress);

    const contentCell = beginCell();

    const collectionContent = encodeOffChainContent(params.collectionContent);

    const commonContent = beginCell();
    // commonContent.storeString(params.commonContent)
    commonContent.storeBuffer(Buffer.from(params.commonContent));

    contentCell.storeRef(collectionContent);
    contentCell.storeRef(commonContent);

    msgBody.storeRef(contentCell);
    msgBody.storeRef(royaltyCell);

    return msgBody.endCell();
  },
};
