
// Category api

const CATEGORIES_API =
    "https://ecommerce.routemisr.com/api/v1/categories";

const categoriesContainer =
    document.getElementById("categories-container");


async function getCategories() {
    try {

        const response = await fetch(CATEGORIES_API);

        if (!response.ok) {
            throw new Error("Failed to fetch categories");
        }

        const data = await response.json();


        displayCategories(data.data);

    } catch (error) {

        console.error("Error:", error);

        categoriesContainer.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger">
          Failed to load categories.
        </div>
      </div>
    `;
    }
}


function displayCategories(categories) {

    let categoriesHTML = "";

    categories.forEach(category => {

        categoriesHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-2">

        <div class="card text-center p-3 border-0 shadow h-100">

          <img
            src="${category.image}"
            alt="${category.name}"
            class="category-img mx-auto rounded-circle w-25 h-25"
          />

          <p class="mb-0 mt-2">
            ${category.name}
          </p>

        </div>

      </div>
    `;
    });

    categoriesContainer.innerHTML = categoriesHTML;
}


getCategories();



// all Products


const API_URL = "https://ecommerce.routemisr.com/api/v1/products";

const productsContainer = document.getElementById("products-container");


async function getProducts() {
    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = await response.json();


        displayProducts(data.data);

    } catch (error) {

        console.error("Error:", error);

        productsContainer.innerHTML = `
            <div class="col-12">
                <div class="alert alert-danger">
                    Failed to load products.
                </div>
            </div>
        `;
    }
}


function displayProducts(products) {

    let productsHTML = "";

    products.forEach(product => {

        productsHTML += `
  <div class="col-12 col-md-6 col-lg-3">

    <div class="card product-card border-0 shadow-sm rounded-3 h-100">

      <div class="position-relative">

        <img
          src="${product.imageCover}"
          class="card-img-top product-img w-75 ms-3"
          alt="${product.title}"
        />

        <div
          class="position-absolute top-0 end-0 d-flex flex-column gap-3 p-3"
        >

          <i
            class="fa-regular fa-heart fa-canvas-roomy shadow rounded-circle p-2"
          ></i>

          <i
            class="fa-solid fa-arrows-rotate fa-canvas-roomy shadow rounded-circle p-2"
          ></i>

          <i
            class="fa-solid fa-eye fa-canvas-roomy shadow rounded-circle p-2"
          ></i>

        </div>

      </div>


      <div class="card-body position-relative">

        <small class="text-muted d-block mb-1">
          ${product.category.name}
        </small>


        <a
          href="./product-details.html?id=${product._id}"
          class="product-title-link text-decoration-none text-dark"
        >
          ${product.title}
        </a>


        <div class="d-flex align-items-center gap-2 mb-3 mt-2">

          <div class="text-warning">
            ${createStars(product.ratingsAverage)}
          </div>

          <small class="text-muted">
            ${product.ratingsAverage}
            (${product.ratingsQuantity})
          </small>

        </div>


        <div class="d-flex justify-content-between align-items-center">

          <div>
            ${product.priceAfterDiscount
                ? `
                  <span class="fw-bold">
                    ${product.priceAfterDiscount} EGP
                  </span>

                  <del class="text-muted ms-1 small">
                    ${product.price} EGP
                  </del>
                `
                : `
                  <span class="fw-bold">
                    ${product.price} EGP
                  </span>
                `
            }
          </div>

            <button
            type="button"
            class="btn btn-success rounded-circle  p-2 add-to-cart-btn"
              
            >
                <i
                    class="fa-solid fa-plus bg-success rounded-circle text-white fa-canvas-roomy"
                ></i>
            </button>
         

        </div>

      </div>

    </div>

  </div>
`;
    });

    productsContainer.innerHTML = productsHTML;
}


// Create Rating Stars

function createStars(rating) {

    let stars = "";

    const roundedRating = Math.round(rating);

    for (let i = 1; i <= 5; i++) {

        if (i <= roundedRating) {

            stars += `
                <i class="fa-solid fa-star"></i>
            `;

        } else {

            stars += `
                <i class="fa-regular fa-star"></i>
            `;

        }
    }

    return stars;
}


// Start Application

getProducts();


