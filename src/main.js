import { createApp } from "vue";
import { createStore } from "vuex";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem("jwtToken");

  if (to.path === "/") {
    if (token && (await isValidToken(token)) === false)
      store.actions.logOutAction();
    next("/Main");
  } else if (to.path === "/Main") {
    if (token && (await isValidToken(token)) === false)
      store.actions.logOutAction();
    next();
  } else {
    if (token && (await isValidToken(token)) === false) {
      store.actions.logOutAction();
    }
    next();
  }
});

async function isValidToken(token) {
  try {
    const response = await fetch("http://localhost:8000/istokenvalid", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}

const store = createStore({
  state() {
    return {
      showLanding: localStorage.getItem("showLanding") || true,
      loggedIn: localStorage.getItem("loggedIn") || false,
      username: "",
      shoppingCart: {
        items: [],
        total: 0,
      },
      cardsInitialFetch: [],
      cardsFiltered: [],
      activeCard: [],
      pageStart: 0,
      pageEnd: 50,
      pageFirst: 0,
      pageFinal: 0,
      pageOfCards: [],
    };
  },
  mutations: {
    createPageFirstAndPageFinalMutation(state) {
      state.pageFinal = Math.ceil(state.cardsFiltered.length / 50);
      if (state.cardsFiltered.length !== 0) state.pageFirst = 1;
    },
    showLandingMutationTrue(state) {
      state.showLanding = true;
    },
    showLandingMutationFalse(state) {
      console.log("showLandingMutationFalse test");
      state.showLanding = false;
    },
    logInMutation(state) {
      state.loggedIn = true;
      localStorage.setItem("loggedIn", true);
    },
    logOutMutation(state) {
      state.loggedIn = false;
      localStorage.setItem("loggedIn", false);
    },
    resetCards(state) {
      state.cardsFiltered = state.cardsInitialFetch;
    },
    renderAPage(state) {
      state.pageOfCards = [];
      for (let i = state.pageStart; i < state.pageEnd; i++) {
        if (!state.cardsFiltered[i]) return;
        state.pageOfCards.push(state.cardsFiltered[i]);
      }
    },
    setActiveCard(state, itemName) {
      let card = state.cardsInitialFetch.find((i) => i.name === itemName);
      state.activeCard = [card];
    },
    pageRightMutation(state) {
      if (state.pageEnd >= state.cardsFiltered.length) return;
      state.pageStart += 50;
      state.pageEnd += 50;
      state.pageFirst += 1;
    },
    pageLeftMutation(state) {
      if (state.pageStart === 0) return;
      state.pageStart -= 50;
      state.pageEnd -= 50;
      if (state.pageFirst > 1) state.pageFirst -= 1;
    },
    addToCartMutation(state, card) {
      let item = state.shoppingCart.items.find((i) => i.name === card.name);

      if (item) {
        item.quantity += 1;
        state.shoppingCart.total += card.listPrice;
        updateLocalStorageShoppingCart(state.shoppingCart);
      } else {
        state.shoppingCart.items.push(card);
        state.shoppingCart.total += card.listPrice;
        updateLocalStorageShoppingCart(state.shoppingCart);
      }
    },
    deleteShoppingCart(state) {
      state.shoppingCart.items = [];
      state.shoppingCart.total = 0;
      updateLocalStorageShoppingCart(state.shoppingCart);
    },
    increaseQuantityMutation(state, card) {
      let item = state.shoppingCart.items.find((i) => i.name === card.name);

      if (item) {
        item.quantity += 1;
        state.shoppingCart.total += item.listPrice;
      }
      updateLocalStorageShoppingCart(state.shoppingCart);
    },
    decreaseQuantityMutation(state, card) {
      let item = state.shoppingCart.items.find((i) => i.name === card.name);

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          state.shoppingCart.total -= item.listPrice;
        } else {
          state.shoppingCart.items = state.shoppingCart.items.filter(
            (i) => i.name !== card.name
          );
          state.shoppingCart.total -= item.listPrice;
        }
      }
      updateLocalStorageShoppingCart(state.shoppingCart);
    },
    getCardsByCategoryMutation(state, category) {
      state.pageOfCards = [];
      state.cardsFiltered = state.cardsInitialFetch.filter(
        (i) => i.ProductCategoryName === category
      );
    },
    getCardsBySubcategoryMutation(state, category) {
      state.pageOfCards = [];
      state.cardsFiltered = state.cardsInitialFetch.filter(
        (i) => i.ProductSubcategoryName === category
      );
    },
    itemSearchMutation(state, itemSearchInput) {
      state.pageOfCards = [];
      state.cardsFiltered = state.cardsInitialFetch.filter((i) =>
        i.name.toLowerCase().includes(itemSearchInput.toLowerCase())
      );
    },
    resetPageStartPageEnd(state) {
      state.pageStart = 0;
      state.pageEnd = 50;
    },
    async editItemMutation(state, card) {
      console.log(card);

      try {
        const result = await fetch("http://127.0.0.1:8000/editItem", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(card),
        });
        let returnedResults = await result.json();
      } catch (err) {
        console.log(err);
      }
    },
  },
  actions: {
    logInAction({ commit }) {
      commit("logInMutation");
    },
    logOutAction({ commit }) {
      commit("logOutMutation");
    },
    showLandingActionTrue({ commit }) {
      commit("showLandingMutationTrue");
      console.log("showLandingActionTrue");
    },
    showLandingActionFalse({ commit }) {
      commit("showLandingMutationFalse");
      console.log("showLandingActionFalse");
    },
    async initialFetch({ commit }) {
      try {
        const result = await fetch("http://127.0.0.1:8000/initialFetch", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        let returnedResults = await result.json();
        this.state.cardsInitialFetch = returnedResults;
        this.state.cardsFiltered = returnedResults;
        commit("createPageFirstAndPageFinalMutation");
        commit("renderAPage");
      } catch (err) {
        console.log(err);
      }
    },
    itemSearchAction({ commit }, itemSearchInput) {
      commit("resetPageStartPageEnd");
      commit("itemSearchMutation", itemSearchInput);
      commit("renderAPage");
      commit("createPageFirstAndPageFinalMutation");
      commit("showLandingMutationFalse");
    },
    displayActiveCard({ commit }, itemName) {
      commit("setActiveCard", itemName);
    },
    pageRightAction({ commit }) {
      commit("pageRightMutation");
      commit("renderAPage");
    },
    pageLeftAction({ commit, state }) {
      if (state.pageStart === 0) return;
      commit("pageLeftMutation");
      commit("renderAPage");
    },
    addToCartAction({ commit }, card) {
      commit("addToCartMutation", card);
    },
    deleteShoppingCartAction({ commit }) {
      commit("deleteShoppingCart");
    },
    increaseQuantityAction({ commit }, name) {
      commit("increaseQuantityMutation", name);
    },
    decreaseQuantityAction({ commit }, name) {
      commit("decreaseQuantityMutation", name);
    },
    getCardsByCategoryAction({ commit }, category) {
      commit("resetPageStartPageEnd");
      commit("resetCards");
      commit("getCardsByCategoryMutation", category);
      commit("renderAPage");
      commit("createPageFirstAndPageFinalMutation");
      commit("showLandingMutationFalse");
    },
    getCardsBySubcategoryAction({ commit }, category) {
      commit("resetPageStartPageEnd");
      commit("resetCards");
      commit("getCardsBySubcategoryMutation", category);
      commit("renderAPage");
      commit("createPageFirstAndPageFinalMutation");
      commit("showLandingMutationFalse");
    },
    reloadInitialFetchAction({ commit }) {
      commit("resetCards");
      commit("resetPageStartPageEnd");
      commit("renderAPage");
      commit("createPageFirstAndPageFinalMutation");
    },
    createPageFirstAndPageFinalAction({ commit }) {
      commit("createPageFirstAndPageFinalMutation");
    },
    editItemAction({ commit }, card) {
      commit("editItemMutation", card);
    },
  },
  getters: {
    getLoggedInValue(state) {
      return state.loggedIn;
    },
    getShowLandingValue(state) {
      return state.showLanding;
    },
    getPageOfCardsLength(state) {
      return state.pageOfCards.length === 50;
    },
    getPageFirstAndPageFinal(state) {
      return [state.pageFirst, state.pageFinal];
    },
  },
});

function updateLocalStorageShoppingCart(shoppingCart) {
  let username = localStorage.getItem("username");
  let usernameCart = `${username}.shoppingCart`;
  localStorage.setItem(usernameCart, JSON.stringify(shoppingCart));
}

let username = localStorage.getItem("username");
let shoppingCart = JSON.parse(localStorage.getItem(`${username}.shoppingCart`));

if (shoppingCart) {
  store.state.shoppingCart = shoppingCart;
  console.log(shoppingCart);
}

createApp(App).use(router).use(store).mount("#app");
