
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { WalletProvider, useWallet as useWalletTerra,WalletStatus as TerraWalletStatus } from '@terra-money/wallet-provider';
import React from 'react';
import { Provider } from "@project-serum/anchor";
// @ts-ignore
import Wallet from "@project-serum/sol-wallet-adapter";

import {
    Signer,
    ConfirmOptions,

    TransactionSignature,
    PublicKey,
} from "@solana/web3.js";
import { useState, useEffect, useMemo } from "react";
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import { useWallet as useWalletTon} from '@/stores/WalletService';

import NotifyingProvider from "@/pages/SwapPage";


export default function Login() {
    // const NotifyingProvider = swappage.NotifyingProvider;
    const TONwallet = useWalletTon()
    async function onClickConnectTON() {
        await TONwallet.connect();
        const urlParams = new URLSearchParams(window.location.search)
        let redirecturl = urlParams.get("url")?.toString();
        window.location.href = (redirecturl);
    }
    async function onClickDisConnectTON() {
        await TONwallet.disconnect();
        window.location.reload();
    }

    async function onClickConnectSollet() {
        await Serumwallet.connect();
        const urlParams = new URLSearchParams(window.location.search)
        let redirecturl = urlParams.get("url")?.toString();
        window.location.href = (redirecturl);
    }
    async function onClickDisConnectSollet() {
        await Serumwallet.disconnect();
        window.location.reload();
    }
    const [isConnected, setIsConnected] = useState(false);
    const [provider, Serumwallet] = useMemo(() => {
        const opts = {
            preflightCommitment: "recent",
            commitment: "recent",
        };
        const network = "https://solana-api.projectserum.com";
        const Serumwallet = new Wallet("https://www.sollet.io", network);
        const connection = new Connection(network, opts.preflightCommitment);
        const provider = new NotifyingProvider(
            connection,
            Serumwallet,
            opts,
            (tx, err) => {
                if (err) {
                    console.log(`Error: ${err.toString()}`, {
                        variant: "error",
                    });
                } else {
                    console.log("Transaction sent", {
                        variant: "success",
                        action: (
                            <Button
                                color="inherit"
                                component="a"
                                target="_blank"
                                rel="noopener"
                                href={`https://explorer.solana.com/tx/${tx}`}
                            >
                                View on Solana Explorer
                            </Button>
                        ),
                    });
                }
            }
        );
        return [provider, Serumwallet];
    }, []);

    Serumwallet.on("connect", () => {
        console.log("Wallet connected", { variant: "success" });
        setIsConnected(true);
    });
    Serumwallet.on("disconnect", () => {
        console.log("Wallet disconnected", { variant: "info" });
        setIsConnected(false);
    });

    //Terra Wallet
    const { connect, status ,availableConnections} = useWalletTerra()
    async function connectTerra(type) {
        // TerraWallet.connect();
        console.log(status);
        console.log(TerraWalletStatus.WALLET_NOT_CONNECTED);
        if(status !== TerraWalletStatus.WALLET_CONNECTED)
            await connect("EXTENSION");
        const urlParams = new URLSearchParams(window.location.search)
        let redirecturl = urlParams.get("url")?.toString();
        window.location.href = (redirecturl);
        

    }
    
    return (
        
            <><>
                <Head>
                    <title>Login</title>
                    <meta name="description" content="Login" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
    
                <Row>
                    <Col style={{ padding: "3% 37%", "paddingTop": 0, width: "100%" }}>
                        <div style={{ width: "500px", background: "transparent", padding: "19px", borderRadius: "4px", height: "100%", border: "white solid" }}>
                            <div style={{ margin: "0px 0px 53px 0px" }}>
                                <h1>Login</h1>
                            </div>
                            <div style={{ margin: "0px 0px 12px 0px" }}>
                                <h4>Please select one of the option to Login</h4>
                            </div>

                            <div onClick={onClickConnectSollet} style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary">
                                    <img style={{ height: '51px', width: '51px' }} src="https://www.sollet.io/favicon.ico" />
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                        <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                            Sollet
                                        </span>
                                        <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                            Connect With Serum wallet
                                        </span>
                                    </div>
                                </div>
                                <div  onClick={onClickConnectTON} style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary">
                                    <img style={{ height: '51px', width: '51px' }} src="https://i.postimg.cc/pXRpptg2/ever.png" />
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                        <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                            TON
                                        </span>
                                        <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                            Connect With Everscale wallet
                                        </span>
                                    </div>
                                </div>
                                <div  onClick={connectTerra} style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary">
                                    <img style={{ height: '51px', width: '51px' }} src="https://cryptologos.cc/logos/terra-luna-luna-logo.png?v=018" />
                                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '11px', height: '51px' }}>
                                        <span style={{ fontWeight: 'bolder', padding: '0', fontFamily: 'sans-serif', height: '100%', margin: '-12px 0' }}>
                                            UST
                                        </span>
                                        <span style={{ fontSize: '15px', padding: '0', margin: '0', fontFamily: 'sans-serif' }}>
                                            Connect With Terra wallet
                                        </span>
                                    </div>
                                </div>
                            
                            
                            
                        </div>
                    </Col>
                </Row>
            </></>
            
    );
    
}

