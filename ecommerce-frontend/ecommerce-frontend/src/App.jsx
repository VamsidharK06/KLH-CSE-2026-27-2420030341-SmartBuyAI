import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Wishlist from "./pages/Wishlist";
import Recommendations from "./pages/Recommendations";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Compare from "./pages/Compare";
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <p className="status-message">Loading...</p>;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login";

  return (
    <div className="app-layout">
      {!hideSidebar && <Sidebar />}
      <main className={hideSidebar ? "app-main app-main-full" : "app-main"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
	  <Route path="/recommendations" element={<Recommendations />}/>
	  <Route path="/compare" element={<Compare />} />
	  <Route path="/wishlist" element={<Wishlist />} />
	  <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<Products />} />
          <Route path="/products/:category/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;