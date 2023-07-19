import React from 'react';
import { Link } from 'react-router-dom';


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
                    <button type='button'>Pagar Válido</button>
                </Link>

                <Link to="/pagamento/cartao_invalido">
                    <button type='button'>Pagar Inválido</button>
                </Link>
            </div>
        </section> 
    ) 
}

export default Pagamento;