import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ContactList from './ContactList';
import Footer from './Footer';
import Header from './Header';
import NotFound from './NotFound';

import '../css/bootstrap.min.css'

class App extends React.Component {
	render () {
		return (
			<div className="container-fluid">
				<Header />
				<Switch>
					<Route path="/" exact render={() => <ContactList contactList={this.state.contactList} contactListError={this.state.contactListError} contactListLoading={this.state.contactListLoading} />} />
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</div>
		)
	}
}

export default App;
