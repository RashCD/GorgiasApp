// import axios from 'axios';
// import fetch from 'isomorphic-fetch';
// require('es6-promise').polyfill();
import fetch from 'cross-fetch';

import * as ActionTypes from './types';

export const callWebservice = (apiEndpoint, apiObjectBody) => dispatch => {
	// dispatch(serviceActionPending());
	dispatch(serviceActionPending());
	fetch(apiEndpoint, apiObjectBody)
		.then(res => res.json())
		.then(response => checkEndOfData(response, dispatch))
		.catch(error => dispatch(serviceActionError(error)))
		.done();
};

export const mutateData = (originalData, singleRowItem) => dispatch => {
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

const checkEndOfData = (data, dispatch) => {
	const checkData = data.Result.Count;
	if (checkData === 0) {
		return dispatch(endList());
	}
	return dispatch(serviceActionSuccess(data));
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

const dataMutation = data => ({
	type: ActionTypes.MUTATE_DATA,
	payload: data
});

const endList = () => ({
	type: ActionTypes.END_LIST,
	payload: null
});
