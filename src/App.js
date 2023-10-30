import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Homepage from "./components/homepage";
import ProductDetail from "./components/productDetail";
import SearchPage from "./components/searchPage";

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
