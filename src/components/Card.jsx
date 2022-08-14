import React from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';

export const Card = ({
	name,
	hoveredOn,
	setHoveredOn,
	text,
	onForge,
	onSmelt,
	provider,
	tokenBalance,
	setTokenBalance,
	secondRow,
	setPopUpBool,
	setTradingFor,
}) => {
	const ids = {
		Red: 0,
		Black: 1,
		Blue: 2,
		Brown: 3,
		Green: 4,
		Orange: 5,
		Pink: 6,
	};

	const glow = () => {
		return (
			<div className='absolute top-0 -left-1 h-[310px]  w-[190px] bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 z-10' />
		);
	};

	const glowGroup = (name, hovered, glow1, glow2, glow3 = '') => {
		return hoveredOn[hovered]
			? name == glow1
				? glow()
				: name == glow2
				? glow()
				: name == glow3
				? glow()
				: ''
			: '';
	};

	const recipe = (color1, color2, color3 = '') => {
		return (
			<p className='w-full text-gray-800 pl-2 pb-2'>
				{`${color1} + ${color2}` + (!color3 == '' ? ` + ${color3}` : '')}
			</p>
		);
	};

	return (
		<div className='relative'>
			<div
				className={
					name +
					' relative w-[180px] leading-none flex flex-col items-center rounded-lg shadow-md bg-white mt-1  z-20'
				}
				onMouseEnter={() => {
					const temp = { ...hoveredOn };
					for (const key in temp) {
						if (temp.hasOwnProperty(key)) {
							temp[key] = false;
						}
					}
					temp[name] = true;
					setHoveredOn(temp);
				}}
				onMouseLeave={() => {
					const temp = { ...hoveredOn };
					temp[name] = false;
					setHoveredOn(temp);
				}}
			>
				<div className='rounded-lg m-2 bg-gray-100 h-[160px] w-[160px] flex items-center justify-center'>
					<img className='max-w-[140px]' src={`SimpleNFTs/${name}.png`} />
				</div>
				<div className='pb-4'>
					<p
						className='
                    mb-2 md:text-2xl text-lg font-bold 
                    tracking-tight text-gray-800 pl-2'
					>{`${name}`}</p>
					{secondRow
						? name == 'Brown'
							? recipe('Red', 'Black')
							: name == 'Green'
							? recipe('Red', 'Blue')
							: name == 'Orange'
							? recipe('Blue', 'Black')
							: name == 'Pink'
							? recipe('Red', 'Black', 'Blue')
							: ''
						: ''}
					<p className='w-full text-gray-800 pl-2 pb-2'>{`Owned: ${tokenBalance[name]}`}</p>
					<div className='w-full flex mt-2 space-x-3 lg:mt-2'>
						<button
							className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-indigo-400 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
							onClick={async () => {
								try {
									const result = await onForge(provider, ids[name]);
									alert('Transaction hash: ' + result.hash);
								} catch (error) {
									const errorObject = { error };

									const reason = errorObject.error.reason;
									alert('revert reason:', string(reason));
								}
							}}
						>
							{text}
						</button>
						{secondRow ? (
							<button
								className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-indigo-400 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
								onClick={async () => {
									try {
										const result = await onSmelt(provider, ids[name]);
										alert('Transaction hash: ' + result.hash);
									} catch (error) {
										const errorObject = { error };

										const reason = errorObject.error.reason;
										alert('revert reason:', string(reason));
									}
								}}
							>
								{'Smelt'}
							</button>
						) : (
							''
						)}
						{!secondRow ? (
							<button
								className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-indigo-400 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
								onClick={() => {
									setTradingFor(name);
									setPopUpBool(true);
								}}
							>
								{'Trade for'}
							</button>
						) : (
							''
						)}
					</div>
				</div>
			</div>
			{glowGroup(name, 'Brown', 'Red', 'Black')}
			{glowGroup(name, 'Green', 'Red', 'Blue')}
			{glowGroup(name, 'Orange', 'Black', 'Blue')}
			{glowGroup(name, 'Pink', 'Red', 'Blue', 'Black')}
		</div>
	);
};

Card.propTypes = {
	name: PropTypes.string,
	hoveredOn: PropTypes.object,
	setHoveredOn: PropTypes.func,
	text: PropTypes.string,
	onForge: PropTypes.func,
	onSmelt: PropTypes.func,
	provider: ethers.providers.Web3Provider,
	tokenBalance: PropTypes.object,
	setTokenBalance: PropTypes.func,
	secondRow: PropTypes.bool,
	setPopUpBool: PropTypes.func,
	setTradingFor: PropTypes.func,
};
