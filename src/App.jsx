import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
// import NewItemPage from "./pages/NewItemPage";
import RegisterPage from "./pages/RegisterPage";
import ShopPage from "./pages/ShopPage";
import HomePage from "./pages/HomePage";
import Header from "./components/UI/layout/Header";
import { Toaster } from "react-hot-toast";
import AdminPrivateRoute from "./privateRoute/AdminPrivateRoute";
import CategoryListPage from "./pages/category/categoryListPage";
import CategoryCreate from "./pages/category/CategoryCreate";
import CategoryEdit from "./pages/category/CategoryEdit";
import ItemsListPage from "./pages/items/ItemsListPage";
import ItemsCreatePage from "./pages/items/ItemsCreatePage";
import ItemEditPage from "./pages/items/ItemEditPage";
import PrivateRoute from "./privateRoute/PrivateRoute";
import OrderListPage from "./pages/order/OrderListPage";
import OrderDetailPage from "./pages/order/OrderDetailPage";

export default function App() {
  return (
    <div className=" ">
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderListPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <PrivateRoute>
              <OrderDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <AdminPrivateRoute>
              <CategoryListPage />
            </AdminPrivateRoute>
          }
        />

        <Route
          path="/categories/create"
          element={
            <AdminPrivateRoute>
              <CategoryCreate />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/categories/edit/:id"
          element={
            <AdminPrivateRoute>
              <CategoryEdit />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/items"
          element={
            <AdminPrivateRoute>
              <ItemsListPage />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/items/create"
          element={
            <AdminPrivateRoute>
              <ItemsCreatePage />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/items/edit/:id"
          element={
            <AdminPrivateRoute>
              <ItemEditPage />
            </AdminPrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}
