import "../styles/bankCardForm.css";

function BankCardForm() {
  return (
    <>
      <h3 className="infocard-title">Información Tarjeta</h3>
      <h4 className="subtitles">Nombre Titular</h4>
      <input type="text" placeholder="Carlos Brenes Barrantes" className="inputs"/>
      <h4 className="subtitles">Número de Tarjeta</h4>
      <input type="text" placeholder="5512456324315432" className="inputs"/>
      <h4 className="subtitles">Fecha de Expiración</h4>
      <div className="container-cardinfo">
        <input type="text" placeholder="MM/AA" className="inputs-card"/>
        <input type="text" placeholder="CVC" className="inputs-card"/>
      </div>
    </>
  );
}

export default BankCardForm;
