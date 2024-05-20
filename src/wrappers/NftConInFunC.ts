import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type NftConInFunCConfig = {};

export function nftConInFunCConfigToCell(config: NftConInFunCConfig): Cell {
    return beginCell().endCell();
}

export class NftConInFunC implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new NftConInFunC(address);
    }

    static createFromConfig(config: NftConInFunCConfig, code: Cell, workchain = 0) {
        const data = nftConInFunCConfigToCell(config);
        const init = { code, data };
        return new NftConInFunC(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
