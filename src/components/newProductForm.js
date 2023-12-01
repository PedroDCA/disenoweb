function NewProductForm() {
  return (
    <div>
      <p>Imagen del producto</p>
      <input type="file" name="image" accept="image/png, image/jpeg" id="productImage" alt="Submit image" />

      <p>Descripcion</p>
      <input type="text" name="details" id="productDescription" />

      <p>Color</p>
      <input type="text" name="color" id="productColor" />

      <p>Descripcion</p>
      <input type="text" name="description" id="productDescription" />

      <p>Almacenamiento en mililitros(ml)</p>
      <input type="number" name="storage" id="productStorage" />

      <p>Material</p>
      <input type="text" name="material" id="productMaterial" />

      <p>Precio</p>
      <input type="number" name="price" id="productPrice" />
    </div>
  );
}

export default NewProductForm;
