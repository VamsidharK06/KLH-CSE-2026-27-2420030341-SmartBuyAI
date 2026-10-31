
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/api";

function Compare() {
  const [products, setProducts] = useState([]);
  const [firstId, setFirstId] = useState("");
  const [secondId, setSecondId] = useState("");
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

  const first = products.find((p) => String(p.id) === firstId);
  const second = products.find((p) => String(p.id) === secondId);

  if (loading) return <p className="status-message">Loading products...</p>;
  if (error) return <p className="status-message status-error">{error}</p>;

  return (
    <div className="page compare-page">
      <h1>Compare Products</h1>
      <p>Compare prices and product details before making a choice.</p>

      <div className="compare-selectors">
        <label>
          First product
          <select
            value={firstId}
            onChange={(e) => setFirstId(e.target.value)}
          >
            <option value="">Choose a product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — ₹{Number(p.price).toLocaleString("en-IN")}
              </option>
            ))}
          </select>
        </label>

        <label>
          Second product
          <select
            value={secondId}
            onChange={(e) => setSecondId(e.target.value)}
          >
            <option value="">Choose a product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — ₹{Number(p.price).toLocaleString("en-IN")}
              </option>
            ))}
          </select>
        </label>
      </div>

      {firstId && firstId === secondId && (
        <p className="status-message">
          Please choose two different products to compare.
        </p>
      )}

      {first && second && firstId !== secondId && (
        <>
          <div className="comparison-grid">
            {[first, second].map((product) => (
              <article className="comparison-card" key={product.id}>
                <img
  src={
    product.imageUrl ||
    product.image_url ||
    "https://placehold.co/400x300?text=No+Image"
  }
  alt={product.name}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "https://placehold.co/400x300?text=No+Image";
  }}
/>
                <h2>{product.name}</h2>
                <p className="comparison-price">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>
                <p>{product.description || "No description available."}</p>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <Link to={`/products/${product.category === "Electronic Gadgets" ? "electronics" : product.category === "Decorative Items" ? "decorative" : product.category.toLowerCase()}/${product.id}`}>
                  View product details
                </Link>
              </article>
            ))}
          </div>

          
<section className="comparison-result">
  <h2>SmartBuy Price Analysis</h2>

  {Number(first.price) === Number(second.price) ? (
    <p>Both products have the same price.</p>
  ) : (
    <>
      <p>
        <strong>More affordable option: </strong>
        {Number(first.price) < Number(second.price)
          ? first.name
          : second.name}
      </p>

      <p>
        <strong>Lowest price: </strong>₹
        {Math.min(
          Number(first.price),
          Number(second.price)
        ).toLocaleString("en-IN")}
      </p>

      <p>
        <strong>You could save: </strong>₹
        {Math.abs(
          Number(first.price) - Number(second.price)
        ).toLocaleString("en-IN")}
      </p>

      <p className="value-note">
        SmartBuy Tip: The lower-priced product costs less,
        but compare features and suitability before buying.
      </p>
    </>
  )}
</section>

        </>
      )}
    </div>
  );
}

export default Compare;
