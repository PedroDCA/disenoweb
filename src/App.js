import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage";
import SearchPage from "./components/searchPage";
import SignPage from "./components/signPage";
import { useEffect, useReducer, useRef } from "react";
import StoreReducer from "./store/reducers";
import Swal from "sweetalert2";
import ProductDetailPage from "./components/productDetailPage";

function App() {
  const [cartElementList, dispatch] = useReducer(StoreReducer, []);
  const previousCartElementList = useRef(cartElementList);

  useEffect(() => {
    if (cartElementList.length === previousCartElementList.current.length) {
      return
    }

    if (cartElementList.length > previousCartElementList.current.length) {
      Swal.fire('Item agregado al carrito!');
    }

    if (cartElementList.length < previousCartElementList.current.length) {
      Swal.fire('Item eliminado del carrito!');
    }
  }, [cartElementList, previousCartElementList])

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <Homepage cartElementList={cartElementList} dispatch={dispatch} />
        ),
      },
      {
        path: "/product/:productId",
        element: (
          <ProductDetailPage
            cartElementList={cartElementList}
            dispatch={dispatch}
          />
        ),
      },
      {
        path: "/search",
        element: (
          <SearchPage cartElementList={cartElementList} dispatch={dispatch} />
        ),
      },
      {
        path: "/profile",
        element: <SignPage cartElementList={cartElementList}/>,
      },
    ],
    {
      basename: "/",
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
