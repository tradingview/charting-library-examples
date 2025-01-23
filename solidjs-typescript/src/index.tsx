import {render} from "solid-js/web";
import classes from './index.module.css';
import App from "./App";

document.body.className = classes.body;

render(() => <App/>, document.getElementById("app")!);
