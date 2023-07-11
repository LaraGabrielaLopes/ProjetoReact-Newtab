import React from 'react';
import '../css/App.css'
import CamposForm from '../componentes/formulario';
import Pagamento from '../componentes/pagamento';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function PagePagamento() {
  return(
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Transacao />}/>
              <Route path="/pagamento" element={<Pagamento />}/>
          </Routes>
      </BrowserRouter>
  )
}

function Transacao() {
  return(
      <form>
        <h1>Lista de Usuários</h1>
        <CamposForm />
        <CamposForm />
        <CamposForm />   
      </form>
  )
}

export default PagePagamento;

