import React, { useState } from 'react';
import { Mintpage } from './components/Mintpage';
import Navbar from './components/Navbar';
/**
 * Returns main staking application
 * @return {React.ReactElement}
 */
function App() {
	const [loading, setLoading] = useState(false);
	const [address, setAddress] = useState('');
	const [balance, setBalance] = useState(0.0);
	const [provider, setProvider] = useState(null);
	const [buttonChoices, setButtonChoices] = useState([]);
	const [popUpBool, setPopUpBool] = useState(false);
	// const [loading, setLoading] = useState(false);
	const [tokenBalance, setTokenBalance] = useState({
		Red: 0,
		Black: 0,
		Blue: 0,
		Brown: 0,
		Green: 0,
		Orange: 0,
		Pink: 0,
	});

	return (
		<div className='App'>
			{loading ? '' : ''}
			<Navbar
				setLoading={setLoading}
				loading={loading}
				address={address}
				setAddress={setAddress}
				balance={balance}
				setBalance={setBalance}
				provider={provider}
				setProvider={setProvider}
				tokenBalance={tokenBalance}
				setTokenBalance={setTokenBalance}
				setButtonChoices={setButtonChoices}
			/>
			<div className='flex justify-center overflow-auto h-screen w-full'>
				{window.ethereum ? (
					<Mintpage
						setLoading={setLoading}
						loading={loading}
						address={address}
						setAddress={setAddress}
						balance={balance}
						setBalance={setBalance}
						provider={provider}
						setProvider={setProvider}
						tokenBalance={tokenBalance}
						setTokenBalance={setTokenBalance}
						buttonChoices={buttonChoices}
						popUpBool={popUpBool}
						setPopUpBool={setPopUpBool}
					/>
				) : (
					'Install metamask'
				)}
			</div>
		</div>
	);
}

export default App;
