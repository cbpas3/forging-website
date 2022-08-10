import React, { useState } from 'react';

import { MenuIcon, XIcon } from '@heroicons/react/outline';
// import { NavBarListItem } from '../ui/NavBarListItem'
import { NavBarButton } from '../ui/NavBarButton';
// import { DropdownListItem } from '../ui/DropdownListItem'
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import { connectToMetamask } from '../utils/Ethers';

const Navbar = ({
	setLoading,
	loading,
	address,
	setAddress,
	balance,
	setBalance,
	provider,
	setProvider,
	tokenBalance,
	setTokenBalance,
}) => {
	const [nav, setNav] = useState(false);
	const handleClickHamburger = () => setNav(!nav);

	return (
		<div className='w-screen max-h-[80px] z-20 bg-white fixed drop-shadow-lg'>
			<div className='px-2 py-2 flex justify-between items-center w-full h-full'>
				<div className='flex items-center'>
					<img src='whiteLogo.svg' className='w-[64px]' alt='' />
					<h1 className='text-3xl text-white font-bold mr-4 sm:text-4xl font-jost'>
						FORGE
					</h1>
					<ul className='hidden md:flex'>
						{/* <NavBarListItem item={"Homepage"} /> */}
						{/* <NavBarListItem item={"Spiked Staking"} /> */}
						{/* <NavBarListItem item={"Other Staking"} /> */}
					</ul>
				</div>
				<div className='hidden md:flex pr-4'>
					<div className='text-white flex items-center mr-10'>
						{balance.toString().slice(0, 6) + ' MATIC'}
					</div>
					<NavBarButton
						text={`${address == '' ? 'Connect Wallet' : address}`}
						className='max-w-[200px]'
						onClick={async () => {
							const userData = await connectToMetamask();
							setAddress(userData.address);
							setBalance(userData.balancePolygon);
							setProvider(userData.provider);
							setTokenBalance(userData.balanceTokens);
						}}
					/>
				</div>
				<div className='md:hidden' onClick={handleClickHamburger}>
					{!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}
				</div>
			</div>

			<ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
				{/* <DropdownListItem item={"Homepage"} /> */}
				{/* <DropdownListItem item={"Spiked Staking"} /> */}
				{/* <DropdownListItem item={"Other Staking"} /> */}
				<NavBarButton
					text={`${address == '' ? 'Connect Wallet' : address}`}
					className='mb-4 mt-4 w-full'
					onClick={async () => {
						const userData = await connectToMetamask();
						setAddress(userData.address);
						setBalance(userData.balancePolygon);
						setProvider(userData.provider);
						setTokenBalance(userData.balanceTokens);
					}}
				/>
			</ul>
		</div>
	);
};

Navbar.propTypes = {
	setLoading: PropTypes.func,
	loading: PropTypes.bool,
	address: PropTypes.string,
	setAddress: PropTypes.func,
	balance: PropTypes.number,
	setBalance: PropTypes.func,
	provider: ethers.providers.Web3Provider,
	setProvider: PropTypes.func,
	tokenBalance: PropTypes.object,
	setTokenBalance: PropTypes.func,
};

export default Navbar;
