import React, { useState } from "react";
import "../css/PaymentModal.css";
import axios from "axios";

export default function PaymentModal(props) {
  console.log("props.name:", props.name);

    //Definindo estado inicial:
    const [userID, setUserID] = useState("");
    const [paymentValue, setPaymentValue] = useState("R$ 0,00");
    const [cardInfo, setCardInfo] = useState({});
    const [paymentValueFloat, setPaymentValueFloat] = useState(0);

    //Definindo as alterações ao clicar fora do modal e ao resetar:
    const handleOutsideModal = (event) => {
        if (event.target.id === "modal") props.isClosed(false)
    };

    const handleResetModal = () => {
        props.isClosed(false)
        props.setMessage("")
    }

    //Definindo os cartões de pagamento:
    let cards = [
        // cartão válido
        {
          card_number: "1111111111111111",
          cvv: 789,
          expiry_date: "01/18",
        },
        // cartão inválido
        {
          card_number: "4111111111111234",
          cvv: 123,
          expiry_date: "01/20",
        },
      ];

    //Definindo a máscara do input:  
    const currencyMask = (e) => {
        e.preventDefault();

        if((/[0-9]/g).test(e.key) && e.target.value.length < 18) {
          e.target.value += e.key
        }

        var myInput = Number(e.target.value.replace(/[0-9]+/g, ""));
        myInput = myInput / 100;
        var formatInput = myInput.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        })

        e.target.value = formatInput;

        setPaymentValue(formatInput);
        setPaymentValueFloat(myInput * 100);
        setUserID(props.selectedUser.id);
    };
        /* const inputValue = e.target.value.replace(/[^\d.]/g, "")

        var myInput = parseFloat(inputValue);

        if(!isNaN(myInput)) {
          var formatInput = (myInput / 100).toLocaleString("pt-BR", {
            style:"currency",
            currency:"BRL",
            minimumFractionDigits: 2,
        });

        e.target.value = formatInput;

        setPaymentValue(formatInput);
        setPaymentValueFloat(myInput * 100);
        setUserID(props.selectedUser.id);
        } else {
          setPaymentValueFloat("")
        }
    }; */

    const POSTObject = {
        userID,
        paymentValueFloat,
        cardInfo,
      };
      
      const submitHandler = (e) => {
        e.preventDefault();
      
        axios
          .post(
            "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989",
            POSTObject
          )
          .then((response) => {
            console.log(response);
            if (response.data.status === "Aprovada") {
              props.setMessage("O pagamento foi concluído com sucesso!");
            } else if (response.data.status !== "Aprovada") {
              props.setMessage("O pagamento NÃO foi concluído com sucesso");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
    return(
        <div className="ModalBackground" id="modal" onClick={handleOutsideModal}>
            {props.message === "" ? (
            <div className="ModalContainer">
                <div className="HeaderDiv">
                    <header className="PaymentHeader">
                    Pagamento para {props.name}
                    </header>
                    <button
                    className="CloseButton"
                    onClick={() => props.isClosed(false)}
                    >
                    &times;
                    </button>
                </div>
                <form className="PaymentForm" onSubmit={submitHandler}>
                    <input
                    className="PaymentInput"
                    value={paymentValue}
                    name="paymentValue"
                    onChange={currencyMask}
                    />
                    <select
                    className="PaymentSelect"
                    name="cardInfo"
                    defaultValue={"default"}
                    onChange={(e) => {
                        setCardInfo(e.target.value);
                    }}
                    >
                        <option value={"default"} disabled>
                        Escolha um cartão para o pagamento
                        </option>
                    {cards.map((card) => (
                        <option key={card.card_number} value={JSON.stringify(card)}>
                        Cartão com final {card.card_number.slice(-4)}
                        </option>
                    ))}
                    </select>
                    <div className="ButtonDiv">
                    <button type="submit">Pagar</button>
                    </div>
                </form>
            </div>
      ) : (
        <div className="ModalContainer">
            <div className="HeaderDiv">
                <header className="PaymentHeader">
                Recibo de Pagamento
                </header>
                <button
                className="CloseButton"
                onClick={handleResetModal}
                >
                &times;
                </button>
            </div>
            <p>{props.message}</p>
        </div>
      )}
      ;
    </div>
  );
}