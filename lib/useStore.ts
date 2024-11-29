"use client"

import { create } from 'zustand';
import { TxStateMachine,VaneClientRpc,createVaneClient } from 'vane_lib'
import React from 'react';

interface FormData {
    recipient: string;
    amount: number; 
    asset: string;
    network: string;
  }

interface TransactionState {
    formData: FormData;
    // storing incoming transactions that serve as sender notifications
    transactions: TxStateMachine[];  // Store all transaction updates
    // storing incoming transactions that serve as receiver notifications the receiver needs to confirm or reject
    recvTransactions: TxStateMachine[]
    vaneClient:VaneClientRpc | null;
    status: 'initial'|'receiverNotRegistered'|'pending' |'RecvAddrFailed' |'receiverConfirmed' | 'senderConfirmed' | 'completed';
    wsUrl: string;

    // Methods
    storeSetFormData: (formData: FormData) => void;
    setStatus: (status: 'initial'|'receiverNotRegistered'|'pending' |'RecvAddrFailed' |'receiverConfirmed' | 'senderConfirmed' | 'completed') => void;
    // ----------------------//
    txStatusSorter: (update:TxStateMachine) => void;
    sortTransactionsUpdates: (txs:TxStateMachine[]) => void;
    clearAllTransactions: () => void; 
    // sender context
    removeTransaction: (txNonce: number) => void;  // Add this
    addTransaction: (tx: TxStateMachine) => void;
    // receiver context
    addRecvTransaction: (tx: TxStateMachine) => void;
    removeRecvTransaction: (txNonce: number) => void;
    // ----------------------//
    initializeWebSocket: () => Promise<void>;
    setWsUrl: (url:string) => void;
}




export const useTransactionStore = create<TransactionState>((set, get) => ({
    // state
    formData: {
        recipient: '',
        amount: 0,
        asset: 'Eth',
        network: 'Ethereum'
    },
    transactions: [],
    recvTransactions: [],
    vaneClient: null,
    status: 'initial',
    wsUrl: '',
    //------------------**----------------------//
  
    storeSetFormData: (formData: FormData) => set({formData}),

    setStatus: (status: 'initial'|'receiverNotRegistered'|'pending' |'RecvAddrFailed' |'receiverConfirmed' | 'senderConfirmed' | 'completed') => set({status}),

    txStatusSorter: (update: TxStateMachine) => {
        set((state) => {
            switch (update.status) {
                // @ts-ignore
                case 'Genesis':
                    console.log("Genesis");
                    // Check if transaction already exists in recvTransactions
                    if (!state.recvTransactions.some(tx => tx.txNonce === update.txNonce)) {
                        return {
                            ...state,
                            recvTransactions: [update, ...state.recvTransactions]
                        };
                    }
                    return state;
                // @ts-ignore
                case 'RecvAddrConfirmed':
                // @ts-ignore
                case 'ReceiverNotRegistered':
                // @ts-ignore
                case 'RecvAddrFailed':
                // @ts-ignore
                case 'SenderConfirmed':
                    // Check if transaction already exists in transactions
                    if (!state.transactions.some(tx => tx.txNonce === update.txNonce)) {
                        return {
                            ...state,
                            transactions: [update, ...state.transactions]
                        };
                    }
                    return state;
     
                default:
                    return state;
            }
        });
     },
    
    sortTransactionsUpdates: (txs: TxStateMachine[]) => {
        console.log("sortTransactionsUpdates");
        txs.forEach(tx => {
            // Call txStatusSorter directly as it now handles the state updates
            get().txStatusSorter(tx);
        });
    },
   
    addTransaction: (tx: TxStateMachine) =>
      set((state) => ({
        transactions: [tx, ...state.transactions]
      })),

    removeTransaction: (txNonce: number) =>{
        set((state) => ({
            transactions: state.transactions.filter(tx => tx.txNonce !== txNonce)
          }))
    },

    addRecvTransaction: (tx: TxStateMachine) =>
      set((state) => ({
        recvTransactions: [tx, ...state.recvTransactions]
      })),

    removeRecvTransaction: (txNonce: number) =>{
        set((state) => ({
            recvTransactions: state.recvTransactions.filter(tx => tx.txNonce !== txNonce)
          }))
    },

    clearAllTransactions: () => {
        set((state) => ({
            ...state,
            transactions: [],
            recvTransactions: []
        }));
    },

    initializeWebSocket: async () => {
        try {
            const state = get();
            
            const vaneClientInstance = await createVaneClient(state.wsUrl);
            if (!vaneClientInstance) {
                console.error('Failed to create Vane client');
                return;
            }
     
            set({ vaneClient: vaneClientInstance });
     
            // Watch for transaction updates
            vaneClientInstance.watchTxUpdates((update: TxStateMachine) => {
                try {
                    console.log("Received update:", update);
                    get().txStatusSorter(update);
                } catch (error) {
                    console.error('Error processing transaction update:', error);
                }
            });
     
        } catch (error) {
            console.error('Failed to initialize WebSocket:', error);
            set({ vaneClient: null }); // Reset client on error
        }
     },

    setWsUrl: (url:string) =>{
        set({wsUrl: url});
    },

}));

  // Custom hook for initializing WebSocket
export const useInitializeWebSocket = () => {
    console.log("in the initialization websocket hook");
    const wsUrl = useTransactionStore(state => state.wsUrl);
    const vaneClient = useTransactionStore(state => state.vaneClient);
    console.log(wsUrl)

    const initializeWebSocket = useTransactionStore(state => state.initializeWebSocket);
    console.log("useInitializeWebSocket")
    React.useEffect(() => {
        if(!vaneClient){
            initializeWebSocket();
        }
    }, [vaneClient,initializeWebSocket]);
};


// --------------------- Wallet Engine ----------------------------- //
import { createWalletClient, custom, WalletClient } from 'viem'
import { mainnet } from 'viem/chains'

export interface WalletStore {
    wallets: WalletInstance[];
    addWallet: (wallet: WalletInstance) => void;
    removeWallet: (address: string) => void;
    addWalletClient: () => Promise<void>;
 }
 
export type WalletInstance = {
    address: string;
    eth_client: WalletClient;
    token: string;
 };
 
export const useWalletStore = create<WalletStore>((set, get) => ({
    wallets: [],
    
    addWallet: (wallet) => set((state) => ({
        wallets: [...state.wallets, wallet]
    })),
 
    removeWallet: (address) => set((state) => ({
        wallets: state.wallets.filter(w => w.address !== address)
    })),
 
    addWalletClient: async () => {
        try {
            console.log("addWalletClient")
           // Function that only runs in browser
            const checkWindow = () => {
                if (typeof window !== 'undefined') {
                    console.log("window found")
                    return window;
                }
                throw new Error("No window object found");
            };

            const win = checkWindow();
            //@ts-ignore
            if (typeof win.ethereum !== 'undefined') {
                //@ts-ignore
                await win.ethereum?.request({
                    method: 'wallet_requestPermissions',
                    params: [{ eth_accounts: {} }]
                });
            }

            const client = createWalletClient({
                chain: mainnet,
                //@ts-ignore
                transport: custom(window?.ethereum!)
            });

            const nativeCurrency = client.chain.nativeCurrency.name;
            
            const [address] = await client.requestAddresses();
            
            const existingWallets = get().wallets;
            if (!existingWallets.some(w => w.address === address)) {
                get().addWallet({
                    address,
                    eth_client: client,
                    token: nativeCurrency,
                });
            }
        } catch (error) {
            console.error("Failed to add wallet client:", error);
            throw error;
        }
    }
 }));