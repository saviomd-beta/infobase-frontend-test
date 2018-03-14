import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const propTypes = {
	contactList: PropTypes.arrayOf(PropTypes.object).isRequired
}

class ContactTable extends React.Component {
	render () {
		return (
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Nome</th>
						<th>Canal</th>
						<th>Valor</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{this.props.contactList.map((contact) =>
						<tr key={contact.id}>
							<td>{contact.nome}</td>
							<td>{contact.canal}</td>
							<td>{contact.valor}</td>
							<td className="text-right">
								<Link className="btn btn-secondary btn-sm" to={`/${contact.id}`}>Editar</Link>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		)
	}
}

ContactTable.propTypes = propTypes;

export default ContactTable;
