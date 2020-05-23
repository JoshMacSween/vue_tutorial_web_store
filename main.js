var eventBus = new Vue()

Vue.component('product-tabs', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template:
  `<div>
    <span class="tab"
    :class="{ activeTab: selectedTab === tab}"
    v-for="(tab, index) in tabs"
    :key="index"
    @click="selectedTab = tab">
    {{ tab }}</span>

    <div v-show="selectedTab === 'Reviews'">
      <p v-if="!reviews.length">There are no reviews yet.</p>
      <ul v-else>
        <li v-for="(review, index) in reviews" :key="index">
        <p>{{ review.name }}</p>
        <p>Rating: {{ review.rating }}</p>
        <p>{{ review.review }}</p>
        </li>
      </ul>
    </div>

      <product-review v-show="selectedTab === 'Make a Review'"></product-review>

  </div>
  `,
  data() {
    return {
      tabs: ["Reviews", "Make a Review"],
      selectedTab: 'Reviews'
    }
  }
})

Vue.component('product-review', {
  template:`
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
      <b>Please correct the following error(s): </b>
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    <p>
      <label for="review">Review:</label>
      <textarea name="review" v-model="review" placeholder="review" >review</textarea>
    </p>
    <p>
      <label for='rating'>Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>
    <p>Would you recommend this product?</p>
    <label>
      Yes
      <input type="radio" value="yes" v-model="recommend"/>
      </label>

      <label>
        No
        <input type="radio" value="no" v-model="recommend"/>
      </label>

    <p>
      <input type="submit" value="Submit">
    </p>
  </form>
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommend: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          recommend: this.recommend,
          rating: this.rating
        }
        eventBus.$emit('review-submitted', productReview)
        this.name = null,
        this.review = null,
        this.rating = null,
        this.recommend = null
      }
      else {
        if(!this.name) this.errors.push("Name Required.")
        if(!this.review) this.errors.push("Review Required.")
        if(!this.rating) this.errors.push("Rating Required.")
        if(!this.recommend) this.errors.push("Recommendation Required.")
      }
      }

  }
})

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
    <div class="product">

        <div class="product-image">
          <img :src="image" />
        </div>
        <div class="product-info">
        <h1>{{ title }}</h1>
        <a :href="link" target="_blank">More products like this</a>
        <!-- <p v-if="inventory > 0">In Stock</p> -->
        <!-- <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out!</p> -->
        <p v-if="inStock">In Stock</p>
        <p v-else :class="{ outOfStock: !inStock}">Out of Stock</p>
        <p>{{sale}}</p>
        <p>Shipping: {{ shipping }}</p>
        <!--v-show is a more performant option, choosing to show it when varialbe is truthy, and when false, attaches a cs class of display:none -->

        <product-details :details="details"></product-details>

        <div v-for="(variant, index) in variants"
        :key="variant.variantId"
        class="color-box"
        :style="{ backgroundColor: variant.variantColor }"
        @mouseover="updateProduct(index)">
        </div>

        <div>
          <h3>Sizes</h3>
          <ul>
            <li v-for="size in sizes">{{ size }}</li>
          </ul>
        </div>

        <button v-on:click="addToCart"
        :disabled="!inStock"
        :class="{disabledButton: !inStock}">Add to Cart</button>
        <button v-on:click="removeFromCart">Remove From Cart</button>

        <product-tabs :reviews="reviews"></product-tabs>

      </div>
    </div>
  `,
  // Data must be made into an object using data() { return {data} } for the vue compnent to work.
  data() {
    return {
      product: 'Socks',
      brand: "Vue Mastery",
      reviews: [],
      selectedVariant: 0,
      link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
      inventory: 10,
      onSale: true,
      details: ["80% Cotton", "20% Polyester", "Gender Neutral"],
      variants: [{
          variantId: 2234,
          variantColor: "green",
          variantImage: 'vmSocks-green-onWhite.jpg',
          variantQuantity: 10,
        },

        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "vmSocks-blue-onWhite.jpg",
          variantQuantity: 0,
        }],
      sizes: ["Small", "Medium", "Large"]
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
    },
    removeFromCart() {
      this.$emit('take-from-cart', this.variants[this.selectedVariant].variantId)
    },
    updateProduct(index) {
      this.selectedVariant = index
      console.log(index)
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product
    },
    image() {
      return this.variants[this.selectedVariant].variantImage
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity
    },
    sale() {
      if (this.onSale) {
        return this.brand + " " + this.product + " are on sale"
      }
        return this.brand + " " + this.product + " are not on sale"
    },
    shipping() {
      if (this.premium) {
        return "Free"
      }
      return 2.99
    }
  },
  mounted() {
    eventBus.$on('review-submitted', productReview => {
      this.reviews.push(productReview)
    } )
  }
})
var app = new Vue ({
  el: '#app',
  data: {
    premium: true, // passes value to prop at line 3
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    updateCartRemove(id) {
      this.cart.pop(id)
    }
  }
})
