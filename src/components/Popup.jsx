import React from 'react';
import PropTypes from 'prop-types';
import { XCircleIcon } from '@heroicons/react/outline';
export const Popup = (props) => {
	return props.trigger ? (
		<div className='fixed top-0 left-0 z-40 bg-black/25 h-screen w-screen flex justify-center items-center'>
			<div className='relative p-8 w-[400px] h-[200px] rounded-lg shadow-md bg-white flex justify-center items-center'>
				<button
					onClick={() => {
						props.setButtonPopup(false);
					}}
					className='absolute top-4 left-4 '
				>
					<XCircleIcon className='w-5' />
				</button>
				{props.children}
			</div>
		</div>
	) : (
		''
	);
};

Popup.propTypes = {
	name: PropTypes.string,
	children: React.Component,
	trigger: PropTypes.bool,
	setButtonPopup: PropTypes.func,
};
