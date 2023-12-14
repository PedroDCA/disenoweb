function NewProductForm({ baseProductInformation }) {
  return (
    <div>
      {baseProductInformation?.id ? (
        <></>
      ) : (
        <>
          <p>Imagen del producto</p>
          <input
            type="file"
            name="image"
            accept="image/png, image/jpeg"
            id="productImage"
            alt="Submit image"
          />
        </>
      )}

      <p>Descripcion</p>
      <input
        type="text"
        name="details"
        id="productDescription"
        defaultValue={baseProductInformation?.details || ""}
      />

      <p>Color</p>
      <input
        type="text"
        name="color"
        id="productColor"
        defaultValue={baseProductInformation?.color || ""}
      />

      <p>Almacenamiento en mililitros(ml)</p>
      <input
        type="number"
        name="storage"
        id="productStorage"
        defaultValue={baseProductInformation?.storage || 0}
      />

      <p>Material</p>
      <input
        type="text"
        name="material"
        id="productMaterial"
        defaultValue={baseProductInformation?.material || ""}
      />

      <p>Precio</p>
      <input
        type="number"
        name="price"
        id="productPrice"
        defaultValue={baseProductInformation?.price || 0}
      />
    </div>
  );
}

export default NewProductForm;
