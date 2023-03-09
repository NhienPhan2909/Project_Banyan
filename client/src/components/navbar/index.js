import React from "react";
import { Nav, NavLink, NavMenu }
	from "./elements";
import Buffer from "buffer";


function checkJwtToken() {
	// Get the JWT token from local storage
	const token = localStorage.getItem('jwtToken');
  
	if (!token) {
	  // Token not found in local storage
	  return false;
	}
  
	// Decode the JWT token
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const decodedToken = JSON.parse(Buffer.Buffer.from(base64, 'base64').toString());
	const expTime = decodedToken.exp * 1000; // convert to ms
  
	// Check if the token is expired, return true if not
	return Date.now() < (expTime) 
  }
  

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		{checkJwtToken() ? 
			(
			<>
				<NavLink to="/dashboard" activeStyle>
					Dashboard
				</NavLink>
				<NavLink to="/prompt" activeStyle>
					Prompt
				</NavLink>
				<NavLink to="/tree" activeStyle>
					Tree
				</NavLink> 
			</>
			):(
			<>
				<NavLink to="/signup" activeStyle>
					Signup
				</NavLink>
				<NavLink to="/login" activeStyle>
					Login
				</NavLink>
			</>
			)
		}
		{/* <NavLink to="/dashboard" activeStyle>
			Dashboard
		</NavLink>
		<NavLink to="/prompt" activeStyle>
			Prompt
		</NavLink>
		<NavLink to="/tree" activeStyle>
			Tree
		</NavLink> */}
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
