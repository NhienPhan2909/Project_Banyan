import React from "react";
import { Nav, NavLink, NavMenu }
	from "./elements";

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		<NavLink to="/signup" activeStyle>
			Signup
		</NavLink>
		<NavLink to="/login" activeStyle>
			Login
		</NavLink>
		<NavLink to="/dashboard" activeStyle>
			Dashboard
		</NavLink>
		<NavLink to="/prompt" activeStyle>
			Prompt
		</NavLink>
		<NavLink to="/tree" activeStyle>
			Tree
		</NavLink>
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
