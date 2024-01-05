import React from 'react';
import'./index.css'; 
import { Link } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import InventoryIcon from '@mui/icons-material/Inventory';


const Index = () => {
  return (
    <>
    
     <div className="card">
      <Link to="/purchase" className="card-link"> {/* Wrap the entire card in a Link */}
        <div className="card1">
         <LocalShippingIcon/>
          <h2>Purchase</h2>
        </div>
      </Link>

      <Link to="/vendors" className="card-link"> {/* Wrap the entire card in a Link */}
        <div className="card2">
          <ContactPhoneIcon/>
          <h2>Vendor</h2>
        </div>
      </Link>

      <Link to="/sales" className="card-link"> {/* Wrap the entire card in a Link */}
        <div className="card3">
          <ShoppingCartCheckoutIcon/>
          <h2>Sales</h2>
        </div>
      </Link>

      <Link to="/items" className="card-link"> {/* Wrap the entire card in a Link */}
        <div className="card4">
        <InventoryIcon/>
          <h2>Items</h2>
        </div>
      </Link>
    </div>


    </>
  )
}

export default Index;
