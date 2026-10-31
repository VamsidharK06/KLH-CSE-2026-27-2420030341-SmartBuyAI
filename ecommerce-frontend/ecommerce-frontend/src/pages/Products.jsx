import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";

const CATEGORY_LABELS = {
  electronics: "Electronic Gadgets",
  decorative: "Home Decor",
  bags: "Bags & Backpacks",
  essentials: "Everyday Essentials",
};

const INTEREST_LABELS = { ...CATEGORY_LABELS };

function Products() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();

  const categoryLabel = CATEGORY_LABELS[category];
  const selectedInterest = searchParams.get("interest") || "all";
  const interestLabel = INTEREST_LABELS[selectedInterest];
  const searchParam = searchParams.get("search");
  const isGlobalSearch = searchParam !== null;

  const budgetParam = searchParams.get("budget");

  const initialBudget =
    budgetParam !== null &&
    budgetParam.trim() !== "" &&
    Number.isFinite(Number(budgetParam)) &&
    Number(budgetParam) >= 0
      ? Number(budgetParam)
      : null;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState(
    () => searchParam || ""
  );

  const [selectedCategory, setSelectedCategory] = useState(
    () => categoryLabel || INTEREST_LABELS[selectedInterest] || "all"
  );

  const [maxPrice, setMaxPrice] = useState(
    initialBudget === null ? "" : String(initialBudget)
  );

  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    setSearch(searchParam || "");
    setMaxPrice(
      initialBudget === null ? "" : String(initialBudget)
    );
    setSelectedCategory(
      isGlobalSearch
        ? "all"
        : categoryLabel || INTEREST_LABELS[selectedInterest] || "all"
    );
    setSortOrder("default");
  }, [
    searchParam,
    initialBudget,
    isGlobalSearch,
    categoryLabel,
    selectedInterest,
  ]);

  useEffect(() => {
    let isMounted = true;

    getProducts()
      .then((res) => {
        if (isMounted) {
          setProducts(res.data);
          setError("");
        }
      })
      .catch(() => {
        if (isMounted) {
          setError("Could not load products. Please try again later.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const validMaxPrice =
    maxPrice.trim() !== "" &&
    Number.isFinite(Number(maxPrice)) &&
    Number(maxPrice) >= 0
      ? Number(maxPrice)
      : null;

  const filteredProducts = products
    .filter((product) => {
      const productName = (product.name || "").toLowerCase();
      const productCategory = product.category || "";
      const price = Number(product.price);

      // Global search must search the full catalog.
      const matchesRouteCategory =
        isGlobalSearch || !categoryLabel ||
        productCategory === categoryLabel;

      const matchesInterest =
        isGlobalSearch ||
        selectedInterest === "all" ||
        !interestLabel ||
        productCategory === interestLabel;

      const matchesSelectedCategory =
        selectedCategory === "all" ||
        productCategory === selectedCategory;

      const matchesSearch = productName.includes(
        search.trim().toLowerCase()
      );

      const matchesBudget =
        validMaxPrice === null || price <= validMaxPrice;

      return (
        matchesRouteCategory &&
        matchesInterest &&
        matchesSelectedCategory &&
        matchesSearch &&
        matchesBudget
      );
    })
    .sort((a, b) => {
      if (sortOrder === "low-high") {
        return Number(a.price) - Number(b.price);
      }

      if (sortOrder === "high-low") {
        return Number(b.price) - Number(a.price);
      }

      return 0;
    });

  function resetFilters() {
    setSearch("");
    setSelectedCategory(
      isGlobalSearch ? "all" : categoryLabel || "all"
    );
    setMaxPrice("");
    setSortOrder("default");
  }

  if (loading) {
    return <p className="status-message">Loading products...</p>;
  }

  if (error) {
    return <p className="status-message status-error">{error}</p>;
  }

  return (
    <div className="page products-page">
      <div className="products-header">
        <h1>
          {isGlobalSearch
            ? `Search results for "${searchParam}"`
            : categoryLabel ||
              (interestLabel
                ? `${interestLabel} Recommendations`
                : "Products")}
        </h1>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {!isGlobalSearch &&
        (interestLabel || initialBudget !== null) && (
          <section className="recommendation-summary">
            <h2>Your shopping preferences</h2>

            {interestLabel && <p>Interest: {interestLabel}</p>}

            {initialBudget !== null && (
              <p>
                Original budget: ₹
                {initialBudget.toLocaleString("en-IN")}
              </p>
            )}

            <p>
              Use the filters below to refine your product results.
            </p>
          </section>
        )}

      <section className="product-filters">
        <div className="filter-control">
          <label htmlFor="category-filter">Category</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All categories</option>

            {Object.values(CATEGORY_LABELS).map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-control">
          <label htmlFor="max-price">Maximum price (₹)</label>
          <input
            id="max-price"
            type="number"
            min="0"
            placeholder="e.g. 2000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className="filter-control">
          <label htmlFor="sort-order">Sort by price</label>
          <select
            id="sort-order"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Default order</option>
            <option value="low-high">Low to high</option>
            <option value="high-low">High to low</option>
          </select>
        </div>

        <button
          type="button"
          className="reset-filters-btn"
          onClick={resetFilters}
        >
          Reset filters
        </button>
      </section>

      <p className="recommendation-count">
        {filteredProducts.length} product
        {filteredProducts.length !== 1 ? "s" : ""} found
      </p>

      {filteredProducts.length === 0 ? (
        <p className="status-message">
          No products match these filters. Try another search or reset
          the filters.
        </p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
