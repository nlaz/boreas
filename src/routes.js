import React from 'react';
import { Router, Route } from 'react-router';

import AppContainer from './components/AppContainer';
import Home from './components/Home';
import LoginContainer from './components/LoginContainer';
import Landing from './components/Landing';
import Sessions from './components/Sessions';
import Signup from './components/Signup';

const Routes = (props) => (
	<Router {...props}>
		<Route component={AppContainer}>
			<Route path='/' component={Landing} />
			<Route path='/home' component={Home} />
			<Route path='/login' component={LoginContainer} />
			<Route path='/signup' component={Signup} />
			<Route path='/sessions' component={Sessions} />
		</Route>
	</Router>
);

export default Routes;
