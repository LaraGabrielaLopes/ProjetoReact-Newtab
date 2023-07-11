import React from 'react';
import ReactDOM from 'react-dom/client';
import './index';
import Transacao from './pages/App';
import reportWebVitals from './testes/reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Transacao />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
