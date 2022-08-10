import React from 'react';
import PropTypes from 'prop-types';

const DropdownListItem = ({ item }) => {
	return <li className='border-b-2 p-4 border-zinc-300 w-full'>{item}</li>;
};

DropdownListItem.propTypes = {
	item: PropTypes.string,
};
export default DropdownListItem;
