import { ethers } from 'ethers';

export const login = (setAddress, setBalance) => {
	try {
		window.ethereum
			.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: '0x89' }], // chainId must be in hexadecimal numbers
			})
			.then(
				window.ethereum
					.request({ method: 'eth_requestAccounts' })
					.then((res) => {
						setAddress(res[0]);
						window.ethereum
							.request({
								method: 'eth_getBalance',
								params: [res[0], 'latest'],
							})
							.then((balance) => {
								// Setting balance
								setBalance(ethers.utils.formatEther(balance));
								// setdata({
								//   Balance: ethers.utils.formatEther(balance),
								// });
							});
					})
			);
	} catch (error) {
		// This error code indicates that the chain has not been added to MetaMask
		// if it is not, then install it into the user MetaMask
		if (error.code === 4902) {
			try {
				window.ethereum.request({
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
		}
		console.error(error);
	}
};

export const getNFTData = async (account) => {
	// const block = await provider.getBlockNumber()
	// const tokenContract = new ethers.Contract('0x7986127F5c24151f9d2acE39F13a4160eed006a0', ForgeNFTsABI, provider);
	// const balanceToken0 = await tokenContract.balanceOf(account, 0);
	// const balanceToken1 = await tokenContract.balanceOf(account, 1);
	// const balanceToken2 = await tokenContract.balanceOf(account, 2);
	// const balanceToken3 = await tokenContract.balanceOf(account, 3);
	// const balanceToken4 = await tokenContract.balanceOf(account, 4);
	// const balanceToken5 = await tokenContract.balanceOf(account, 5);
	// const balanceToken6 = await tokenContract.balanceOf(account, 6);
	// return { balanceToken0, balanceToken1, balanceToken2, balanceToken3, balanceToken4, balanceToken5, balanceToken6 }
	return account;
};
