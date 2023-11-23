import { formatPriceForColonCurrency } from "../service/priceService";

function VendorProduct({productInformation}) {
    return <tr>
        <td><img src={productInformation.imageUrl} alt="Vendor order information"/></td>
        <td>{productInformation.name}</td>
        <td>{formatPriceForColonCurrency(productInformation.price)}</td>
        <td>{productInformation.color}</td>
        <td>{productInformation.storage}ml</td>
        <td>{productInformation.vendor.name}</td>
        <td>{productInformation.labels.join(', ')}</td>
    </tr>
}

export default VendorProduct;