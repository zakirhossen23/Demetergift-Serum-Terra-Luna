
import Head from 'next/head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';
import { Connection, SystemProgram, Transaction, clusterApiUrl } from '@solana/web3.js';
import { useWallet } from '@/stores/WalletService'
export default function Login() {
    const TONwallet = useWallet()
    async function onClickConnectTON  () {
       await TONwallet.connect();
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


                        <div onClick={onClickConnectTON} style={{ display: "flex", padding: "10px", borderRadius: "5px", cursor: "pointer", margin: "20px 0" }} className="btn-primary">
                            <img style={{ height: '51px',width: '51px' }} src="https://i.postimg.cc/pXRpptg2/ever.png" />
                            <div style={{ display: 'flex',flexDirection: 'column',marginLeft: '11px',height: '51px' }}>
                                <span style={{ fontWeight: 'bolder',padding: '0',fontFamily: 'sans-serif',height: '100%',margin: '-12px 0' }}>
                                    TON
                                </span>
                                <span style={{ fontSize: '15px',padding: '0',margin: '0',fontFamily: 'sans-serif' }}>
                                    Connect With Everscale wallet
                                </span>
                            </div>
                        </div>
                      </div>
                </Col>
            </Row>
        </></>
    );
}