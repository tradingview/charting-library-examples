import { getErrorMessage, logMessage, } from './helpers';

export class DataPulseProvider{
	constructor(historyProvider, updateFrequency) {
		this._subscribers = {};
		this._requestsPending = 0;
		this._historyProvider = historyProvider;
		setInterval(this._updateData.bind(this), updateFrequency);
	}

	subscribeBars = (symbolInfo, resolution, newDataCallback, listenerGuid) => {
		if (this._subscribers.hasOwnProperty(listenerGuid)) {
			logMessage("DataPulseProvider: already has subscriber with id=" + listenerGuid);
			return;
		}
		this._subscribers[listenerGuid] = {
			lastBarTime: null,
			listener: newDataCallback,
			resolution: resolution,
			symbolInfo: symbolInfo,
		};
		logMessage("DataPulseProvider: subscribed for #" + listenerGuid + " - {" + symbolInfo.name + ", " + resolution + "}");
	};

	unsubscribeBars = (listenerGuid) => {
		delete this._subscribers[listenerGuid];
		logMessage("DataPulseProvider: unsubscribed for #" + listenerGuid);
	};

	_updateData = () => {
		if (this._requestsPending > 0) {
			return;
		}
		this._requestsPending = 0;
		let _loop_1 = (listenerGuid) => {
			this_1._requestsPending += 1;
			this_1._updateDataForSubscriber(listenerGuid)
				.then( () => {
					this._requestsPending -= 1;
					logMessage("DataPulseProvider: data for #" + listenerGuid + " updated successfully, pending=" + this._requestsPending);
				})
				.catch( (reason) => {
					this._requestsPending -= 1;
					logMessage("DataPulseProvider: data for #" + listenerGuid + " updated with error=" + getErrorMessage(reason) + ", pending=" + this._requestsPending);
				});
		};
		let this_1 = this;
		for (let listenerGuid in this._subscribers) {
			_loop_1(listenerGuid);
		}
	};
	_updateDataForSubscriber = (listenerGuid) => {
		var subscriptionRecord = this._subscribers[listenerGuid];
		var rangeEndTime = parseInt((Date.now() / 1000).toString());
		// BEWARE: please note we really need 2 bars, not the only last one
		// see the explanation below. `10` is the `large enough` value to work around holidays
		var rangeStartTime = rangeEndTime - periodLengthSeconds(subscriptionRecord.resolution, 10);
		return this._historyProvider.getBars(subscriptionRecord.symbolInfo, subscriptionRecord.resolution, rangeStartTime, rangeEndTime)
			.then((result) => {
				this._onSubscriberDataReceived(listenerGuid, result);
			});
	};

	_onSubscriberDataReceived = (listenerGuid, result) => {
		// means the subscription was cancelled while waiting for data
		if (!this._subscribers.hasOwnProperty(listenerGuid)) {
			logMessage("DataPulseProvider: Data comes for already unsubscribed subscription #" + listenerGuid);
			return;
		}
		var bars = result.bars;
		if (bars.length === 0) {
			return;
		}
		var lastBar = bars[bars.length - 1];
		var subscriptionRecord = this._subscribers[listenerGuid];
		if (subscriptionRecord.lastBarTime !== null && lastBar.time < subscriptionRecord.lastBarTime) {
			return;
		}
		var isNewBar = subscriptionRecord.lastBarTime !== null && lastBar.time > subscriptionRecord.lastBarTime;
		// Pulse updating may miss some trades data (ie, if pulse period = 10 secods and new bar is started 5 seconds later after the last update, the
		// old bar's last 5 seconds trades will be lost). Thus, at fist we should broadcast old bar updates when it's ready.
		if (isNewBar) {
			if (bars.length < 2) {
				throw new Error('Not enough bars in history for proper pulse update. Need at least 2.');
			}
			var previousBar = bars[bars.length - 2];
			subscriptionRecord.listener(previousBar);
		}
		subscriptionRecord.lastBarTime = lastBar.time;
		subscriptionRecord.listener(lastBar);
	};
}

const periodLengthSeconds =(resolution, requiredPeriodsCount) => {
	let daysCount = 0;
	if (resolution === 'D' || resolution === '1D') {
		daysCount = requiredPeriodsCount;
	}
	else if (resolution === 'M' || resolution === '1M') {
		daysCount = 31 * requiredPeriodsCount;
	}
	else if (resolution === 'W' || resolution === '1W') {
		daysCount = 7 * requiredPeriodsCount;
	}
	else {
		daysCount = requiredPeriodsCount * parseInt(resolution) / (24 * 60);
	}
	return daysCount * 24 * 60 * 60;
};
