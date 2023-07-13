import React from 'react';
import { Link } from 'react-router-dom';
//import CartaoValido from './cartao_valido';

function Pagamento() {
    return (
        <section>
            <div>
                Pagamento para <strong>Nome do Usuário</strong>
            </div>
            <div>
                <input type='number' placeholder='R$ 0,00'/>
                <select>
                    <option>Cartão com final 01234</option>
                    <option>Cartão com final 01111</option>
                </select>
                <Link to="/pagamento/cartao_valido">
                    <button type='button'>Pagar</button>
                </Link>
            </div>
        </section> 
    ) 
}

export default Pagamento;
/*
function PagePagamento() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/pagamento' element={<Pagamento />} />
                <Route path='/pagamento/cartao_valido' element={<CartaoValido />} />
            </Routes>
        </BrowserRouter>
    )
}

export default PagePagamento;*/