
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';

import Wallet from "@project-serum/sol-wallet-adapter";

export default function Login() {

    async function loginwithsollet() {
        let connection = new Connection(clusterApiUrl('devnet'));
        let providerUrl = 'https://www.sollet.io';
        let wallet = new Wallet(providerUrl);
        wallet.on('connect', publicKey => console.log('Connected to ' + publicKey.toBase58()));
        wallet.on('disconnect', () => console.log('Disconnected'));
        await wallet.connect();

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
                        <div onClick={loginwithsollet} style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary">
                            <img style={{ height: "45px", width: "46px" }} src="https://polis.metis.io/static/img/metamask-fox.c06f3a3e.svg" />
                            <div style={{ display: "flex", flexDirection: "column", marginLeft: "11px" }}>
                                <span style={{ fontWeight: "bolder", fontFamily: "sans-serif" }}>
                                    Metamask
                                </span>
                                <span style={{ fontSize: "15px", fontFamily: "sans-serif" }}>
                                    Connect With MetaMask
                                </span>
                            </div>
                        </div>



                    </div>
                </Col>

            </Row>

        </></>
    );
}