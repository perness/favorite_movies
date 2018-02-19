import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import registerServiceWorker from "./registerServiceWorker";
import App from "./components/App";
import reducer from "./reducers/index";

const store = createStore(reducer);
// store.dispatch(logUser("example"));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root"),
);
registerServiceWorker();
