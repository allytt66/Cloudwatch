import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App';


const container = document.getElementById('container')!;
const root = ReactDOM.createRoot(container); 

root.render(<App />);
