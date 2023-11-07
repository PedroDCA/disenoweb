import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage";
import ProductDetail from "./components/productDetail";
import SearchPage from "./components/searchPage";
import SignPage from "./components/signPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/product/:productId",
    element: <ProductDetail />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/profile",
    element: <SignPage />,
  },
], {
  basename: "/",
});

function App() {
  return <RouterProvider router={router} />;
}

export default App;
