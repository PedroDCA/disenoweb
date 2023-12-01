import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage";
import SearchPage from "./components/searchPage";
import SignPage from "./components/signPage";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import ProductDetailPage from "./components/productDetailPage";
import { useSelector } from "react-redux";
import CheckoutPage from "./components/checkoutPage";
import PaymentPage from "./components/paymentPage";
import ProfilePage from "./components/profilePage";
import Footer from "./components/footer";

function App() {
  const cartElementList = useSelector((state) => state.cart.list);
  const wasListCleared = useSelector((state) => state.cart.wasListCleared);
  const previousCartElementList = useRef(cartElementList);

  useEffect(() => {
    if (
      cartElementList.length === previousCartElementList.current.length ||
      wasListCleared
    ) {
      return;
    }

    if (cartElementList.length > previousCartElementList.current.length) {
      Swal.fire("Item agregado al carrito!");
    }

    if (cartElementList.length < previousCartElementList.current.length) {
      Swal.fire("Item eliminado del carrito!");
    }

    previousCartElementList.current = cartElementList;
  }, [cartElementList, previousCartElementList, wasListCleared]);

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
        path: "/sign",
        element: <SignPage />,
      },
      {
        path: "/cart",
        element: <CheckoutPage />,
      },
      {
        path: "/pay",
        element: <PaymentPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/footer",
        element: <Footer />,
      },
    ],
    {
      basename: "/",
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
