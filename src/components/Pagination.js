import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const propTypes = {
	currentPage: PropTypes.number.isRequired,
	listLength: PropTypes.number.isRequired,
	pathBase: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired
}

class Pagination extends React.Component {
	render () {
		const pages = Math.ceil(this.props.listLength / this.props.size) + 1;
		let htmlPagination = [];
		for (let i = 1; i < pages; i++) {
			const className = `page-item ${this.props.currentPage === i ? 'active' : ''}`
			const path = `${this.props.pathBase}${i > 1 ? `/${i}/${this.props.size}` : ''}`;
			htmlPagination.push(
				<li className={className} key={i}>
					{this.props.currentPage === i ? (
						<span className="page-link">{i}</span>
					) : (
						<Link className="page-link" to={path}>{i}</Link>
					)}
				</li>
			);
		}
		return (
			<ul className="justify-content-center pagination pagination-sm">
				{htmlPagination}
			</ul>
		)
	}
}

Pagination.propTypes = propTypes;

export default Pagination;
