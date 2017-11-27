import * as ActionsTypes from '../actions/types';

const INITIAL_STATE = {
	isLoading: false,
	data: {},
	error: undefined
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ActionsTypes.SERVICE_PENDING:
			return { ...state, isLoading: true };

		case ActionsTypes.SERVICE_SUCCESS:
			return { ...state, isLoading: false, data: [...state.data, ...action.payload] };

		case ActionsTypes.SERVICE_ERROR:
			return { ...state, isLoading: false, error: action.payload };

		case ActionsTypes.MUTATE_DATA:
			return { ...state, isLoading: false, data: action.payload };

		default:
			return { ...state };
	}
};
