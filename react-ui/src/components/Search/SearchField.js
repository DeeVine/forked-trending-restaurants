import React from 'react';

export const SearchField = (props) =>
	<form>
	<label htmlFor="searchfield">
		Search
	</label>
	<input type="text" name="search"
		onChange={props.handleInputChange}
	>
	</input>
	<button
		onClick={props.handleSubmitButton}
	>
		Go
	</button>
	</form>

