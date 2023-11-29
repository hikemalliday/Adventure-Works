<script>
export default {
  data() {
    return {
      shoppingCart: "",
      loggedIn: "",
      admin: false,
      edit: false,
    };
  },
  methods: {
    addToCart(card) {
      this.loggedIn = this.$store.getters.getLoggedInValue;
      if (this.loggedIn === false) this.$router.push("/login");
      let username = localStorage.getItem("username");
      if (!card.quantity) {
        card = { ...card, quantity: 1 };
      }
      card = { ...card, username: username };
      this.$store.dispatch("addToCartAction", card);
    },
    editItem(card) {
      this.$store.dispatch("editItemAction", card);
    },
  },
  mounted() {
    let username = localStorage.getItem("username");
    this.admin = localStorage.getItem(`${username}.admin`);
    if (this.admin === "true") this.admin = true;
    if (this.admin === "false") this.admin = false;
  },
};
</script>

<template>
  <div
    @click="console.log(card)"
    v-for="(card, index) in this.$store.state.activeCard"
  >
    <div v-if="card.ProductCategoryID == 1">
      <img
        src="../../assets/pics/bike.jpg"
        alt="card image"
        class="w-40 h-40 mr-2"
      />
    </div>
    <div v-if="card.ProductCategoryID == 2">
      <img
        src="../../assets/pics/Components.jpg"
        alt="card image"
        class="w-40 h-40 mr-2"
      />
    </div>
    <div v-if="card.ProductCategoryID == 3">
      <img
        src="../../assets/pics/Clothing.jpg"
        alt="card image"
        class="w-40 h-40 mr-2"
      />
    </div>
    <div v-if="card.ProductCategoryID == 4">
      <img
        src="../../assets/pics/Accessories.jpg"
        alt="card image"
        class="w-40 h-40 mr-2"
      />
    </div>
    <div v-if="card.ProductCategoryID == 5">
      <img
        src="../../assets/pics/Components.jpg"
        alt="card image"
        class="w-40 h-40 mr-2"
      />
    </div>
    <div v-if="card.name" class="flex">
      {{ card.name }}

      <div v-if="edit === true">
        <input
          @keyup.enter="editItem(card)"
          v-model="card.name"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
          style="max-height: 10px"
        />
      </div>
      <svg
        v-if="admin === true"
        @click="this.edit = !this.edit"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
      <!-- <div
        v-if="admin === true"
        @click="edit = !edit"
        class="ml-1 hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        EDIT
      </div> -->
    </div>

    <div v-if="card.ProductSubcategoryName" class="flex">
      Category:
      <div>
        {{ card.ProductSubcategoryName }}
      </div>
    </div>
    <div v-if="card.color" class="flex">
      Color:
      <div v-if="edit === false">{{ card.color }}</div>
      <div v-if="edit === true">
        <input
          @keyup.enter="editItem(card)"
          v-model="card.color"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
          style="max-height: 10px"
        />
      </div>
    </div>
    <div v-if="card.listPrice" class="flex">
      Price:

      <div v-if="edit === false && String(card.listPrice).includes('.')">
        ${{ card.listPrice }}
      </div>
      <div v-else-if="edit === false">${{ card.listPrice }}.00</div>

      <div v-if="edit === true">
        <input
          @keyup.enter="editItem(card)"
          v-model="card.listPrice"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
          style="max-height: 10px"
        />
      </div>

      <!-- <div
        v-if="admin === true"
        @click="edit = !edit"
        class="ml-1 hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        EDIT
      </div> -->
    </div>
    <div v-if="card.size" class="flex">
      Size:

      <div v-if="edit === false">
        {{ card.size }}
      </div>

      <!-- <div
        v-if="admin === true"
        @click="edit = !edit"
        class="ml-1 hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        EDIT
      </div> -->

      <div v-if="edit === true">
        <input
          @keyup.enter="editItem(card)"
          v-model="card.size"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
          style="max-height: 10px"
        />
      </div>
    </div>
    <div v-if="card.description" class="flex">
      Description:
      <div v-if="edit === false">
        {{ card.description }}
      </div>
      <div v-if="edit === true">
        <input
          @keyup.enter="editItem(card)"
          v-model="card.description"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
          style="max-height: 10px"
        />
      </div>
      <!-- <div
        v-if="admin === true"
        @click="edit = !edit"
        class="ml-1 hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        EDIT
      </div> -->
    </div>
    <div v-if="card.quantity" class="flex">
      Quantity in stock:
      <div v-if="edit === false">
        {{ card.quantity }}
      </div>
      <div v-if="edit === true">
        <input
          @keyup.enter="editItem(card)"
          v-model="card.quantity"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
          style="max-height: 10px"
        />
      </div>
      <!-- <div
        v-if="admin === true"
        @click="edit = !edit"
        class="ml-1 hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        EDIT
      </div> -->
    </div>

    <button
      @click="addToCart(card)"
      class="mt-2 ml-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-1 px-3 rounded-sm text-xs active:text-sky-200"
    >
      Add To Cart
    </button>
  </div>
</template>
