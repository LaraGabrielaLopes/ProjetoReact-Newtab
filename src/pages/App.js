import React from 'react';
import '../css/App.css'
import CamposForm from '../componentes/formulario';
import Pagamento from '../componentes/pagamento';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import CartaoValido from '../componentes/cartao_valido';
import CartaoInvalido from '../componentes/cartao_invalido';

function App() {
  return(
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Transacao />}/>
              <Route path="/pagamento" element={<Pagamento />}/>
              <Route path="/pagamento/cartao_valido" element={<CartaoValido />} />
              <Route path="/pagamento/cartao_invalido" element={<CartaoInvalido />} />
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

export default App;

