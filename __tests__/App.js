import 'react-native';
// import React from 'react';
// import App from '../App';
import fetch from 'isomorphic-fetch';

import { callWebservice } from '../src/actions/apiActions';

// Note: test renderer must be required after react-native.
// import renderer from 'react-test-renderer';

const url = 'https://gorgiasapp-v2.azurewebsites.net/api/mobile/v2/albums/filter/';

const body = {
	CategoryID: 5,
	CategoryTypeID: 1,
	ProfileID: 1081,
	Page: 1,
	Size: 5,
	Languages: ['en'],
	isMicroApp: false,
	MicroAppProfileID: null
};

test('promise based api fetching', () => {
	fetch(url, body).then(res => {
		expect(res).toBeDefined();
	});
});
