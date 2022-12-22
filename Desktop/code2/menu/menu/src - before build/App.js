import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route
} from "react-router-dom";

import Index from "./pages/index";
import Main from "./pages/main";
import Callback from "./auth/callback";
import Error from "./pages/404";

import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/styles.css'

const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Index />} />
				<Route path="main" element={<Main />} />
				<Route path="Callback" element={<Callback />} />
				{/* <Route path="*" element={<Error />} /> */}
			</Routes>
		</Router>
	);
}

export default App;
