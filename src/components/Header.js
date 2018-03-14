import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<nav className="navbar navbar-dark bg-dark border border-secondary my-3 rounded">
		<Link className="navbar-brand" to="/">infobase-frontend-test</Link>
	</nav>
)

export default Header;
