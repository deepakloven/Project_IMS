// src/App.js
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import Purchase from './components/Purchase';
import Sales from './components/Sales';
import Vendors from './components/Vendors';






function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="purchase" element={<Purchase />} />
        <Route exact path="sales" element={<Sales />} />
        <Route exact path="vendors" element={<Vendors />} />

      
      </Routes>
    </Router>
  );
}

export default App;
