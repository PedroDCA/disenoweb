import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage";
import ProductDetail from "./components/productDetail";
import SearchPage from "./components/searchPage";
import SignPage from "./components/signPage";
import { useReducer } from "react";
import StoreReducer from "./store/reducers";

function App() {
  const [cartElementList, dispatch] = useReducer(StoreReducer, [{ id: 1 }]);
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
          <ProductDetail
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
        element: <SignPage />,
      },
    ],
    {
      basename: "/",
    }
  );

  return <RouterProvider router={router} />;
}

export default App;
