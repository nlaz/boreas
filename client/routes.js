import React from 'react';
import { IndexRoute, Route } from 'react-router';

import LandingPage from './components/pages/LandingPage';

import App from './components/AppContainer';
import ReqAuth from './components/ReqAuth';
import ItemsContainer from './components/ItemsContainer';
import ItemContainer from './components/ItemContainer';
import NewItemContainer from './components/NewItemContainer';
import LoginContainer from './components/LoginContainer';
import LogoutContainer from './components/LogoutContainer';
import Sessions from './components/Sessions';
import Signup from './components/Signup';

const routes = (
	<Route path='/' component={App}>
		<IndexRoute component={LandingPage} />
		<Route path='items' component={ItemsContainer} />
		<Route path='item/new' component={NewItemContainer} />
		<Route path='item/view/:itemId' component={ItemContainer} />
		<Route path='login' component={ReqAuth(LoginContainer)} />
		<Route path='signup' component={ReqAuth(Signup)} />
		<Route path='logout' component={LogoutContainer} />
		<Route path='sessions' component={Sessions} />
	</Route>
);

export default routes;
