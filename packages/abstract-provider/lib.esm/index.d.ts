import { BigNumber, BigNumberish } from "@quais/bignumber";
import { BytesLike } from "@quais/bytes";
import { Network } from "@quais/networks";
import { Deferrable, Description } from "@quais/properties";
import { AccessListish, Transaction } from "@quais/transactions";
import { OnceBlockable } from "@quais/web";
export type TransactionRequest = {
    to?: string;
    from?: string;
    nonce?: BigNumberish;
    gasLimit?: BigNumberish;
    gasPrice?: BigNumberish;
    data?: BytesLike;
    value?: BigNumberish;
    chainId?: number;
    type?: number;
    accessList?: AccessListish;
    maxPriorityFeePerGas?: BigNumberish;
    maxFeePerGas?: BigNumberish;
    customData?: Record<string, any>;
    ccipReadEnabled?: boolean;
    externalGasLimit?: BigNumberish;
    externalGasPrice?: BigNumberish;
    externalGasTip?: BigNumberish;
    externalData?: BytesLike;
    externalAccessList?: AccessListish;
};
export interface TransactionResponse extends Transaction {
    hash: string;
    blockNumber?: number;
    blockHash?: string;
    timestamp?: number;
    confirmations: number;
    from: string;
    raw?: string;
    wait: (confirmations?: number) => Promise<TransactionReceipt>;
}
export type BlockTag = string | number;
export interface _Block {
    hash: string;
    parentHash: Array<string> | string;
    parentEntropy: Array<string> | string;
    number: Array<number> | number;
    timestamp: number;
    nonce: string;
    difficulty: number;
    gasLimit: BigNumber;
    gasUsed: BigNumber;
    miner: string;
    extraData: string;
    transactionsRoot: string;
    baseFeePerGas?: null | BigNumber;
    extRollupRoot: string;
    extTransactionsRoot: string;
    stateRoot: string;
    location: string;
    manifestHash: Array<string> | string;
    mixHash: string;
    receiptsRoot: string;
    order: number;
    parentDeltaS: Array<string> | string;
    sha3Uncles: string;
    size: number;
    subManifest: Array<string>;
    totalEntropy: number;
    uncles: Array<string>;
}
export interface Block extends _Block {
    transactions: Array<string>;
    extTransactions: Array<string>;
}
export interface BlockWithTransactions extends _Block {
    transactions: Array<TransactionResponse>;
}
export interface Log {
    blockNumber: number;
    blockHash: string;
    transactionIndex: number;
    removed: boolean;
    address: string;
    data: string;
    topics: Array<string>;
    transactionHash: string;
    logIndex: number;
}
export interface TransactionReceipt {
    to: string;
    from: string;
    contractAddress: string;
    transactionIndex: number;
    root?: string;
    gasUsed: BigNumber;
    logsBloom: string;
    blockHash: string;
    transactionHash: string;
    etxs: Array<Transaction>;
    logs: Array<Log>;
    blockNumber: number;
    confirmations: number;
    cumulativeGasUsed: BigNumber;
    effectiveGasPrice: BigNumber;
    byzantium: boolean;
    type: number;
    status?: number;
}
export interface FeeData {
    lastBaseFeePerGas: null | BigNumber;
    maxFeePerGas: null | BigNumber;
    maxPriorityFeePerGas: null | BigNumber;
    gasPrice: null | BigNumber;
}
export interface EventFilter {
    address?: string;
    topics?: Array<string | Array<string> | null>;
}
export interface Filter extends EventFilter {
    fromBlock?: BlockTag;
    toBlock?: BlockTag;
}
export interface FilterByBlockHash extends EventFilter {
    blockHash?: string;
}
export declare abstract class ForkEvent extends Description {
    readonly expiry: number;
    readonly _isForkEvent?: boolean;
    static isForkEvent(value: any): value is ForkEvent;
}
export declare class BlockForkEvent extends ForkEvent {
    readonly blockHash: string;
    readonly _isBlockForkEvent?: boolean;
    constructor(blockHash: string, expiry?: number);
}
export declare class TransactionForkEvent extends ForkEvent {
    readonly hash: string;
    readonly _isTransactionOrderForkEvent?: boolean;
    constructor(hash: string, expiry?: number);
}
export declare class TransactionOrderForkEvent extends ForkEvent {
    readonly beforeHash: string;
    readonly afterHash: string;
    constructor(beforeHash: string, afterHash: string, expiry?: number);
}
export type EventType = string | Array<string | Array<string>> | EventFilter | ForkEvent;
export type Listener = (...args: Array<any>) => void;
export declare abstract class Provider implements OnceBlockable {
    abstract getNetwork(): Promise<Network>;
    abstract getBlockNumber(): Promise<number>;
    abstract getGasPrice(): Promise<BigNumber>;
    abstract getMaxPriorityFeePerGas(): Promise<BigNumber>;
    getFeeData(): Promise<FeeData>;
    abstract getBalance(addressOrName: string | Promise<string>, blockTag?: BlockTag | Promise<BlockTag>): Promise<BigNumber>;
    abstract getTransactionCount(addressOrName: string | Promise<string>, blockTag?: BlockTag | Promise<BlockTag>): Promise<number>;
    abstract getCode(addressOrName: string | Promise<string>, blockTag?: BlockTag | Promise<BlockTag>): Promise<string>;
    abstract getStorageAt(addressOrName: string | Promise<string>, position: BigNumberish | Promise<BigNumberish>, blockTag?: BlockTag | Promise<BlockTag>): Promise<string>;
    abstract sendTransaction(signedTransaction: string | Promise<string>): Promise<TransactionResponse>;
    abstract call(transaction: Deferrable<TransactionRequest>, blockTag?: BlockTag | Promise<BlockTag>): Promise<string>;
    abstract estimateGas(transaction: Deferrable<TransactionRequest>): Promise<BigNumber>;
    abstract getBlock(blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>, simplify?: boolean): Promise<Block>;
    abstract getBlockWithTransactions(blockHashOrBlockTag: BlockTag | string | Promise<BlockTag | string>): Promise<BlockWithTransactions>;
    abstract getTransaction(transactionHash: string): Promise<TransactionResponse>;
    abstract getTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>;
    abstract getLogs(filter: Filter): Promise<Array<Log>>;
    abstract resolveName(name: string | Promise<string>): Promise<null | string>;
    abstract lookupAddress(address: string | Promise<string>): Promise<null | string>;
    abstract on(eventName: EventType, listener: Listener): Provider;
    abstract once(eventName: EventType, listener: Listener): Provider;
    abstract emit(eventName: EventType, ...args: Array<any>): boolean;
    abstract listenerCount(eventName?: EventType): number;
    abstract listeners(eventName?: EventType): Array<Listener>;
    abstract off(eventName: EventType, listener?: Listener): Provider;
    abstract removeAllListeners(eventName?: EventType): Provider;
    addListener(eventName: EventType, listener: Listener): Provider;
    removeListener(eventName: EventType, listener: Listener): Provider;
    abstract waitForTransaction(transactionHash: string, confirmations?: number, timeout?: number): Promise<TransactionReceipt>;
    readonly _isProvider: boolean;
    constructor();
    static isProvider(value: any): value is Provider;
}
//# sourceMappingURL=index.d.ts.map