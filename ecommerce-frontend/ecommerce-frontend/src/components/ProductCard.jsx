
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const WISHLIST_KEY = "smartbuy-wishlist";

function getSavedIds() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

function ProductCard({ product }) {
  const { category } = useParams();

  const [saved, setSaved] = useState(() =>
    getSavedIds().some((id) => String(id) === String(product.id))
  );

  function toggleWishlist() {
    const currentIds = getSavedIds();

    const updatedIds = saved
      ? currentIds.filter((id) => String(id) !== String(product.id))
      : currentIds.some((id) => String(id) === String(product.id))
        ? currentIds
        : [...currentIds, product.id];

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updatedIds));
    setSaved(!saved);
  }

  const categorySlug =
    category ||
    ({
      "Electronic Gadgets": "electronics",
      "Decorative Items": "decorative",
      Sarees: "sarees",
      Bangles: "bangles",
    }[product.category] || "electronics");

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={
            product.imageUrl ||
            product.image_url ||
            "https://placehold.co/400x300?text=No+Image"
          }
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://placehold.co/400x300?text=No+Image";
          }}
        />
      </div>

      <div className="product-card-body">
        <h3 className="product-name">{product.name}</h3>

        <p className="product-description">{product.description}</p>

        <div className="product-footer">
          <span className="product-price">
            ₹{Number(product.price).toFixed(2)}
          </span>

          <Link
            to={`/products/${categorySlug}/${product.id}`}
            className="btn btn-primary"
          >
            View Product
          </Link>
        </div>

        <button
          type="button"
          className="wishlist-toggle"
          onClick={toggleWishlist}
          aria-pressed={saved}
        >
          {saved ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
