import { ethers } from 'ethers';
import ForgingPartABI from '../files/ForgingPart_ABI.json';
import ForgeNFTsABI from '../files/ForgeNFTsABI.json';

export async function connectToMetamask() {
	try {
		await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: '0x89' }], // chainId must be in hexadecimal numbers
		});
	} catch (error) {
		// This error code indicates that the chain has not been added to MetaMask
		// if it is not, then install it into the user MetaMask
		if (error.code === 4902) {
			try {
				await window.ethereum.request({
					method: 'wallet_addEthereumChain',
					params: [
						{
							chainId: '0x89',
							rpcUrl: 'https://polygon-rpc.com/',
						},
					],
				});
			} catch (addError) {
				console.error(addError);
			}
		} else {
			return { block: '', address: 'error', balance: '' };
		}
		console.error(error);
	}
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const accounts = await provider.send('eth_requestAccounts', []);
	const balance = await provider.getBalance(accounts[0]);
	const balanceInEther = ethers.utils.formatEther(balance);
	const block = await provider.getBlockNumber();

	// Not sure what this does
	provider.on('block');

	const balances = await getAllTokenBalances(provider, accounts[0]);

	return {
		block: block,
		address: accounts[0],
		balancePolygon: balanceInEther,
		provider: provider,
		balanceTokens: balances,
	};
}

export async function getTokenBalance(provider, id, address) {
	const forgeContract = new ethers.Contract(
		'0x7986127F5c24151f9d2acE39F13a4160eed006a0',
		ForgeNFTsABI,
		provider
	);
	const tokenBalance = await forgeContract.balanceOf(address, id);
	return tokenBalance;
}

export async function getAllTokenBalances(provider, address) {
	const forgeContract = new ethers.Contract(
		'0x7986127F5c24151f9d2acE39F13a4160eed006a0',
		ForgeNFTsABI,
		provider
	);
	const redBalance = await forgeContract.balanceOf(address, 0);
	const blackBalance = await forgeContract.balanceOf(address, 1);
	const blueBalance = await forgeContract.balanceOf(address, 2);
	const brownBalance = await forgeContract.balanceOf(address, 3);
	const greenBalance = await forgeContract.balanceOf(address, 4);
	const orangeBalance = await forgeContract.balanceOf(address, 5);
	const pinkBalance = await forgeContract.balanceOf(address, 6);
	return {
		Red: redBalance,
		Black: blackBalance,
		Blue: blueBalance,
		Brown: brownBalance,
		Green: greenBalance,
		Orange: orangeBalance,
		Pink: pinkBalance,
	};
}

export async function forge(provider, id) {
	const signer = provider.getSigner();
	const forgeFunctionsContract = new ethers.Contract(
		'0x93274988B793efaF59537c1a95C3FbECDd3dc065',
		ForgingPartABI,
		provider
	);
	const daiContractWithSigner = forgeFunctionsContract.connect(signer);
	return await daiContractWithSigner.forge(id);
}

export async function smelt(provider, id) {
	const signer = provider.getSigner();
	const forgeFunctionsContract = new ethers.Contract(
		'0x93274988B793efaF59537c1a95C3FbECDd3dc065',
		ForgingPartABI,
		provider
	);
	const daiContractWithSigner = forgeFunctionsContract.connect(signer);
	return await daiContractWithSigner.smelt(id);
}

export async function trade(provider, tradeIn, for_) {
	const signer = provider.getSigner();
	const forgeFunctionsContract = new ethers.Contract(
		'0x93274988B793efaF59537c1a95C3FbECDd3dc065',
		ForgingPartABI,
		provider
	);
	const daiContractWithSigner = forgeFunctionsContract.connect(signer);
	return await daiContractWithSigner.trade(tradeIn, for_);
}
