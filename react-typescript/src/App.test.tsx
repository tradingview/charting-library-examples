import * as React from 'react';
import App from './App';
import { TVChartContainer } from './components/TVChartContainer';

test('basic', () => {
	expect(<App />).toBeDefined();
	expect(<TVChartContainer />).toBeDefined();
});
