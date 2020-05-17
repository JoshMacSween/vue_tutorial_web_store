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
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div v-for="(variant, index) in variants"
                :key="variant.variantId"
                class="color-box"
                :style="{ backgroundColor: variant.variantColor }"
                @mouseover="updateProduct(index)"
                >
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

          <div class="cart">
            <p>Cart ({{ cart }})</p>
          </div>

        </div>
      </div>
  `,
  // Data must be made into an object using data() { return {data} } for the vue compnent to work.
  data() {
    return {
      product: 'Socks',
      brand: "Vue Mastery",
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
      sizes: ["Small", "Medium", "Large"],
      cart: 0
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    removeFromCart() {
      this.cart -= 1
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
  }
})
var app = new Vue ({
  el: '#app',
  data: {
    premium: true // passes value to prop at line 3
  }
})
