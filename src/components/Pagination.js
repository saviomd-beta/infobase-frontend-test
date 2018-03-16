import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const propTypes = {
	listLength: PropTypes.number.isRequired,
	pathBase: PropTypes.string.isRequired,
	size: PropTypes.number.isRequired
}

class Pagination extends React.Component {
	render () {
		const pages = Math.ceil(this.props.listLength / this.props.size) + 1;
		let htmlPagination = [];
		for (let i = 1; i < pages; i++) {
			const path = `${this.props.pathBase}${i > 1 ? `/${i}/${this.props.size}` : ''}`;
			htmlPagination.push(
				<li className="page-item" key={i}>
					<Link className="page-link" to={path}>{i}</Link>
				</li>
			);
		}
		return (
			<ul className="justify-content-center pagination">
				{htmlPagination}
			</ul>
		)
	}
}

Pagination.propTypes = propTypes;

export default Pagination;
