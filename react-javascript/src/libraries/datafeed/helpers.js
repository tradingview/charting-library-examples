/**
 * If you want to enable logs from datafeed set it to `true`
 */
let isLoggingEnabled = false;

export const logMessage = (message) => {
	if (isLoggingEnabled) {
		let oCurDate = new Date();
		console.log(oCurDate.toLocaleTimeString() + "." + oCurDate.getMilliseconds() + "> " + message);
	}
};

export const getErrorMessage = (error) => {
	if (error === undefined) {
		return '';
	}
	else if (typeof error === 'string') {
		return error;
	}
	return error.message;
};
