<script>
import Dropdown from "./Dropdown.vue";

export default {
  name: "Header",
  props: [],
  components: {
    Dropdown,
  },
  data() {
    return {
      loggedIn: JSON.parse(localStorage.getItem("loggedIn")) || false,
      itemSearchInput: "",
      showBikesMenu: false,
      showComponentsMenu: false,
      showClothingMenu: false,
      showAccessoriesMenu: false,
      showMiscMenu: false,
      bikeCategories: ["Mountain Bikes", "Road Bikes", "Touring Bikes"],
      componentCategories: [
        "Handlebars",
        "Bottom Brackets",
        "Brakes",
        "Chains",
        "Cranksets",
        "Derailleurs",
        "Forks",
        "Headsets",
        "Mountain Frames",
        "Pedals",
        "Road Frames",
        "Saddles",
        "Touring Frames",
        "Wheels",
      ],
      clothingCategories: [
        "Bib-Shorts",
        "Caps",
        "Gloves",
        "Jerseys",
        "Shorts",
        "Socks",
        "Tights",
        "Vests",
      ],
      accessoryCategories: [
        "Bike Racks",
        "Bike Stands",
        "Bottles and Cages",
        "Cleaners",
        "Fenders",
        "Helmets",
        "Hydration Packs",
        "Lights",
        "Locks",
        "Panniers",
        "Pumps",
        "Tires and Tubes",
      ],
      miscCategories: ["Hardware"],
    };
  },
  methods: {
    redirect() {
      this.$router.push({ name: "Main" });
      this.$store.dispatch("showLandingActionTrue");
    },
    reloadInitialFetch() {
      this.$store.dispatch("reloadInitialFetchAction");
    },
    async logOut() {
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("username");
      this.$store.dispatch("logOutAction");
      this.$router.push("/Main");
    },
    toggleMenu(category) {
      this[`show${category}Menu`] = !this[`show${category}Menu`];
      let menus = ["Bikes", "Components", "Clothing", "Accessories", "Misc"];
      for (let i = 0; i < menus.length; i++) {
        if (menus[i] === category) continue;
        if (this[`show${menus[i]}Menu`] === true)
          this[`show${menus[i]}Menu`] = false;
      }
    },
    closeAllDropdowns(e) {
      let menus = ["Bikes", "Components", "Clothing", "Accessories", "Misc"];
      if (!this.$refs.dropdown.contains(e.target)) {
        for (let i = 0; i < menus.length; i++) {
          if (this[`show${menus[i]}Menu`] === true)
            this[`show${menus[i]}Menu`] = false;
        }
      }
    },
    getCardsByCategory(category) {
      if (this.$route.name !== "Main") {
        this.$router.push({ name: "Main" });
      }

      this.$store.dispatch("getCardsByCategoryAction", category);
      this.$store.dispatch("showLandingActionFalse");
    },
    getCardsBySubcategory(category) {
      if (this.$route.name !== "Main") {
        this.$router.push({ name: "Main" });
      }

      this.$store.dispatch("getCardsBySubcategoryAction", category);
      this.$store.dispatch("showLandingActionFalse");
    },
  },
  computed: {},
  watch: {
    "$store.getters.getLoggedInValue"(newValue, oldValue) {
      if (newValue === true) {
        this.loggedIn = true;
        console.log("watch this.loggedIn = true");
      } else if (newValue === false) {
        this.loggedIn = false;
        console.log("watch this.loggedIn = false");
      }
    },
  },
  mounted() {
    window.addEventListener("click", this.closeAllDropdowns);
    this.loggedIn = this.$store.getters.getLoggedInValue;
    console.log("mounted loggedIn debug value: ", this.loggedIn);
  },
};
</script>

<template>
  {{ console.log(this.$store.state.cardsFiltered) }}
  <div
    class="fixed top-0 left-0 right-0 bg-white shadow-md flex justify-between p-4 z-20"
  >
    <div class="flex">
      <div
        @click="redirect(), reloadInitialFetch()"
        class="text-1xl hover:text-sky-700 cursor-pointer active:text-sky-200"
        style="white-space: nowrap"
      >
        A D V E N T U R E W O R K S
      </div>
    </div>
    <input
      @keyup.enter="
        this.$store.dispatch('itemSearchAction', this.itemSearchInput)
      "
      v-model="itemSearchInput"
      type="text"
      class="max-h-2 mt-1 ml-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
    />

    <div class="flex justify-end space-x-4">
      <div>
        <router-link
          to="/shoppingCart"
          class="ml-3 font-normal text-black text-1xl hover:text-sky-700 cursor-pointer active:text-sky-200"
        >
          Cart
        </router-link>
      </div>

      <div>|</div>

      <div>
        <router-link
          to="/about"
          class="mr-3 font-normal text-black focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
        >
          About
        </router-link>
      </div>
      |
      <div
        v-if="loggedIn === true"
        @click="logOut"
        class="font-normal focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer whitespace-nowrap"
      >
        SIGN OUT
      </div>
      <div
        v-else
        @click="this.$router.push('/login')"
        class="font-normal focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer whitespace-nowrap"
      >
        SIGN IN
      </div>
    </div>
  </div>

  <div class="flex justify-start mt-16" ref="dropdown">
    <div class="mr-5">
      <div
        @click="toggleMenu('Bikes'), getCardsByCategory('Bikes')"
        class="hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        Bikes
      </div>
      <ul v-if="showBikesMenu" class="bg-white absolute z-10">
        <li
          @click="getCardsBySubcategory(bikeCategory)"
          v-for="bikeCategory in bikeCategories"
          class="hover:text-sky-700 cursor-pointer active:text-sky-200 hover:bg-gray-100"
          style="font-size: 0.92em"
        >
          {{ bikeCategory }}
        </li>
      </ul>
    </div>
    <div class="mr-5">
      <div
        @click="toggleMenu('Components'), getCardsByCategory('Components')"
        class="hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        Components
      </div>
      <ul
        v-if="showComponentsMenu"
        class="absolute z-10"
        style="background-color: rgb(255, 255, 255)"
      >
        <li
          @click="getCardsBySubcategory(componentCategory)"
          v-for="componentCategory in componentCategories"
          class="hover:text-sky-700 cursor-pointer active:text-sky-200 hover:bg-gray-100"
          style="font-size: 0.92em"
        >
          {{ componentCategory }}
        </li>
      </ul>
    </div>
    <div class="mr-5">
      <div
        @click="toggleMenu('Clothing'), getCardsByCategory('Clothing')"
        class="hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        Clothing
      </div>
      <ul
        v-if="showClothingMenu"
        class="absolute z-10"
        style="background-color: rgb(255, 255, 255)"
      >
        <li
          @click="getCardsBySubcategory(clothingCategory)"
          v-for="clothingCategory in clothingCategories"
          class="hover:text-sky-700 cursor-pointer active:text-sky-200 hover:bg-gray-100"
          style="font-size: 0.92em"
        >
          {{ clothingCategory }}
        </li>
      </ul>
    </div>
    <div class="mr-5">
      <div
        @click="toggleMenu('Accessories'), getCardsByCategory('Accessories')"
        class="hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        Accessories
      </div>
      <ul
        v-if="showAccessoriesMenu"
        class="absolute z-10"
        style="background-color: rgb(255, 255, 255)"
      >
        <li
          @click="getCardsBySubcategory(accessoryCategory)"
          v-for="accessoryCategory in accessoryCategories"
          class="hover:text-sky-700 cursor-pointer active:text-sky-200 hover:bg-gray-100"
          style="font-size: 0.92em"
        >
          {{ accessoryCategory }}
        </li>
      </ul>
    </div>
    <div class="mr-5">
      <div
        @click="toggleMenu('Misc'), getCardsByCategory('Misc')"
        class="hover:text-sky-700 cursor-pointer active:text-sky-200"
      >
        Misc
      </div>
      <ul
        v-if="showMiscMenu"
        class="absolute z-10"
        style="background-color: rgb(255, 255, 255)"
      >
        <li
          @click="getCardsBySubcategory(miscCategory)"
          v-for="miscCategory in miscCategories"
          class="hover:text-sky-700 cursor-pointer active:text-sky-200 hover:bg-gray-100"
          style="font-size: 0.92em"
        >
          {{ miscCategory }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.sub-menu {
  background-color: beige;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  border-radius: 0px 0px 16px 16px;
}
</style>
