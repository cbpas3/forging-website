import React from 'react';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

export const NavBarButton = ({ className, ...props }) => {
	const classes = twMerge(`
        text-white
        border
        bg-indigo-400
        border-indigo-400
        hover:bg-transparent
        hover:text-indigo-400
        rounded-md
        px-8
        py-3
        truncate
        ${className ?? ''}
    `);

	return (
		<button className={classes} onClick={props.onClick}>
			{props.text}
		</button>
	);
};

NavBarButton.propTypes = {
	className: PropTypes.string,
	onClick: PropTypes.func,
	text: PropTypes.string,
};
