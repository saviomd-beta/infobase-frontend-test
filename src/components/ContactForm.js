import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const propTypes = {
	actionFunction: PropTypes.func.isRequired,
	actionName: PropTypes.string.isRequired,
	contactList: PropTypes.arrayOf(PropTypes.object),
	match: PropTypes.shape({
		params: PropTypes.shape({
			contactId: PropTypes.string
		})
	})
}

class ContactForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			contact: {
				canal: '',
				id: 0,
				nome: '',
				obs: '',
				valor: ''
			}
		}
		this.getContactData = this.getContactData.bind(this);
		this.handleControlChange = this.handleControlChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	getContactData(props) {
		if (this.state.contact.id === 0) {
			const contactId = parseInt(props.match.params.contactId, 10);
			const contact = props.contactList.find((obj) => {
				return obj.id === contactId;
			});
			if (typeof contact !== 'undefined') {
				this.setState({
					contact
				});
			}
		}
	}
	handleControlChange (event) {
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
	handleSubmit (event) {
		event.preventDefault();
		this.props.actionFunction(this.state.contact);
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.actionName === 'update') {
			this.getContactData(nextProps);
		}
	}
	componentDidMount() {
		if (this.props.actionName === 'update') {
			this.getContactData(this.props);
		}
	}
	render () {
		let formTitle = '';
		let htmlFormButtons = '';
		if (this.props.actionName === 'create') {
			formTitle = 'Create contact';
			htmlFormButtons = (
				<li className="list-inline-item">
					<button className="btn btn-primary" type="submit">Criar</button>
				</li>
			);
		} else if (this.props.actionName === 'update') {
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
			<form className="row justify-content-center" onSubmit={(event) => this.handleSubmit(event)}>
				<div className="col-12 col-sm-8 col-md-6">
					<h1 className="h3">{formTitle}</h1>
					<div className="form-group">
						<label htmlFor="nome">Nome</label>
						<input className="form-control" id="nome" required value={this.state.contact.nome} type="text" onChange={this.handleControlChange} />
					</div>
					<div className="row">
						<div className="form-group col-auto">
							<label htmlFor="canal">Canal</label>
							<select className="form-control" id="canal" required value={this.state.contact.canal} onChange={this.handleControlChange}>
								<option value="">Selecione...</option>
								<option value="email">Email</option>
								<option value="celular">Tel. celular</option>
								<option value="fixo">Tel. fixo</option>
							</select>
						</div>
						<div className="form-group col">
							<label htmlFor="valor">Valor</label>
							<input className="form-control" id="valor" required value={this.state.contact.valor} type="text" onChange={this.handleControlChange} />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="obs">Observação</label>
						<textarea className="form-control" id="obs" value={this.state.contact.obs || ''} onChange={this.handleControlChange}></textarea>
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
