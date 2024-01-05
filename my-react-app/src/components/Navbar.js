import'./Appbar.css'; 
// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
const Navbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo"><AccountBalanceIcon/>Yanku IMS</div>
        <ul className="nav-links">
          <li><Link to="/">Index</Link></li>
          <li><Link to="purchase">Purchase</Link></li>
          <li><Link to="sales">Sales</Link></li>
          <li><Link to="vendors">Vendor</Link> </li>
          <li><Link to="items">Items</Link></li>


          {/* Other navigation items */}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

