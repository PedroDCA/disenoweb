import "../styles/addressForm.css";

function AddressForm() {
  return (
    <>
      <h3 className="address-title">Dirección de Entrega</h3>
      <h4 className="subtitles">Nombre completo</h4>
      <input type="text" placeholder="Carlos Brenes Barrantes" className="inputs"/>
      <h4 className="subtitles">Dirección</h4>
      <input type="text" placeholder="San José, San Sebastián" className="inputs"/>
      <div className="container-address">
        <div>
          <h4 className="subtitles">Provincia</h4>
          <input type="text" placeholder="San José" className="inputs-addr"/>
        </div>
        <div>
          <h4 className="subtitles">Cantón</h4>
          <input type="text" placeholder="Central" className="inputs-addr"/>
        </div>
      </div>
    </>
  );
}

export default AddressForm;
