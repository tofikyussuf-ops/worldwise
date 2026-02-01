import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import CityList, { loader as citiesLoader } from "./components/CityList";
import City, { loader as cityLoader } from "./components/City";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

export default createBrowserRouter([
  { path: "/", element: <Homepage />, errorElement: <PageNotFound /> },
  { path: "product", element: <Product />, errorElement: <PageNotFound /> },
  { path: "pricing", element: <Pricing />, errorElement: <PageNotFound /> },
  { path: "login", element: <Login />, errorElement: <PageNotFound /> },
  {
    path: "app",
    id: "appData",
    loader: citiesLoader,
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Navigate replace to="cities" /> },
      { path: "cities", element: <CityList /> },
      { path: "cities/:id", element: <City />, loader: cityLoader },
      { path: "countries", element: <CountryList /> },
      { path: "form", element: <Form /> },
    ],
  },
  { path: "*", element: <PageNotFound /> },
]);
