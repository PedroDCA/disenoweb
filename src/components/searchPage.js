import LogoSection from "./logoSection";
import ProductList from "./productList";
import Botella from "../images/botella.jpg";
import Header from "./header";
import { RemoveCartElement } from "../store/actions";
import { useEffect } from "react";

const productList = [
  {
    id: 1,
    imageUrl: Botella,
    name: "Botella color ejemplo 750ml",
    price: 10000,
  },
  {
    id: 1,
    imageUrl: Botella,
    name: "Botella color ejemplo 750ml",
    price: 10000,
  },
  {
    id: 1,
    imageUrl: Botella,
    name: "Botella color ejemplo 750ml",
    price: 10000,
  },
  {
    id: 1,
    imageUrl: Botella,
    name: "Botella color ejemplo 750ml",
    price: 10000,
  },
  {
    id: 1,
    imageUrl: Botella,
    name: "Botella color ejemplo 750ml",
    price: 10000,
  },
  {
    id: 1,
    imageUrl: Botella,
    name: "Botella color ejemplo 750ml",
    price: 10000,
  },
  {
    id: 2,
    imageUrl: Botella,
    name: "Botella color ejemplo 750ml",
    price: 1000,
  },
  {
    id: 3,
    imageUrl: Botella,
    name: "Botella color ejemplo 750ml",
    price: 98000,
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
