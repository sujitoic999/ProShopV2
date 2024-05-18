import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/index.css";
import App from "./App";
import "./assets/styles/bootstrap.custom.css";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import store from "./store";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import { Provider } from "react-redux";
import ProfileScreen from "./screens/ProfileScreen";
import OrderListScreen from "./screens/admin/OrderListScreen";
import ProductListScreen from "./screens/admin/ProductListScreen";
import ProductEditScreen from "./screens/admin/ProductEditScreen";
import UserListScreen from "./screens/admin/UserListScreen";
import UserEditSceen from "./screens/admin/UserEditSceen";
// this is first way we have created routes in tutorials
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route index={true} path="/" element={<HomeScreen />} />
//       <Route path="/product/:id" element={<ProductScreen />} />
//       <Route path="/cart" element={<CartScreen />} />
//       <Route path="/login" element={<LoginScreen />} />
//       <Route path="/register" element={<RegisterScreen />} />
//       <Route path="" element={<PrivateRoute />}>
//         {" "}
//         <Route path="/shipping" element={<ShippingScreen />} />
//       </Route>
//     </Route>
//   )
// );

// --------------------------------------------------------------------------
// this is the way how we've created routes in our office project ....in path
// '/' <App/> component will be automatically there but in outlet part of App.js which child of router will be chosen
// that will be displayed there

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //        here we've already included <App/> part inside router part of application
    children: [
      {
        id: 1,
        path: "/",
        element: <HomeScreen />,
      },
      {
        id: 1,
        path: "/search/:keyword",
        element: <HomeScreen />,
      },
      {
        id: 1,
        path: "/page/:pageNumber",
        element: <HomeScreen />,
      },
      {
        id: 1,
        path: "/search/:keyword/page/:pageNumber",
        element: <HomeScreen />,
      },
      {
        id: 2,
        path: "/product/:id",
        element: <ProductScreen />,
      },
      {
        id: 3,
        path: "/cart",
        element: <CartScreen />,
      },
      {
        id: 4,
        path: "/login",
        element: <LoginScreen />,
      },
      {
        id: 5,
        path: "/register",
        element: <RegisterScreen />,
      },
      {
        id: 6,
        path: "",
        element: <PrivateRoute />,
        children: [
          {
            id: 61,
            path: "/shipping",
            element: <ShippingScreen />,
          },
          {
            id: 62,
            path: "/payment",
            element: <PaymentScreen />,
          },
          {
            id: 63,
            path: "/placeorder",
            element: <PlaceOrderScreen />,
          },
          {
            id: 64,
            path: "/order/:id",
            element: <OrderScreen />,
          },
          {
            id: 64,
            path: "/profile",
            element: <ProfileScreen />,
          },
        ],
      },
      {
        id: 7,
        path: "",
        element: <AdminRoute />,
        children: [
          {
            id: 71,
            path: "/admin/orderlist",
            element: <OrderListScreen />,
          },
          {
            id: 72,
            path: "/admin/productlist",
            element: <ProductListScreen />,
          },
          {
            id: 72,
            path: "/admin/productlist/:pageNumber",
            element: <ProductListScreen />,
          },
          {
            id: 73,
            path: "/admin/product/:id/edit",
            element: <ProductEditScreen />,
          },
          {
            id: 74,
            path: "/admin/userlist",
            element: <UserListScreen />,
          },
          {
            id: 75,
            path: "/admin/user/:id/edit",
            element: <UserEditSceen />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
