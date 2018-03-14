import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ContactCreate from './ContactCreate';
import ContactDetails from './ContactDetails';
import ContactList from './ContactList';
import Footer from './Footer';
import Header from './Header';
import NotFound from './NotFound';

import '../css/bootstrap.min.css'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			contactList: [],
			contactListError: false,
			contactListLoading: false
		}
	}
	componentDidMount () {
		this.setState({
			contactListLoading: true
		});
		fetch('/data/MOCK_DATA.json').then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		}).then((json) => {
			this.setState({
				contactList: json,
				contactListError: false,
				contactListLoading: false
			});
		}).catch((error) => {
			this.setState({
				contactListError: true,
				contactListLoading: false
			});
			console.log(error.message);
		});
	}
	render () {
		return (
			<div className="container-fluid">
				<Header />
				<Switch>
					<Route path="/" exact render={() => <ContactList
						contactList={this.state.contactList}
						contactListError={this.state.contactListError}
						contactListLoading={this.state.contactListLoading}
					/>} />
					<Route path="/create" exact render={() => <ContactCreate
						contactListSize={this.state.contactList.length}
						contactListError={this.state.contactListError}
						contactListLoading={this.state.contactListLoading}
					/>} />
					<Route path="/:contactId" exact render={({ match }) => <ContactDetails
						contactList={this.state.contactList}
						contactListError={this.state.contactListError}
						contactListLoading={this.state.contactListLoading}
						match={match}
					/>} />
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</div>
		)
	}
}

export default App;
