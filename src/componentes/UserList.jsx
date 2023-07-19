import React from 'react';
import "../css/UserList.css";
import { useState, useEffect } from 'react';
import axios from "axios";
import PaymentModal from './PaymentModal';

//Definindo estado inicial:
export default function UserList() {
    const [users, setUsers] = useState([]); 
    const [selectedUser, setSelectedUser] = useState({});
    const [message, setMessage] = useState("");
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    //Definindo as alterações a serem realizadas no estado inicial ao clique no botão:
    function handleModal() {
        setShowPaymentModal(true);
        setSelectedUser(users);
    }

    //Definindo o efeito a ser realizado:
    useEffect(() => {
        axios
            .get("https://www.mocky.io/v2/5d531c4f2e0000620081ddce")
            .then((response) => {
                console.log(response)
                setUsers(response.data)
            })

            .catch((error) => {
                console.log('error')
            })
    }, [])

    //Lista de Usuário:
    return(
        <>
        {users.map((user) => {
            return(
                <div className='ListWrapper' key={user.id}>
                    <img className="Face" src={user.img} alt="User's"/>
                    <div className='UserInfo'>
                        <p className='UserInfoName'>{user.name}</p>
                        <p className='UserInfoIdentifier'> ID: {user.id} - Username: {user.username}</p>
                    </div>
                    <button className='PaymentButton' onClick={() => handleModal(user)}>Pagar</button>
                </div>
            );
        })}
        
        {/* Renderiza PaymentModal(com todos os seus props) quando showPaymentModal for verdadeiro */}
        {showPaymentModal && 
            <PaymentModal
                isClosed={setShowPaymentModal}
                name={selectedUser.name}
                setMessage={setMessage}
                selectedUser={selectedUser}
                setUser={setSelectedUser}
                message={message}
            />}
        </>
    )
};