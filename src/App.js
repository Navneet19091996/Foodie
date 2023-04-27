// import logo from './logo.svg';
import './App.css';
// import Footer from './components/Footer';
// import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './screens/Home';
// eslint-disable-next-line
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';

import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrders from './screens/MyOrders';


function App() {
  return (
    <CartProvider>
  <Router>
   <div>
      
    <Routes>
        <Route exact path = '/' element = {<Home/>}></Route>
        <Route exact path = '/login' element = {<Login/>}></Route>
        <Route exact path = '/createUser' element = {<Signup/>}></Route>
        <Route exact path = '/myOrders' element = {<MyOrders />}></Route>
    </Routes>
      
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
