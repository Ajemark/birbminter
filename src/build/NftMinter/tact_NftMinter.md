# TACT Compilation Report
Contract: NftMinter
BOC Size: 2155 bytes

# Types
Total Types: 15

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## Transfer
TLB: `transfer#5e19f431 query_id:uint64 new_owner:address = Transfer`
Signature: `Transfer{query_id:uint64,new_owner:address}`

## MintNft
TLB: `mint_nft#651dcc1a body:^cell amount:int257 collection_address:address refCode:int257 = MintNft`
Signature: `MintNft{body:^cell,amount:int257,collection_address:address,refCode:int257}`

## ChangeContractOwner
TLB: `change_contract_owner#109287bc newOwner:address = ChangeContractOwner`
Signature: `ChangeContractOwner{newOwner:address}`

## ChangeCollectionOwner
TLB: `change_collection_owner#45138252 collection_address:address body:^cell = ChangeCollectionOwner`
Signature: `ChangeCollectionOwner{collection_address:address,body:^cell}`

## TransferNFT
TLB: `transfer_nft#199bb7a1 contractAddress:address itemIndex:int257 = TransferNFT`
Signature: `TransferNFT{contractAddress:address,itemIndex:int257}`

## CollectionData
TLB: `_ next_item_index:int257 collection_content:^cell owner_address:address = CollectionData`
Signature: `CollectionData{next_item_index:int257,collection_content:^cell,owner_address:address}`

## ItemData
TLB: `_ owner:address collection_address:address item_index:int257 individual_content:^cell = ItemData`
Signature: `ItemData{owner:address,collection_address:address,item_index:int257,individual_content:^cell}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

# Get Methods
Total Get Methods: 3

## balance

## allCodes

## userCode

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
15509: Only deployer is allowed to withdraw
41620: Minting Disabled
49699: Only owner is allowed to change contract owner
50195: Not Enough Tons sent for minting!!
50576: Only deployer is allowed to call this function
62742: non-sequential NFTs