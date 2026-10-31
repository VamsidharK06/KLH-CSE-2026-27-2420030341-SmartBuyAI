
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CATEGORIES = [
  {
    slug: "electronics",
    label: "Electronic Gadgets",
    tagline: "Useful tech for everyday life",
    image:
      "https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232338/wireless-mouse_m4d8rk.webp",
  },
  {
    slug: "decorative",
    label: "Home Decor",
    tagline: "Make your space feel like home",
    image:
      "https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232335/ceramic_vase_atcgev.jpg",
  },
  {
    slug: "bags",
    label: "Bags & Backpacks",
    tagline: "Carry your essentials with ease",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
  },
  {
    slug: "essentials",
    label: "Everyday Essentials",
    tagline: "Useful products for daily life",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
  },
];

function Home() {
  const navigate = useNavigate();

  const [interest, setInterest] = useState(
    () => {
      const saved = localStorage.getItem("smartbuy-interest");

      return ["all", "electronics", "decorative", "bags", "essentials"].includes(
        saved
      )
        ? saved
        : "all";
    }
  );

  const [budget, setBudget] = useState(
    () => localStorage.getItem("smartbuy-budget") || ""
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem("smartbuy-interest", interest);
    localStorage.setItem("smartbuy-budget", budget);
  }, [interest, budget]);

  function savePreferences() {
    localStorage.setItem("smartbuy-interest", interest);
    localStorage.setItem("smartbuy-budget", budget);
    setPreferencesSaved(true);
  }

  function clearPreferences() {
    localStorage.removeItem("smartbuy-interest");
    localStorage.removeItem("smartbuy-budget");

    setInterest("all");
    setBudget("");
    setPreferencesSaved(false);
  }

  function findProducts(event) {
    event.preventDefault();

    if (budget.trim() !== "") {
      const amount = Number(budget);

      if (!Number.isFinite(amount) || amount < 0) {
        window.alert("Please enter a valid budget of ₹0 or more.");
        return;
      }
    }

    savePreferences();

    const params = new URLSearchParams();

    if (interest !== "all") {
      params.set("interest", interest);
    }

    if (budget.trim() !== "") {
      params.set("budget", budget.trim());
    }

    const query = params.toString();
    navigate(`/products${query ? `?${query}` : ""}`);
  }

  function handleGlobalSearch(event) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      window.alert("Please enter a product name to search.");
      return;
    }

    navigate(`/products?search=${encodeURIComponent(query)}`);
  }

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-eyebrow">
            YOUR PERSONAL SHOPPING ASSISTANT
          </span>

          <h1>Smarter shopping. Better choices.</h1>

          <p className="hero-subtitle">
            Discover products that match your interests and budget.
            Let SmartBuy help you find what fits your needs.
          </p>

          <a href="#personalize" className="hero-cta">
            Personalize your shopping →
          </a>
        </div>

        <div className="hero-visual">
          <img
            src="https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232333/lehanga_iqkq85.avif"
            alt="Festive clothing"
            className="hero-visual-img hero-visual-img-1"
          />
          <img
            src="https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232332/wall_dec_ump5jn.avif"
            alt="Home decor"
            className="hero-visual-img hero-visual-img-2"
          />
          <img
            src="https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232333/earings_ff7obs.avif"
            alt="Traditional earrings"
            className="hero-visual-img hero-visual-img-3"
          />
          <img
            src="https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232331/earpots_lydufg.avif"
            alt="Accessories"
            className="hero-visual-img hero-visual-img-4"
          />
          <img
            src="https://res.cloudinary.com/dxmkb7zy2/image/upload/v1782232331/kurtha_z0oxlk.avif"
            alt="Traditional outfit"
            className="hero-visual-img hero-visual-img-5"
          />
        </div>
      </section>

      <section className="home-global-search">
        <h2>What are you looking for?</h2>
        <p>Search products across all SmartBuy categories.</p>

        <form className="home-search-form" onSubmit={handleGlobalSearch}>
          <input
            type="search"
            aria-label="Search all products"
            placeholder="Search mouse, vase, backpack, water bottle..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />

          <button type="submit" className="hero-cta">
            Search →
          </button>
        </form>
      </section>

      <section id="personalize" className="smartbuy-intro">
        <span className="hero-eyebrow">SHOP WITH A PLAN</span>

        <h2>Personalize your shopping</h2>

        <p>
          Tell us what interests you and how much you want to spend.
          SmartBuy will find matching products for you.
        </p>

        <form className="personalize-form" onSubmit={findProducts}>
          <div className="personalize-field">
            <label htmlFor="home-interest">
              What are you interested in?
            </label>

            <select
              id="home-interest"
              value={interest}
              onChange={(event) => {
                setInterest(event.target.value);
                setPreferencesSaved(false);
              }}
            >
              <option value="all">All interests</option>
              <option value="electronics">Electronic Gadgets</option>
              <option value="decorative">Home Decor</option>
              <option value="bags">Bags & Backpacks</option>
              <option value="essentials">Everyday Essentials</option>
            </select>
          </div>

          <div className="personalize-field">
            <label htmlFor="home-budget">
              What's your budget? (₹)
            </label>

            <input
              id="home-budget"
              type="number"
              min="0"
              step="1"
              placeholder="e.g. 2000"
              value={budget}
              onChange={(event) => {
                setBudget(event.target.value);
                setPreferencesSaved(false);
              }}
            />
          </div>

          <button type="submit" className="hero-cta">
            Find My Products →
          </button>

          <button
            type="button"
            className="hero-cta"
            onClick={savePreferences}
          >
            Save My Preferences
          </button>

          <button
            type="button"
            className="clear-preferences-btn"
            onClick={clearPreferences}
          >
            Clear Saved Preferences
          </button>
        </form>

        {preferencesSaved && (
          <p className="preferences-status" role="status">
            Your shopping preferences are saved in this browser.
          </p>
        )}

        <div className="smartbuy-benefits">
          <article className="smartbuy-benefit">
            <span className="benefit-icon">✦</span>
            <h3>Personalized picks</h3>
            <p>Explore products matching your interests.</p>
          </article>

          <article className="smartbuy-benefit">
            <span className="benefit-icon">₹</span>
            <h3>Budget-aware shopping</h3>
            <p>Focus on products within your spending limit.</p>
          </article>

          <article className="smartbuy-benefit">
            <span className="benefit-icon">✓</span>
            <h3>Informed decisions</h3>
            <p>Review product options before choosing.</p>
          </article>
        </div>
      </section>

      <section id="categories">
        <h2 className="section-heading">Explore categories</h2>

        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/products/${cat.slug}`}
              className="category-tile"
            >
              <div className="category-tile-image">
                <img src={cat.image} alt={cat.label} />
              </div>

              <div className="category-tile-label">
                <h3>{cat.label}</h3>
                <p>{cat.tagline}</p>
                <span className="category-tile-link">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
