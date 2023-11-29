<script>
export default {
  names: "Login",
  data() {
    return {
      username: "",
      password: "",
      admin: true,
      createUsername: "",
      createPassword: "",
      createUsernameAndPasswordModal: false,
      adminCheckbox: false,
    };
  },
  methods: {
    async createUsernameAndPassword() {
      let body = {
        username: this.createUsername,
        password: this.createPassword,
        admin: this.admin,
      };
      try {
        const result = await fetch(
          "http://localhost:8000/createusernameandpassword",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );
        let returnedUsernameAndPassword = await result.json();
        console.log(returnedUsernameAndPassword);

        if (
          "username" in returnedUsernameAndPassword &&
          "password" in returnedUsernameAndPassword
        ) {
          this.createUsernameAndPasswordModal = false;
          console.log("createUsernameAndPassword debug testing:");
          this.login(this.createUsername, this.createPassword);
        }
      } catch (err) {
        console.log(err);
      }
    },

    async isTokenValid(token) {
      try {
        const response = await fetch("http://localhost:8000/istokenvalid", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          console.log("Token is valid");
          return true;
        } else {
          console.log("Token is invalid");
          return false;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async login(username = null, password = null) {
      let token = "";
      let body = null;

      if (!username || !password) {
        body = { username: this.username, password: this.password };
      } else if (username && password) {
        body = { username: username, password: password };
      }
      try {
        const result = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        let returnedPayload = await result.json();
        token = returnedPayload.token;
        this.admin = returnedPayload.admin;
        if (this.admin === true)
          localStorage.setItem(`${this.username}.admin`, true);
        else localStorage.setItem(`${this.username}.admin`, false);
        localStorage.removeItem("jwtToken");
        localStorage.setItem("jwtToken", token);
        const storedToken = localStorage.getItem("jwtToken");

        if (storedToken) {
          let boolean = this.isTokenValid(storedToken);
          if (boolean) {
            this.$router.push("/Main");
            localStorage.setItem("username", this.username);

            this.$store.dispatch("logInAction");
          }
        } else console.log("Login.vue: Token not found.");
      } catch (err) {
        console.log(err);
      }
    },
    getLoggedInStatus() {
      console.log(this.$store.getters.getLoggedInValue);
    },
  },
};
</script>

<template>
  <div class="flex justify-between ...">
    <div class="flex flex-row"></div>

    <div class="flex items-end ..."></div>
  </div>
  <div class="flex justify-center">
    <div class="bg-white rounded-lg shadow-md p-4">
      <div class="flex justify-center">
        <div
          class="mt-10 text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200"
        >
          LOGIN
        </div>
      </div>

      <div class="my-2 flex justify-center">
        <input
          required
          @keyup.enter="login()"
          placeholder="username"
          type="text"
          v-model="this.username"
          class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
        />
      </div>

      <div class="my-2 flex justify-center">
        <input
          required
          @keyup.enter="login()"
          placeholder="password"
          type="password"
          v-model="this.password"
          class="max-w-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
        />
      </div>

      <div class="flex justify-start">
        <button
          @click="login()"
          class="ml-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-1 px-3 rounded-sm text-xs active:text-sky-200"
        >
          Submit
        </button>
      </div>
      <div
        @click="createUsernameAndPasswordModal = true"
        class="text-xs px-1 focus:text-sky-400 active:text-sky-200 hover:text-sky-700 cursor-pointer"
      >
        SIGN UP
      </div>
    </div>
  </div>

  <!-- CREATE Username and password modal: -->
  <teleport to="body">
    <transition name="modal">
      <div
        class="modal-bg"
        v-if="createUsernameAndPasswordModal"
        @mousedown="createUsernameAndPasswordModal = false"
      >
        <div class="modal" @mousedown.stop>
          <div class="rounded-t-md mb-3 bg-cyan-900 text-white text-center">
            ENTER USERNAME AND PASS:
          </div>
          <div>USERNAME:</div>
          <input
            @keyup.enter="createUsernameAndPassword()"
            v-model="createUsername"
            placeholder="username"
            type="text"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
          />
          <div>PASSWORD:</div>
          <input
            @keyup.enter="createUsernameAndPassword()"
            v-model="createPassword"
            placeholder="password"
            type="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:focus:border-blue-500"
          />
          <div>
            <input type="checkbox" id="adminCheckbox" v-model="adminCheckbox" />
            ADMIN
          </div>
          <button
            @click="createUsernameAndPassword()"
            class="mt-2 ml-1 bg-blue-100 hover:bg-blue-200 text-blue-800 font-bold py-1 px-3 rounded-sm text-xs active:text-sky-200"
          >
            Submit
          </button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  min-width: 30%;
  position: relative;
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 10px 5px 2px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter,
.modal-leave-to {
  opacity: 0;
}
.class-select {
  margin: 1%;
}
</style>
