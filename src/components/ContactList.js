import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import ContactTable from './ContactTable';

const propTypes = {
	contactList: PropTypes.arrayOf(PropTypes.object).isRequired,
	contactListError: PropTypes.bool.isRequired,
	contactListLoading: PropTypes.bool.isRequired
}

class ContactList extends React.Component {
	render () {
		const contactListToRender = this.props.contactList;
		let htmlContactCount = '';
		let htmlContactList = '';
		if (contactListToRender.length) {
			htmlContactCount = <span className="ml-1 small">({this.props.contactList.length})</span>;
		}
		if (this.props.contactListLoading) {
			htmlContactList = <div className="text-center">Carregando...</div>;
		} else if (this.props.contactListError) {
			htmlContactList = <div className="text-center">Erro :(</div>;
		} else if (contactListToRender.length) {
			htmlContactList = <ContactTable contactList={contactListToRender} />;
		} else {
			htmlContactList = <div className="text-center">Nenhum contato para exibição</div>;
		}
		return (
			<div>
				<div className="row">
					<div className="col">
						<h1 className="h3">
							Contatos
							{htmlContactCount}
						</h1>
					</div>
					<div className="col-auto">
						<Link className="btn btn-primary btn-sm" to="/create">Criar</Link>
					</div>
				</div>
				{htmlContactList}
			</div>
		)
	}
}

ContactList.propTypes = propTypes;

export default ContactList;
