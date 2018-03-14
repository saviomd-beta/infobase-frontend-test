import PropTypes from 'prop-types';
import React from 'react';

import ContactTable from './ContactTable';

const propTypes = {
	contactList: PropTypes.arrayOf(PropTypes.object).isRequired,
	contactListError: PropTypes.bool.isRequired,
	contactListLoading: PropTypes.bool.isRequired
}

class ContactList extends React.Component {
	render () {
		const contactListToRender = this.props.contactList;
		let html = '';
		if (this.props.contactListLoading) {
			html = <div className="text-center">Carregando...</div>;
		} else if (this.props.contactListError) {
			html = <div className="text-center">Erro :(</div>;
		} else if (contactListToRender.length) {
			html = <ContactTable contactList={contactListToRender} />;
		} else {
			html = <div className="text-center">Nenhum contato para exibição</div>;
		}
		return (
			<div>
				<h1 className="h3">Contatos</h1>
				{html}
			</div>
		)
	}
}

ContactList.propTypes = propTypes;

export default ContactList;
