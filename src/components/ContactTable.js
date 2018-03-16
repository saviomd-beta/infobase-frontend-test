import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const propTypes = {
	contactList: PropTypes.arrayOf(PropTypes.object).isRequired
}

class ContactTable extends React.Component {
	render () {
		return (
			<div className="table-responsive">
				<table className="table table-striped">
					<thead>
						<tr>
							<th width="40%">Nome</th>
							<th width="10%">Canal</th>
							<th width="40%">Valor</th>
							<th width="10%"></th>
						</tr>
					</thead>
					<tbody>
						{this.props.contactList.map((contact) =>
							<tr key={contact.id}>
								<td>{contact.nome}</td>
								<td>{contact.canal}</td>
								<td>{contact.valor}</td>
								<td className="text-right">
									<Link className="btn btn-secondary btn-sm" to={`/view/${contact.id}`}>Editar</Link>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		)
	}
}

ContactTable.propTypes = propTypes;

export default ContactTable;
