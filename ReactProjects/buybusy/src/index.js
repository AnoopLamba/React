import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticationContext from './AuthenticationContext';
import ProductContext from './ProductContext';

console.log("in index.js");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer autoClose={1000} />
    <AuthenticationContext>
      <ProductContext>
        <App />
      </ProductContext>
    </AuthenticationContext>
  </>
);
