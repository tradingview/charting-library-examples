import { logMessage } from './helpers';
export class Requester{

	constructor(headers){
		if (headers) {
			this._headers = headers;
		}
	}

	sendRequest = async (datafeedUrl, urlPath, params) => {
		if (params !== undefined) {
			var paramKeys = Object.keys(params);
			if (paramKeys.length !== 0) {
				urlPath += '?';
			}
			urlPath += paramKeys.map(function (key) {
				return encodeURIComponent(key) + "=" + encodeURIComponent(params[key].toString());
			}).join('&');
		}
		logMessage('New request: ' + urlPath);
		// Send user cookies if the URL is on the same origin as the calling script.
		var options = { credentials: 'same-origin' };
		if (this._headers !== undefined) {
			options.headers = this._headers;
		}
		const response = await fetch(datafeedUrl + "/" + urlPath, options);
		const responseTest = await response.text();
		return JSON.parse(responseTest);
	};
}
