import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const propTypes = {
	contactListSize: PropTypes.number,
	contactListError: PropTypes.bool.isRequired,
	contactListLoading: PropTypes.bool.isRequired
}

class ContactCreate extends React.Component {
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
				<h1 className="h3">Create contact</h1>
				<div className="text-right">
					<ul className="list-inline">
						<li className="list-inline-item">
							<Link className="btn btn-outline-secondary" to="/">Cancelar</Link>
						</li>
						<li className="list-inline-item">
							<button className="btn btn-primary">Criar</button>
						</li>
					</ul>
				</div>
			</div>
		)
	}
}

ContactCreate.propTypes = propTypes;

export default ContactCreate;
