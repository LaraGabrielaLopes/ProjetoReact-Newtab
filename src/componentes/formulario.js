import React from 'react';
import face from '../assets/face.svg';
import { Link } from 'react-router-dom';

function CamposForm() {
    return(
        <div>
            <img src={face} alt='face padrão'/>
            <section>
                <label>Nome do Usuário X</label><br />
                <label>ID: X - Username: @usuarioX</label>
            </section>
            <Link to='/pagamento'>
            <button type='button'>Pagar</button>
            </Link>          
      </div>
    )
};

export default CamposForm;