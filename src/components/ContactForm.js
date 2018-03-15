import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const propTypes = {
	action: PropTypes.string.isRequired,
	contact: PropTypes.shape({
		canal: PropTypes.string,
		nome: PropTypes.string,
		obs: PropTypes.string,
		valor: PropTypes.string
	}),
	getContactData: PropTypes.func,
	handleContactFormControlChange: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			contactId: PropTypes.string
		})
	})
}

class ContactForm extends React.Component {
	componentWillReceiveProps(nextProps) {
		if (this.props.action === 'update') {
			this.props.getContactData(nextProps);
		}
	}
	componentDidMount() {
		if (this.props.action === 'update') {
			this.props.getContactData(this.props);
		}
	}
	render () {
		let formTitle = '';
		let htmlFormButtons = '';
		if (this.props.action === 'create') {
			formTitle = 'Create contact';
			htmlFormButtons = (
				<li className="list-inline-item">
					<button className="btn btn-primary" type="submit">Criar</button>
				</li>
			);
		} else if (this.props.action === 'update') {
			formTitle = 'Contact details';
			htmlFormButtons = (
				<React.Fragment>
					<li className="list-inline-item">
						<button className="btn btn-outline-danger">Excluir</button>
					</li>
					<li className="list-inline-item">
						<button className="btn btn-primary" type="submit">Atualizar</button>
					</li>
				</React.Fragment>
			);
		}
		return (
			<form className="row justify-content-center">
				<div className="col-12 col-sm-8 col-md-6">
					<h1 className="h3">{formTitle}</h1>
					<div className="form-group">
						<label htmlFor="nome">Nome</label>
						<input className="form-control" id="nome" value={this.props.contact.nome} type="text" onChange={this.props.handleContactFormControlChange} />
					</div>
					<div className="row">
						<div className="form-group col-auto">
							<label htmlFor="canal">Canal</label>
							<select className="form-control" id="canal" value={this.props.contact.canal} onChange={this.props.handleContactFormControlChange}>
								<option value="">Selecione...</option>
								<option value="email">Email</option>
								<option value="celular">Tel. celular</option>
								<option value="fixo">Tel. fixo</option>
							</select>
						</div>
						<div className="form-group col">
							<label htmlFor="valor">Valor</label>
							<input className="form-control" id="valor" value={this.props.contact.valor} type="text" onChange={this.props.handleContactFormControlChange} />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="obs">Observação</label>
						<textarea className="form-control" id="obs" value={this.props.contact.obs || ''} onChange={this.props.handleContactFormControlChange}></textarea>
					</div>
					<div className="text-right">
						<ul className="list-inline">
							<li className="list-inline-item">
								<Link className="btn btn-outline-secondary" to="/">Cancelar</Link>
							</li>
							{htmlFormButtons}
						</ul>
					</div>
				</div>
			</form>
		)
	}
}

ContactForm.propTypes = propTypes;

export default ContactForm;
