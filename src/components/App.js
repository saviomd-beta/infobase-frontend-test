import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import ContactForm from './ContactForm';
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
	createContact = contact => {
		const lastContact = this.state.contactList[this.state.contactList.length - 1];
		contact.id = lastContact.id + 1;
		this.setState(prevState => ({
			contactList: [
				...prevState.contactList,
				contact
			]
		}), function () {
			this.props.history.push('/');
		});
	}
	updateContact = contact => {
		let contactList = [...this.state.contactList];
		const index = contactList.findIndex((obj) => {
			return obj.id === contact.id;
		});
		contactList[index] = contact;
		this.setState({
			contactList
		}, function () {
			this.props.history.push('/');
		});
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
					<Route path="/create" exact render={() => <ContactForm
						actionFunction={this.createContact}
						actionName="create"
						contact={this.state.contact}
					/>} />
					<Route path="/:contactId" exact render={({ match }) => <ContactForm
						actionFunction={this.updateContact}
						actionName="update"
						contact={this.state.contact}
						contactList={this.state.contactList}
						match={match}
					/>} />
					<Route component={NotFound} />
				</Switch>
				<Footer />
			</div>
		)
	}
}

export default withRouter(App);
