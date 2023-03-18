import React from "react";
import { Nav, NavLink, NavMenu }
	from "./elements";


export default function Navbar() {
	return (
		<Nav>
			<NavMenu>
				<NavLink to="/">
					Home
				</NavLink>
				<NavLink to="/signup">
					Signup
				</NavLink>
				<NavLink to="/login">
					Login
				</NavLink>
			</NavMenu>
		</Nav>
	);
};
