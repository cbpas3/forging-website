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
				<div className='p-5'>
					<p
						className='
                    mb-2 md:text-2xl text-lg font-bold 
                    tracking-tight text-gray-800'
					>{`${name}`}</p>
					<p className='w-full text-gray-800'>{`Owned: ${tokenBalance[name]}`}</p>
					<div className='w-full flex mt-4 space-x-3 lg:mt-6'>
						<button
							className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-indigo-400 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300'
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
					</div>
				</div>
			</div>
			{hoveredOn['Green'] ? (
				<div className='absolute top-0 -left-1 h-[340px] blur w-[190px] bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 z-10' />
			) : (
				''
			)}
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
};
