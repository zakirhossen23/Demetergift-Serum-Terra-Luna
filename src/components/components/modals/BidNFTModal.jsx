import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import UseFormInput from '../UseFormInput';
import { useCreateTokenForm } from '@/modules/Builder/hooks/useCreateTokenForm'
import { useCreateTokenStore } from '@/modules/Builder/stores/CreateTokenStore'
import { useWallet } from '@/stores/WalletService'
import { createBid } from '@/pages/Events/token'

import {
	CreateTxFailed,
	Timeout,
	TxFailed,
	TxResult,
	TxUnspecifiedError,
	useConnectedWallet,
	UserDenied,
	useWallet as useWalletTerra,
	WalletStatus as TerraWalletStatus 
  } from '@terra-money/wallet-provider';
  
  import { Fee, MsgSend } from '@terra-money/terra.js';
  
export default function BidNFTModal({
	show,
	onHide,
	ToAddress,
	tokenId,
	type,
	Highestbid,
	walletType
}) {
	const [Alert, setAlert] = useState('');
	const [Amount, AmountInput] = UseFormInput({
		type: 'text',
		placeholder: 'Amount',
	});
	const wallet = useWallet()
	console.log(ToAddress);
	const creatingTokenForm = useCreateTokenForm()

	//Terra Wallet
	const { connect, status ,availableConnections} = useWalletTerra()
	const connectedWallet = useConnectedWallet();
	const [txError, setTxError] = React.useState("");

	function activateWarningModal() {
		var alertELM = document.getElementById("alert");
		alertELM.style = 'contents';
		setAlert(`Amount cannot be under ${Highestbid} ${walletType}`)
	}
	async function bidNFT() {
		if (Number(Amount) < Number(Highestbid)) {
			activateWarningModal();
			return;
		}
		const creatingToken = useCreateTokenStore()
		creatingToken.changeData('decimals', Number(Amount) * 1000000000);
		creatingToken.changeData('ToAddress', ToAddress);
		var buttonProps = document.getElementsByClassName("btn btn-primary")[0];
		console.log(creatingToken.decimals);
		if (!wallet.account) {
			buttonProps.innerText = "Connect to wallet"
			await wallet.connect();
		}
		if (creatingToken.decimals != null) {

			await creatingToken.createToken();
		}
		
		await createBid(tokenId, wallet.account.address, Amount);

		console.log(`given ${Amount} highest => ${Highestbid}`)

		window.location.reload();
		window.document.getElementsByClassName("btn-close")[0].click();
	}
	
	async function  bidNFTByTerra(){
		console.log(Number(Amount))
		console.log(Number(Highestbid))
		if (Number(Amount) < Number(Highestbid)) {
			activateWarningModal();
			return;
		}
		var buttonProps = document.getElementsByClassName("btn btn-primary")[0];
		if (!connectedWallet) {
			buttonProps.innerText = "Connect to wallet"
			await connect("EXTENSION");
			return;
		}
		

		// if (connectedWallet.network.chainID.startsWith('columbus')) {
		// 	alert(`Please only execute this example on Testnet`);
		// 	return;
		// }
		console.log(ToAddress);
		connectedWallet
		.post({
			fee: new Fee(1000000, '200000uusd'),
			msgs: [
				new MsgSend(connectedWallet.walletAddress, ToAddress, {
					uusd: 1000000 * Amount,
				}),
			],
		})
		.then(() => {
			console.log("test1");
			

			console.log(`given ${Amount} highest => ${Highestbid}`)

			
		}).then(async ()=>{
			await createBid(tokenId, connectedWallet.walletAddress, Amount);
			

		}).then(()=>{
			window.location.reload();
			window.document.getElementsByClassName("btn-close")[0].click();
		})
		.catch((error) => {
			console.log("error:");
			console.log(error);
			if (error instanceof UserDenied) {
			setTxError('User Denied');
			} else if (error instanceof CreateTxFailed) {
			setTxError('Create Tx Failed: ' + error.message);
			} else if (error instanceof TxFailed) {
			setTxError('Tx Failed: ' + error.message);
			} else if (error instanceof Timeout) {
			setTxError('Timeout');
			} else if (error instanceof TxUnspecifiedError) {
			setTxError('Unspecified Error: ' + error.message);
			} else {
			setTxError(
				'Unknown Error: ' +
				(error instanceof Error ? error.message : String(error)),
			);
			}
		});
		
		
	}




	return (
		<Modal
			show={show}
			onHide={onHide}
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				{(type == "Cryptopunk") ? (
					<Modal.Title id="contained-modal-title-vcenter">
						Bid Cryptopunk
					</Modal.Title>) : (
					<Modal.Title id="contained-modal-title-vcenter">
						Bid NFT
					</Modal.Title>
				)}
			</Modal.Header>
			<Modal.Body className="show-grid">
				<Form>
					<div id='alert' style={{ display: 'none' }} className="alert alert-danger" role="alert">
						{Alert}
					</div>
					<Form.Group className="mb-3" controlId="formGroupName">
						<Form.Label>Bid Amount in {walletType}</Form.Label>
						{AmountInput}
					</Form.Group>
					<div className="d-grid">

						{(type == "Cryptopunk") ? (
							(walletType=="EVER")? (
								<Button variant="primary" onClick={bidNFT}>
									Bid Cryptopunk
								</Button>
								):
								(<Button variant="primary" onClick={bidNFTByTerra}>
								Bid Cryptopunk
								</Button>) )
								: ( 
								(walletType=="EVER")? (
									<Button variant="primary" onClick={bidNFT}>
										Bid NFT
									</Button>
								):
								(
									<Button variant="primary" onClick={bidNFTByTerra}>
									Bid NFT
									</Button>
								)
						)}
					</div>
				</Form>
			</Modal.Body>

		</Modal>

	);
}
