var app = new Vue ({
  el: '#app',
  data: {
    product: 'Socks',
    brand: "Vue Mastery",
    selectedVariant: 0,
    link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
    inventory: 10,
    sale: true,
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
    }
  }
})
