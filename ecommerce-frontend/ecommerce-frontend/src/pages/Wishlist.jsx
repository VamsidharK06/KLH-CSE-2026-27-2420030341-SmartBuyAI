
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const WISHLIST_KEY = "smartbuy-wishlist";
const BUDGET_KEY = "smartbuy-budget";

function readWishlist() {
  try {
    const value = JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function Wishlist() {
  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState(readWishlist);
  const [budget, setBudget] = useState(
    () => localStorage.getItem(BUDGET_KEY) || ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getProducts()
      .then((response) => {
        if (active) setProducts(response.data);
      })
      .catch(() => {
        if (active) setError("Could not load products. Please try again.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    function syncWishlist() {
      setWishlistIds(readWishlist());
    }

    window.addEventListener("storage", syncWishlist);
    return () => window.removeEventListener("storage", syncWishlist);
  }, []);

  function removeFromWishlist(id) {
    const updated = wishlistIds.filter(
      (savedId) => String(savedId) !== String(id)
    );

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    setWishlistIds(updated);
  }

  const savedProducts = products.filter((product) =>
    wishlistIds.some((id) => String(id) === String(product.id))
  );

  const total = savedProducts.reduce(
    (sum, product) => sum + Number(product.price || 0),
    0
  );

  const validBudget =
    budget.trim() !== "" &&
    Number.isFinite(Number(budget)) &&
    Number(budget) >= 0;

  const budgetAmount = validBudget ? Number(budget) : null;
  const remaining = budgetAmount === null ? null : budgetAmount - total;
  const usage =
    budgetAmount > 0 ? Math.min((total / budgetAmount) * 100, 100) : 0;

  if (loading) {
    return <p className="status-message">Loading your wishlist...</p>;
  }

  if (error) {
    return <p className="status-message status-error">{error}</p>;
  }

  return (
    <div className="page wishlist-page">
      <h1>My Wishlist</h1>
      <p>Save products and plan your shopping budget.</p>

      <section className="wishlist-budget">
        <h2>Wishlist Budget Summary</h2>

        <div className="wishlist-budget-input">
          <label htmlFor="wishlist-budget">Your budget (₹)</label>
          <input
            id="wishlist-budget"
            type="number"
            min="0"
            step="1"
            placeholder="Enter your budget"
            value={budget}
            onChange={(event) => {
              const value = event.target.value;
              setBudget(value);
              localStorage.setItem(BUDGET_KEY, value);
            }}
          />
        </div>

        <div className="wishlist-total">
          <span>Total saved product value</span>
          <strong>₹{total.toLocaleString("en-IN")}</strong>
        </div>

        {budgetAmount !== null ? (
          <>
            <div className="wishlist-total">
              <span>Your budget</span>
              <strong>₹{budgetAmount.toLocaleString("en-IN")}</strong>
            </div>

            <div className="wishlist-total">
              <span>
                {remaining >= 0 ? "Remaining budget" : "Over budget"}
              </span>
              <strong className={remaining >= 0 ? "budget-ok" : "budget-over"}>
                {remaining < 0 ? "−" : ""}
                ₹{Math.abs(remaining).toLocaleString("en-IN")}
              </strong>
            </div>

            {budgetAmount > 0 && (
              <div
                className="wishlist-budget-track"
                role="progressbar"
                aria-label="Budget used"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.min(
                  Math.round((total / budgetAmount) * 100),
                  100
                )}
              >
                <div
                  className={
                    remaining >= 0 ? "wishlist-budget-fill" : "wishlist-budget-fill over"
                  }
                  style={{ width: `${usage}%` }}
                />
              </div>
            )}

            <p className="wishlist-budget-note">
              {savedProducts.length === 0
                ? "Add products to see how they fit your budget."
                : remaining >= 0
                  ? "Your saved products fit within your budget."
                  : "Your saved products exceed your budget. Consider removing some items."}
            </p>
          </>
        ) : (
          <p className="wishlist-budget-note">
            Enter a budget to see how your saved products fit within it.
          </p>
        )}
      </section>

      {savedProducts.length === 0 ? (
        <section className="wishlist-empty">
          <h2>Your wishlist is empty</h2>
          <p>Explore SmartBuy and save products you may want to buy later.</p>
          <Link to="/products" className="btn btn-primary">
            Explore products
          </Link>
        </section>
      ) : (
        <>
          <h2>Saved products ({savedProducts.length})</h2>

          <div className="product-grid">
            {savedProducts.map((product) => (
              <div className="wishlist-card" key={product.id}>
                <ProductCard product={product} />

                <button
                  type="button"
                  className="wishlist-remove"
                  onClick={() => removeFromWishlist(product.id)}
                >
                  Remove from wishlist
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Wishlist;
