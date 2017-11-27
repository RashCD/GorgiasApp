// import axios from 'axios';
// import fetch from 'isomorphic-fetch';
// require('es6-promise').polyfill();
import fetch from 'cross-fetch';

import * as ActionTypes from './types';

export const callWebservice = (apiEndpoint, apiObjectBody) => dispatch => {
	// dispatch(serviceActionPending());
	dispatch(
		serviceActionPending(),
		fetch(apiEndpoint, apiObjectBody)
			.then(res => res.text())
			.then(text => JSON.parse(text))
			.then(response => dispatch(serviceActionSuccess(response)))
			.catch(error => dispatch(serviceActionError(error)))
	);
};

const serviceActionPending = () => ({
	type: ActionTypes.SERVICE_PENDING,
	payload: null
});

const serviceActionError = error => ({
	type: ActionTypes.SERVICE_ERROR,
	payload: error
});

const serviceActionSuccess = data => ({
	type: ActionTypes.SERVICE_SUCCESS,
	payload: data.Result.Items
});

export const mutateData = (originalData, singleRowItem) => dispatch => {
	dispatch(serviceActionPending());
	const temp = [...originalData];
	temp.forEach((data, index) => {
		if (index === singleRowItem.index) {
			const newElement = data;
			newElement.canRepost = !data.canRepost;
			return newElement;
		}
		return data;
	});
	dispatch(dataMutation(temp));
};

const dataMutation = data => ({
	type: ActionTypes.MUTATE_DATA,
	payload: data
});
