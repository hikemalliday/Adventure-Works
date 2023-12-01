<script>
import Landing from "./Landing.vue";
export default {
  components: {
    Landing,
  },
  data() {
    return {
      pageOfCardsLength: false,
      showLanding: this.$store.getters.getShowLandingValue,
    };
  },
  methods: {
    displayActiveCard(itemName) {
      this.$router.push({ name: "activeCard" });
      this.$store.dispatch("displayActiveCard", itemName);
    },
  },
  watch: {
    "$store.getters.getPageOfCardsLength"(newValue, oldValue) {
      if (newValue === true) this.getPageOfCardsLength = true;
      else if (newValue === false) this.getPageOfCardsLength = false;
    },
    "$store.getters.getShowLandingValue"(newValue, oldValue) {
      if (newValue === true) this.showLanding = true;
      else if (newValue === false) this.showLanding = false;
    },
  },
  computed: {
    pageFirst() {
      return this.$store.getters.getPageFirstAndPageFinal[0];
    },
    pageFinal() {
      return this.$store.getters.getPageFirstAndPageFinal[1];
    },
  },
  mounted() {
    this.$store.dispatch("initialFetch");
    if (this.pageOfCardsLength) this.showLanding = false;
  },
};
</script>

<template>
  <div v-if="showLanding">
    <Landing />
  </div>
  <div v-else>
    <div class="flex justify-center items-center">
      <div
        v-if="pageFirst !== 1"
        class="text-3xl hover:text-sky-700 cursor-pointer active:text-sky-200"
        @click="this.$store.dispatch('pageLeftAction')"
      >
        &lt;
      </div>
      -
      <div>page {{ pageFirst }} / {{ pageFinal }}</div>
      -
      <div
        v-if="this.$store.getters.getPageOfCardsLength"
        class="text-3xl hover:text-sky-700 cursor-pointer active:text-sky-200"
        @click="this.$store.dispatch('pageRightAction')"
      >
        >
      </div>
    </div>
    <div class="flex flex-wrap">
      <div
        @click="displayActiveCard(product.name)"
        class="flex items-center flex-col p-2 rounded"
        v-for="(product, index) in this.$store.state.pageOfCards"
        :key="index"
      >
        <div v-if="product.ProductCategoryID == 1">
          <img
            src="../../public/pics/bike.jpg"
            alt="card image"
            class="w-40 h-40 mr-2"
          />
        </div>
        <div v-if="product.ProductCategoryID == 2">
          <img
            src="../../public/pics/Components.jpg"
            alt="card image"
            class="w-40 h-40 mr-2"
          />
        </div>
        <div v-if="product.ProductCategoryID == 3">
          <img
            src="../../public/pics/Clothing.jpg"
            alt="card image"
            class="w-40 h-40 mr-2"
          />
        </div>
        <div v-if="product.ProductCategoryID == 4">
          <img
            src="../../public/pics/Accessories.jpg"
            alt="card image"
            class="w-40 h-40 mr-2"
          />
        </div>
        <div v-if="product.ProductCategoryID == 5">
          <img
            src="../../public/pics/Components.jpg"
            alt="card image"
            class="w-40 h-40 mr-2"
          />
        </div>
        <div>
          {{ product.name }}
        </div>
      </div>
    </div>
  </div>
</template>
