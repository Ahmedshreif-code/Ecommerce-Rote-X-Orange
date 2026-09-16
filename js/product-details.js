const productDetailsContainer =
    document.getElementById("product-details");


// Get Product ID From URL

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");


// API


const PRODUCT_API =
    `https://ecommerce.routemisr.com/api/v1/products/${productId}`;

const PRODUCTS_API =
    "https://ecommerce.routemisr.com/api/v1/products";


// Get Product

async function getProductDetails() {

    try {

        if (!productId) {
            throw new Error("Product ID not found");
        }

        const response = await fetch(PRODUCT_API);

        if (!response.ok) {
            throw new Error("Failed to fetch product");
        }

        const data = await response.json();

        const product = data.data;

        console.log(product);

        displayProduct(product);

        displayReviews(product.reviews);

        displayProductInfo(product);

        getRelatedProducts(product.category._id);

    } catch (error) {

        console.error(error);

        productDetailsContainer.innerHTML = `
      <div class="alert alert-danger">
        Failed to load product details.
      </div>
    `;

    }

}


// Display Product

function displayProduct(product) {

    const discount =
        product.priceAfterDiscount
            ? product.price - product.priceAfterDiscount
            : 0;


    productDetailsContainer.innerHTML = `

    <div class="row g-4">


      <div class="col-lg-5">

        <div class="product-gallery">

          <div class="main-image">

            <img
              id="main-product-image"
              src="${product.imageCover}"
              alt="${product.title}"
            >

          </div>


          <div class="thumbnail-container">

            ${product.images.map((image, index) => `

              <button
                class="thumbnail ${index === 0 ? "active" : ""}"
                onclick="changeImage('${image}', this)"
              >

                <img
                  src="${image}"
                  alt="${product.title}"
                >

              </button>

            `).join("")}

          </div>

        </div>

      </div>


      <div class="col-lg-7">

        <div class="product-content">

          <!-- Category -->
          <div class="mb-2">

            <span class="badge bg-success-subtle text-success">
              ${product.category.name}
            </span>

            <span class="badge bg-light text-secondary">
              ${product.brand.name}
            </span>

          </div>


          <!-- Title -->

          <h1 class="product-title">
            ${product.title}
          </h1>


          <!-- Rating -->

          <div class="rating mb-3">

            <span class="stars">
              ${createStars(product.ratingsAverage)}
            </span>

            <span class="rating-number">
              ${product.ratingsAverage}
              (${product.ratingsQuantity} reviews)
            </span>

          </div>


          <!-- Price -->

          <div class="product-price mb-3">

            ${product.priceAfterDiscount
            ? `
                  <span class="current-price">
                    ${product.priceAfterDiscount} EGP
                  </span>

                  <del>
                    ${product.price} EGP
                  </del>
                `
            : `
                  <span class="current-price">
                    ${product.price} EGP
                  </span>
                `
        }

          </div>


          <!-- Stock -->

          <div class="mb-4">

            ${product.quantity > 0
            ? `
                  <span class="stock-badge">
                    <i class="fa-solid fa-circle"></i>
                    In Stock
                  </span>
                `
            : `
                  <span class="out-stock-badge">
                    Out of Stock
                  </span>
                `
        }

          </div>


          <!-- Description -->

          <p class="product-description">

            ${formatDescription(product.description)}

          </p>


          <hr>


          <!-- Quantity -->

          <div class="quantity-section">

            <label>
              Quantity
            </label>

            <div class="quantity-box">

              <button
                onclick="decreaseQuantity()"
              >
                <i class="fa-solid fa-minus"></i>
              </button>

              <span id="quantity">
                1
              </span>

              <button
                onclick="increaseQuantity(${product.quantity})"
              >
                <i class="fa-solid fa-plus"></i>
              </button>

            </div>

            <small>
              ${product.quantity} available
            </small>

          </div>


          <!-- Total -->

          <div class="total-price">

            <span>
              Total Price:
            </span>

            <strong id="total-price">
              ${product.price} EGP
            </strong>

          </div>


          <!-- Buttons -->

          <div class="action-buttons">

            <button
              class="btn btn-success"
              onclick="addToCart('${product._id}')"
            >

              <i class="fa-solid fa-cart-shopping"></i>

              Add to Cart

            </button>


            <button class="btn btn-dark">

              <i class="fa-solid fa-bolt"></i>

              Buy Now

            </button>

          </div>


          <!-- Wishlist -->

          <button class="wishlist-btn">

            <i class="fa-regular fa-heart"></i>

            Add to Wishlist

          </button>


          <!-- Features -->

          <div class="delivery-features">

            <div>

              <i class="fa-solid fa-truck"></i>

              <div>
                <strong>Free Delivery</strong>
                <small>Orders over 500 EGP</small>
              </div>

            </div>


            <div>

              <i class="fa-solid fa-rotate-left"></i>

              <div>
                <strong>30 Days Return</strong>
                <small>Money back</small>
              </div>

            </div>


            <div>

              <i class="fa-solid fa-shield"></i>

              <div>
                <strong>Secure Payment</strong>
                <small>100% Protected</small>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  `;


    // Breadcrumb

    document.getElementById("breadcrumb-category").textContent =
        product.category.name;

    document.getElementById("breadcrumb-title").textContent =
        product.title;


    // Product information

    document.getElementById("product-description").textContent =
        formatDescription(product.description);

}


// Change Main Image

function changeImage(image, element) {

    document.getElementById("main-product-image").src = image;


    document
        .querySelectorAll(".thumbnail")
        .forEach(thumbnail => {

            thumbnail.classList.remove("active");

        });


    element.classList.add("active");
}


// Quantity

let currentQuantity = 1;


function increaseQuantity(maxQuantity) {

    if (currentQuantity < maxQuantity) {

        currentQuantity++;

        updateQuantity();

    }

}


function decreaseQuantity() {

    if (currentQuantity > 1) {

        currentQuantity--;

        updateQuantity();

    }

}


function updateQuantity() {

    document.getElementById("quantity").textContent =
        currentQuantity;

}


// Stars

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


// Description

function formatDescription(description) {

    return description
        .replace(/\t/g, " • ")
        .replace(/\n/g, " ");
}


// Product Information

function displayProductInfo(product) {

    document.getElementById("info-category").textContent =
        product.category.name;

    document.getElementById("info-subcategory").textContent =
        product.subcategory?.[0]?.name || "N/A";

    document.getElementById("info-brand").textContent =
        product.brand.name;

    document.getElementById("info-sold").textContent =
        `${product.sold} sold`;

}


// Reviews

function displayReviews(reviews = []) {

    document.getElementById("reviews-count").textContent =
        reviews.length;


    const container =
        document.getElementById("reviews-container");


    if (!reviews.length) {

        container.innerHTML = `
      <p class="text-muted">
        No reviews yet.
      </p>
    `;

        return;

    }


    container.innerHTML = reviews.map(review => `

    <div class="review-item">

      <div class="d-flex justify-content-between">

        <strong>
          ${review.user.name}
        </strong>

        <span class="text-warning">

          ${createStars(review.rating)}

        </span>

      </div>

      <p class="text-muted mb-0 mt-2">
        ${review.review || "No comment"}
      </p>

    </div>

  `).join("");

}


// Related Products

async function getRelatedProducts(categoryId) {

    try {

        const response = await fetch(
            `${PRODUCTS_API}?category=${categoryId}`
        );

        if (!response.ok) return;

        const data = await response.json();

        const relatedProducts =
            data.data
                .filter(product => product._id !== productId)
                .slice(0, 5);


        displayRelatedProducts(relatedProducts);

    } catch (error) {

        console.error(error);

    }

}


function displayRelatedProducts(products) {

    const container =
        document.getElementById("related-products");


    container.innerHTML = products.map(product => `
    <div class="col-12 col-md-4 col-lg-3">

      

        <div class="card related-card h-100 border-0 shadow-sm">

          <img
            src="${product.imageCover}"
            class="card-img-top"
            alt="${product.title}"
          >

          <div class="card-body">

            <small class="text-muted">
              ${product.category.name}
            </small>
<a
        href="product-details.html?id=${product._id}"
        class="text-decoration-none text-dark"
      >
            <h6 class="mt-2">
              ${product.title}
            </h6>
      </a>


            <div class="text-warning small">

              ${createStars(product.ratingsAverage)}

            </div>

            <strong class="d-block mt-2">
              ${product.price} EGP
            </strong>

          </div>

        </div>


    </div>


  `).join("");

}


// Add To Cart

function addToCart(productId) {

    console.log("Add product:", productId);


}


getProductDetails();