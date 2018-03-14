import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const propTypes = {
	contactList: PropTypes.arrayOf(PropTypes.object).isRequired,
	contactListError: PropTypes.bool.isRequired,
	contactListLoading: PropTypes.bool.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			contactId: PropTypes.string
		})
	})
}

class ContactDetails extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			canal: '',
			id: '',
			nome: '',
			obs: '',
			valor: ''
		}
	}
	render () {
		return (
			<div>
				<h1 className="h3">Contact details</h1>
				<div className="text-right">
					<ul className="list-inline">
						<li className="list-inline-item">
							<Link className="btn btn-outline-secondary" to="/">Cancelar</Link>
						</li>
						<li className="list-inline-item">
							<button className="btn btn-outline-danger">Excluir</button>
						</li>
						<li className="list-inline-item">
							<button className="btn btn-primary">Atualizar</button>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

ContactDetails.propTypes = propTypes;

export default ContactDetails;
