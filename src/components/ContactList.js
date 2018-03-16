import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import ContactTable from './ContactTable';
import Pagination from './Pagination';

const propTypes = {
	contactList: PropTypes.arrayOf(PropTypes.object).isRequired,
	contactListError: PropTypes.bool.isRequired,
	contactListLoading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			page: PropTypes.string,
			size: PropTypes.string
		})
	})
}

class ContactList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			page: parseInt(props.match.params.page, 10) || 1,
			size: parseInt(props.match.params.size, 10) || 10
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params !== prevProps.match.params) {
			this.setState({
				page: parseInt(this.props.match.params.page, 10) || 1,
				size: parseInt(this.props.match.params.size, 10) || 10
			});
		}
	}
	render () {
		const begin = (this.state.page - 1) * this.state.size;
		const end = begin + this.state.size;
		const contactListToRender = this.props.contactList.slice(begin, end);
		let htmlContactCount = '';
		let htmlContactList = '';
		let htmlPagination = '';
		if (contactListToRender.length) {
			htmlContactCount = <span className="ml-1 small">({this.props.contactList.length})</span>;
			htmlPagination = <Pagination currentPage={this.state.page} listLength={this.props.contactList.length} pathBase="" size={this.state.size} />;
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
				{htmlPagination}
			</div>
		)
	}
}

ContactList.propTypes = propTypes;

export default ContactList;
