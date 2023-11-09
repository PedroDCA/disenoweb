import LogoSection from "./logoSection";
import ProductList from "./productList";
import Header from "./header";
import { RemoveCartElement } from "../store/actions";
import { useEffect } from "react";

import blackBottle from "../images/blackBottle.png";
import greenBottle from "../images/greenBottle.png";
import pinkBottle from "../images/pinkBottle.png";
import metalBottle from "../images/metalBottle.png";
import redBottle from "../images/redBottle.png";
import skyBottle from "../images/skyBottle.png";
import purpleBottle from "../images/purpleBottle.png";
import bronceBottle from "../images/bronceBottle.png";


const productList = [
  {
    id: 1,
    imageUrl: blackBottle,
    name: "Botella Negro Opaco  750ML",
    price: 15000,
  },
  {
    id: 1,
    imageUrl: greenBottle,
    name: "Botella Verde Agua 750ML",
    price: 12500,
  },
  {
    id: 1,
    imageUrl: pinkBottle,
    name: "Botella Rosado Pastel 750ML",
    price: 14200,
  },
  {
    id: 1,
    imageUrl: metalBottle,
    name: "Botella Metálico claro 750ML",
    price: 13500,
  },
  {
    id: 1,
    imageUrl: redBottle,
    name: "Botella Vino 750ML",
    price: 12500,
},
{
    id: 1,
    imageUrl: skyBottle,
    name: "Botella Turquesa 750ML",
    price: 15000,
},
{
    id: 2,
    imageUrl: purpleBottle,
    name: "Botella Morada 750ML",
    price: 13500,
},
{
    id: 3,
    imageUrl: bronceBottle,
    name: "Botella bronce 750ML",
    price: 14200,
},
];

function SearchPage({ cartElementList, dispatch }) {
  return (
    <>
      <header className="p-3 header_container w-100">
        <Header numberOfItems={cartElementList.length} />
      </header>
      <main>
        <LogoSection />
        <div className="container">
          <ProductList productList={productList} />
        </div>
      </main>
    </>
  );
}

export default SearchPage;
