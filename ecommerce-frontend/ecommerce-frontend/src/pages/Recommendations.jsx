
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const INTEREST_KEY = "smartbuy-interest";
const BUDGET_KEY = "smartbuy-budget";
const WISHLIST_KEY = "smartbuy-wishlist";
const FEEDBACK_KEY = "smartbuy-recommendation-feedback";

const CATEGORY_LABELS = {
  electronics: "Electronic Gadgets",
  decorative: "Decorative Items",
  sarees: "Sarees",
  bangles: "Bangles",
};

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function Recommendations() {
  const [products, setProducts] = useState([]);
  const [feedback, setFeedback] = useState(() =>
    readJSON(FEEDBACK_KEY, {})
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
        if (active) {
          setError("Could not load recommendations.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const interest = localStorage.getItem(INTEREST_KEY) || "all";
  const savedBudget = localStorage.getItem(BUDGET_KEY) || "";

  const budget =
    savedBudget.trim() !== "" &&
    Number.isFinite(Number(savedBudget)) &&
    Number(savedBudget) >= 0
      ? Number(savedBudget)
      : null;

  const preferredCategory = CATEGORY_LABELS[interest];

  const wishlistValue = readJSON(WISHLIST_KEY, []);
  const wishlistIds = Array.isArray(wishlistValue)
    ? wishlistValue
    : [];

  function saveFeedback(productId, value) {
    const updated = { ...feedback };

    // Clicking the same choice again removes the feedback.
    if (updated[String(productId)] === value) {
      delete updated[String(productId)];
    } else {
      updated[String(productId)] = value;
    }

    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(updated));
    setFeedback(updated);
  }

  const savedProducts = products.filter((product) =>
    wishlistIds.some(
      (id) => String(id) === String(product.id)
    )
  );

  const wishlistCategories = savedProducts.map(
    (product) => product.category
  );

  const availableProducts = products.filter(
    (product) =>
      !wishlistIds.some(
        (id) => String(id) === String(product.id)
      )
  );

  function scoreProduct(product) {
    let score = 0;
    const reasons = [];
    const price = Number(product.price);

    if (
      preferredCategory &&
      product.category === preferredCategory
    ) {
      score += 50;
      reasons.push("Matches your selected interest");
    }

    if (wishlistCategories.includes(product.category)) {
      score += 30;
      reasons.push("Similar to your wishlist interests");
    }

    if (budget !== null && Number.isFinite(price)) {
      if (price <= budget) {
        score += 20;
        reasons.push("Within your budget");
      }
    }

    if (
      budget !== null &&
      Number.isFinite(price) &&
      price > budget
    ) {
      reasons.push("Above your budget");
    }

    if (reasons.length === 0) {
      reasons.push("Explore something new");
    }

    const productFeedback = feedback[String(product.id)];

    // Feedback changes ranking, not the preference percentage.
    const feedbackAdjustment =
      productFeedback === "interested"
        ? 15
        : productFeedback === "not-interested"
          ? -100
          : 0;

    return {
      ...product,
      matchPercentage: score,
      rankingScore: score + feedbackAdjustment,
      reasons,
      budgetDifference:
        budget === null || !Number.isFinite(price)
          ? null
          : budget - price,
    };
  }

  const rankedProducts = availableProducts
    .map(scoreProduct)
    .sort((a, b) => {
      if (b.rankingScore !== a.rankingScore) {
        return b.rankingScore - a.rankingScore;
      }

      return Number(a.price) - Number(b.price);
    });

  const matchingProducts = preferredCategory
    ? rankedProducts.filter(
        (product) => product.category === preferredCategory
      )
    : rankedProducts;

  const otherProducts = preferredCategory
    ? rankedProducts.filter(
        (product) => product.category !== preferredCategory
      )
    : [];

  const withinBudget = matchingProducts.filter((product) =>
    budget === null
      ? true
      : Number(product.price) <= budget
  );

  const aboveBudget =
    budget === null
      ? []
      : matchingProducts.filter(
          (product) => Number(product.price) > budget
        );

  function renderProducts(list) {
    if (list.length === 0) {
      return (
        <p>No products available in this section right now.</p>
      );
    }

    return (
      <div className="product-grid">
        {list.map((product) => {
          const productFeedback = feedback[String(product.id)];

          return (
            <div className="recommendation-card" key={product.id}>
              <ProductCard product={product} />

              <div className="recommendation-reason">
                <div className="recommendation-match-header">
                  <strong>Preference Match</strong>
                  <strong>{product.matchPercentage}%</strong>
                </div>

                <div className="recommendation-match-track">
                  <div
                    className="recommendation-match-fill"
                    style={{
                      width: `${product.matchPercentage}%`,
                    }}
                  />
                </div>

                {product.budgetDifference !== null && (
                  <div
                    className={`budget-status ${
                      product.budgetDifference >= 0
                        ? "budget-status-ok"
                        : "budget-status-over"
                    }`}
                  >
                    <strong>
                      {product.budgetDifference >= 0
                        ? "Within Budget"
                        : "Over Budget"}
                    </strong>

                    <p>
                      ₹
                      {Math.abs(
                        product.budgetDifference
                      ).toLocaleString("en-IN")}{" "}
                      {product.budgetDifference >= 0
                        ? "remaining"
                        : "over your budget"}
                    </p>
                  </div>
                )}

                <strong>Why this product?</strong>

                <ul>
                  {product.reasons.map((reason) => (
                    <li key={reason}>{reason}</li>
                  ))}
                </ul>

                <div className="recommendation-feedback">
                  <strong>Was this recommendation useful?</strong>

                  <div className="feedback-buttons">
                    <button
                      type="button"
                      className={`feedback-btn ${
                        productFeedback === "interested"
                          ? "feedback-selected"
                          : ""
                      }`}
                      aria-pressed={
                        productFeedback === "interested"
                      }
                      onClick={() =>
                        saveFeedback(product.id, "interested")
                      }
                    >
                      👍 Interested
                    </button>

                    <button
                      type="button"
                      className={`feedback-btn ${
                        productFeedback === "not-interested"
                          ? "feedback-selected"
                          : ""
                      }`}
                      aria-pressed={
                        productFeedback === "not-interested"
                      }
                      onClick={() =>
                        saveFeedback(product.id, "not-interested")
                      }
                    >
                      👎 Not Interested
                    </button>
                  </div>

                  {productFeedback && (
                    <p className="feedback-message">
                      {productFeedback === "interested"
                        ? "We'll prioritize similar recommendations."
                        : "We'll lower this product's priority."}
                      {" "}Click your selected choice again to clear it.
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (loading) {
    return (
      <p className="status-message">
        Finding products for you...
      </p>
    );
  }

  if (error) {
    return (
      <p className="status-message status-error">
        {error}
      </p>
    );
  }

  return (
    <div className="page recommendations-page">
      <h1>Recommended for You</h1>

      <p>
        Discover products selected using your interests, budget,
        wishlist, and feedback.
      </p>

      <section className="recommendation-info">
        <h2>Your shopping preferences</h2>

        <p>
          <strong>Interest:</strong>{" "}
          {preferredCategory || "All categories"}
        </p>

        <p>
          <strong>Budget:</strong>{" "}
          {budget === null
            ? "Not set"
            : `₹${budget.toLocaleString("en-IN")}`}
        </p>

        <p>
          <strong>Saved products:</strong>{" "}
          {savedProducts.length}
        </p>

        <Link to="/" className="btn btn-primary">
          Update preferences
        </Link>
      </section>

      <section>
        <h2>Best Matches Within Your Budget</h2>

        <p className="recommendation-note">
          Products matching your interest and budget.
        </p>

        {renderProducts(withinBudget)}
      </section>

      {budget !== null && (
        <section className="recommendation-budget-section">
          <h2>Interested, but Above Budget</h2>

          <p className="recommendation-note">
            Products matching your category that exceed your budget.
          </p>

          {renderProducts(aboveBudget)}
        </section>
      )}

      {preferredCategory && (
        <section className="recommendation-discover">
          <h2>Explore Other Categories</h2>

          <p className="recommendation-note">
            Discover products from other categories.
          </p>

          {renderProducts(otherProducts)}
        </section>
      )}

      <p className="recommendation-disclaimer">
        SmartBuy uses a rule-based recommendation system. Feedback
        is stored in this browser and adjusts product ranking; it
        does not train a machine-learning model.
      </p>
    </div>
  );
}

export default Recommendations;
