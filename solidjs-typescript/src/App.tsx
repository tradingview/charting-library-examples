import classes from './App.module.css';
import {TVChartContainer} from './components/TVChartContainer';
import {version} from './charting_library';

const App = () => {
    return (
        <div class={classes.App}>
            <header class={classes.AppHeader}>
                <h1 class={classes.AppTitle}>
                    TradingView Charting Library and Solid Integration Example {version()}
                </h1>
            </header>
            <TVChartContainer/>
        </div>
    );
};

export default App;
