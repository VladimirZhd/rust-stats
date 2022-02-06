import React from 'react';

const Search = ({ handleSubmit, handleChange, steamId, error, loading }) => {
	return (
		<form className='form_search' onSubmit={handleSubmit}>
			<input
				type='text'
				name='steamId'
				value={steamId}
				onChange={handleChange}
				placeholder='Enter SteamID'
			/>
			<button className='btn'>{loading ? 'Searching' : 'Search'}</button>
		</form>
	);
};

export default Search;
