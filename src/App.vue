<script>
import Header from "./components/Header.vue";
import Dropdown from "./components/Dropdown.vue";
import { RouterView } from "vue-router";
if (import.meta.env) {
  let apiUrl = import.meta.env.VITE_APP_SERVER_URL;
  if (import.meta.env.VITE_APP_HOST_NAME == "LOCAL")
    apiUrl = import.meta.env.VITE_APP_LOCAL_URL;
}

export default {
  data() {
    return {
      tokenInterval: null,
    };
  },
  components: { RouterView, Header, Dropdown },
  methods: {
    async testFetch() {
      try {
        const result = await fetch(`${apiUrl}/testfetch`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        let returnedPayload = JSON.parse(result);
        console.log(returnedPayload);
      } catch (err) {
        console.log(err);
      }
    },
    async isTokenValid(token) {
      try {
        const response = await fetch(`${apiUrl}/istokenvalid`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("App.vue: isTokenValid() ");
          let returnedPayload = await response.json();
          console.log(returnedPayload);
          localStorage.setItem("jwtToken", token);
          return true;
        } else {
          console.log("App.vue.isTokenValid(): Token is invalid");

          this.$router.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    },
    async isTokenValidInterval() {
      const storedToken = localStorage.getItem("jwtToken");

      this.tokenInterval = setInterval(async () => {
        if (storedToken) {
          let boolean = await this.isTokenValid(storedToken);

          if (!boolean) {
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("username");
            this.$store.dispatch("logOutAction");
          }
        }
      }, 30000);
    },
    getLoggedInValueTest() {
      let testVal = this.$store.getters.getLoggedInValue;
      console.log(testVal);
    },
    redirect() {
      this.$router.push({ name: "Main" });
    },
    back() {
      this.$router.go(-1);
    },
    forward() {
      this.$router.go(+1);
    },
  },
  mounted() {
    this.isTokenValidInterval();
  },
  beforeDestroy() {
    clearInterval(this.tokenInterval);
  },
};
</script>

<template>
  <Header />
  <RouterView />
</template>

<style scoped></style>
