import React, { useState } from "react";
import "../css/PaymentModal.css";
import axios from "axios";

export default function PaymentModal(props) {

    //Definindo estado inicial:
    const [userID, setUserID] = useState("");
    const [paymentValue, setPaymentValue] = useState("R$ 0,00");
    const [cardInfo, setCardInfo] = useState({});
    const [paymentValueFloat, setPaymentValueFloat] = useState(0);

    //Definindo as alterações ao clicar fora do modal:
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
    const moneyMaskTestFilter = (e) => {
      console.log(e.key)
      if('0123456789'.indexOf(e.key) === -1 && e.key !== 'Backspace') {
        e.preventDefault()
        return
      }
    }

    const moneyMaskFormatValue = (e) => {
      let aux_value = e.target.value.replaceAll('R$', '').replaceAll('.','').replaceAll(',','');
      
      if(e.target.value) {

        aux_value = '000' + aux_value
        aux_value = aux_value.replace(/([0-9]{2})$/, '.$1')

        e.target.value = parseFloat(aux_value).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 3,
        })
      }

      setPaymentValue(aux_value);
      setPaymentValueFloat(parseFloat(aux_value));;
      setUserID(props.selectedUser.id);
    }
    /* const currencyMask = (e) => {
        e.preventDefault();

        if((/[0-9]/g).test(e.key) && e.target.value.length < 18) {
          e.target.value += e.key
        }

        console.log(e.target.value)

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
    };  */

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
            } else {
              props.setMessage("O pagamento não foi concluído com sucesso");
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
                    //onChange={currencyMask}
                    onKeyDown={moneyMaskTestFilter}
                    onKeyUp={moneyMaskFormatValue}
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