import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage";
import SearchPage from "./components/searchPage";
import SignPage from "./components/signPage";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import ProductDetailPage from "./components/productDetailPage";
import { useSelector } from "react-redux";
import CartPage from "./components/cartPage";
import PaymentPage from "./components/paymentPage";

function App() {
  const cartElementList = useSelector((state) => state.cart.list);
  const previousCartElementList = useRef(cartElementList);

  useEffect(() => {
    if (cartElementList.length === previousCartElementList.current.length) {
      return;
    }

    if (cartElementList.length > previousCartElementList.current.length) {
      Swal.fire('Item agregado al carrito!');
    }

    if (cartElementList.length < previousCartElementList.current.length) {
      Swal.fire('Item eliminado del carrito!');
    }

    previousCartElementList.current = cartElementList;
  }, [cartElementList, previousCartElementList]);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/product/:productId",
        element: <ProductDetailPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/profile",
        element: <SignPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/pay",
        element: <PaymentPage />
      }
    ],
    {
      basename: "/",
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
