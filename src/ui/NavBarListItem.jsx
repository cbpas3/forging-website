import React from 'react';

export const NavBarListItem = ({ item }) => {
	return (
		<>
			<li className='p-4'>{item}</li>
		</>
	);
};

NavBarListItem.propTypes = {
	item: PropTypes.string,
};
