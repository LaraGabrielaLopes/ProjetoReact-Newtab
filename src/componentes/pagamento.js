import React from 'react';

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
                <button type='button'>Pagar</button>
            </div>
        </section> 
    ) 
}

export default Pagamento;