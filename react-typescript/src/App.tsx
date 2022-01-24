import * as React from 'react';
import './App.css';
import { TVChartContainer } from './components/TVChartContainer/index';
import { version } from './charting_library';

class App extends React.Component {
	render() {
		return (
			<div className={ 'App' }>
				<header className={ 'App-header' }>
					<h1 className={ 'App-title' }>
						TradingView Charting Library and React Integration Example { version() }
					</h1>
				</header>
				<TVChartContainer />
			</div>
		);
	}
}

export default App;
