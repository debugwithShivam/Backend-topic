import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const FALLBACK_IMAGE =
  "https://picsum.photos/seed/product/600/400";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, options);

  const body = await response.json();

  if (!response.ok) {
    throw new Error(
      body.message || "Something went wrong."
    );
  }

  return body;
}

async function getCategories() {
  return request("/categories");
}

async function getProducts({ queryKey, signal }) {
  const [, { search, category }] = queryKey;

  const params = new URLSearchParams();

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (category) {
    params.set("category", category);
  }

  return request(`/products?${params.toString()}`, {
    signal,
  });
}

async function createProduct(product) {
  return request("/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}

export default function App() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [message, setMessage] = useState("");

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const {
    data: products = [],
    isLoading: productsLoading,
    isFetching: productsFetching,
    error: productsError,
  } = useQuery({
    queryKey: [
      "products",
      {
        search,
        category,
      },
    ],
    queryFn: getProducts,
    placeholderData: (previousData) => previousData,
  });

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    
    onMutate: () => {
      setMessage("Adding product...");
    },

    onSuccess: async (product) => {
      setMessage(
        `“${product.name}” was added successfully.`
      );

   
      setCategory(product.category);

  
      
      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      setMessage(error.message);
    },
  });

  async function addProduct(event) {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const productData = {
      name: formData.get("name"),
      price: Number(formData.get("price")),
      category: formData.get("category"),
      description: formData.get("description"),
      image: formData.get("image"),
    };

    addProductMutation.mutate(productData);

    form.reset();
  }

  const loading =
    categoriesLoading || productsLoading;

  const error =
    categoriesError?.message ||
    productsError?.message;

  return (
    <>
      <header>
        <a className="brand" href="#top">
          Cartly
        </a>

        <span>
          Simple everyday shopping
        </span>
      </header>

      <main id="top">
        <section className="hero">
          <p>CURATED FOR YOU</p>

          <h1>
            Find something
            <br />
            you’ll love.
          </h1>

          <p className="subtext">
            Browse products, filter by category,
            or add your own item to the shop.
          </p>
        </section>

        <section
          className="toolbar"
          aria-label="Product filters"
        >
          <input
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
          />

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
            aria-label="Filter by category"
          >
            <option value="">
              All categories
            </option>

            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </section>

        {!loading && !error && (
          <p className="count">
            {products.length} product
            {products.length === 1 ? "" : "s"} found

            {productsFetching && (
              <span> Updating...</span>
            )}
          </p>
        )}

        <section
          className="products"
          aria-live="polite"
        >
          {loading && (
            <p>
              Loading products...
            </p>
          )}

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          {!loading &&
            !error &&
            (products.length ? (
              products.map((product) => (
                <article
                  className="card"
                  key={product._id}
                >
                  <img
                    src={
                      product.image ||
                      FALLBACK_IMAGE
                    }
                    alt={product.name}
                  />

                  <div>
                    <span>
                      {product.category}
                    </span>

                    <h3>
                      {product.name}
                    </h3>

                    <p>
                      {product.description}
                    </p>

                    <strong>
                      ₹
                      {Number(
                        product.price
                      ).toLocaleString("en-IN")}
                    </strong>
                  </div>
                </article>
              ))
            ) : (
              <p>
                No products match your search.
              </p>
            ))}
        </section>

        <section className="add-product">
          <div>
            <p>SELL WITH US</p>

            <h2>
              Add a product
            </h2>

            <p>
              Create a new product and
              choose its category.
            </p>
          </div>

          <form onSubmit={addProduct}>
            <label>
              Name

              <input
                name="name"
                required
                maxLength="100"
              />
            </label>

            <label>
              Price (₹)

              <input
                name="price"
                type="number"
                min="0"
                required
              />
            </label>

            <label>
              Category

              <select
                name="category"
                required
                defaultValue=""
              >
                <option value="">
                  Select a category
                </option>

                {categories.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Description

              <textarea
                name="description"
                required
                maxLength="300"
              />
            </label>

            <label>
              Image URL

              <input
                name="image"
                type="url"
                placeholder="https://... (optional)"
              />
            </label>

            <button
              type="submit"
              disabled={
                addProductMutation.isPending
              }
            >
              {addProductMutation.isPending
                ? "Adding product..."
                : "Add product"}
            </button>

            <p
              id="message"
              role="status"
            >
              {message}
            </p>
          </form>
        </section>
      </main>
    </>
  );
}