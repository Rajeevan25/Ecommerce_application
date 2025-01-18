
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import Cart from './pages/Cart';

function App() {
  const [cartItem,setCartItem] = useState([]);
  return (
    <div className="App">
            <Router>
              <div>
                <ToastContainer theme='dark'/>
                <Header cartItem={cartItem}/>
                <Routes>
                  <Route path='/' element={<Home/>}/> 
                  <Route path='/search' element={<Home/>}/> 
                  <Route path='/product/:id' element={<ProductDetail cartItem={cartItem} setCartItem={setCartItem}/>}/> 
                  <Route path='/cart' element={<Cart cartItem={cartItem} setCartItem={setCartItem}/>}/> 
                </Routes>
                <Footer/>
              </div>
            </Router>
    </div>
  );
}

export default App;
