import React, { useState } from 'react';
import { Card } from './Card';
import { connectToMetamask, forge, smelt } from '../utils/Ethers';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
/**
 * Returns mint page component
 * @return {React.ReactElement}
 */
export const Mintpage = ({
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
	const tokens = ['Red', 'Black', 'Blue', 'Brown', 'Green', 'Orange', 'Pink'];
	const [hoveredOn, setHoveredOn] = useState({
		Brown: false,
		Green: false,
		Orange: false,
		Pink: false,
	});

	return (
		<div className='w-screen p-10 pt-20 flex justify-center items-center bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'>
			{address == '' ? (
				<button
					className='bg-gray-200'
					onClick={async () => {
						const userData = await connectToMetamask();
						setAddress(userData.address);
						setBalance(userData.balancePolygon);
						setProvider(userData.provider);
						setTokenBalance(userData.balanceTokens);
						console.log('Provider');
						console.log(userData);
					}}
				>
					{' '}
					Connect Wallet
				</button>
			) : (
				<div className='grid grid-rows-2 gap-10 my-auto'>
					<div className='flex items-center justify-center gap-10'>
						{tokens.map((name, index) => {
							if (index < 3) {
								return (
									<Card
										key={index}
										text={'Mint'}
										name={name}
										hoveredOn={hoveredOn}
										setHoveredOn={setHoveredOn}
										onForge={forge}
										provider={provider}
										onSmelt={smelt}
										tokenBalance={tokenBalance}
										setTokenBalance={setTokenBalance}
									/>
								);
							}
						})}
					</div>
					<div className='flex items-center justify-center gap-10'>
						{tokens.map((name, index) => {
							if (index >= 3) {
								return (
									<Card
										key={index}
										text={'Forge'}
										name={name}
										provider={provider}
										hoveredOn={hoveredOn}
										setHoveredOn={setHoveredOn}
										onForge={forge}
										onSmelt={smelt}
										tokenBalance={tokenBalance}
										setTokenBalance={setTokenBalance}
									/>
								);
							}
						})}
					</div>
					{/* <SteppedLineTo fromAnchor='bottom center' toAnchor='top center' orientation='v' delay={0} from="Blue" to="Violet" className={`${hoveredOn['Violet'] ? STYLE_ON_HOVER : style1}`} />
                    <SteppedLineTo fromAnchor='bottom center' toAnchor='top center' orientation='v' delay={0} from="Red" to="Violet" className={`${hoveredOn['Violet'] ? STYLE_ON_HOVER : style1}`} />
                    <SteppedLineTo fromAnchor='bottom center' toAnchor='top center' orientation='v' delay={0} from="Green" to="Teal" className={`${hoveredOn['Teal'] ? STYLE_ON_HOVER : style1}`} />
                    <SteppedLineTo fromAnchor='bottom center' toAnchor='top center' orientation='v' delay={0} from="Blue" to="Teal" className={`${hoveredOn['Teal'] ? STYLE_ON_HOVER : style1}`} />
                    <SteppedLineTo fromAnchor='bottom center' toAnchor='top center' orientation='v' delay={0} from="Red" to="Brown" className={`${hoveredOn['Brown'] ? STYLE_ON_HOVER : style1}`} />
                    <SteppedLineTo fromAnchor='bottom center' toAnchor='top center' orientation='v' delay={0} from="Green" to="Brown" className={`${hoveredOn['Brown'] ? STYLE_ON_HOVER : style1}`} />
                    <SteppedLineTo fromAnchor='bottom center' toAnchor='top center' orientation='v' delay={0} from="Blue" to="Purple" className={`${hoveredOn['Purple'] ? STYLE_ON_HOVER : style1}`} />
                    <SteppedLineTo fromAnchor='bottom center' toAnchor='top center' orientation='v' delay={0} from="Red" to="Purple" className={`${hoveredOn['Purple'] ? STYLE_ON_HOVER : style1}`} />
                    <SteppedLineTo fromAnchor='bottom center' toAnchor='top center' orientation='v' delay={0} from="Green" to="Purple" className={`${hoveredOn['Purple'] ? STYLE_ON_HOVER : style1}`} /> */}
				</div>
			)}
		</div>
	);
};

Mintpage.propTypes = {
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
