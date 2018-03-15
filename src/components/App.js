import React from 'react';
import { Route, Switch } from 'react-router-dom';

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
			contact: {
				canal: '',
				id: 0,
				nome: '',
				obs: '',
				valor: ''
			},
			contactList: [],
			contactListError: false,
			contactListLoading: false
		}
		this.getContactData = this.getContactData.bind(this);
		this.handleContactFormControlChange = this.handleContactFormControlChange.bind(this);
	}
	getContactData(props) {
		if (this.state.contact.id === 0) {
			const contactId = parseInt(props.match.params.contactId, 10);
			const contact = this.state.contactList.find((obj) => {
				return obj.id === contactId;
			});
			if (typeof contact !== 'undefined') {
				this.setState({
					contact
				});
			}
		}
	}
	handleContactFormControlChange (event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const id = target.id;
		this.setState(prevState => ({
			contact: {
				...prevState.contact,
				[id]: value
			}
		}));
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
						action="create"
						contact={this.state.contact}
						handleContactFormControlChange={this.handleContactFormControlChange}
					/>} />
					<Route path="/:contactId" exact render={({ match }) => <ContactForm
						action="update"
						contact={this.state.contact}
						getContactData={this.getContactData}
						handleContactFormControlChange={this.handleContactFormControlChange}
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
