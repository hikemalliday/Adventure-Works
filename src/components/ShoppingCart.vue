<script>
// Check for login upon mounted()
//    If (loggedIn) continue;
//       else: redirect to login page.
//          After login successful, return to cart
export default {
    data() {
        return {
            loggedIn: false
        }
    },
    methods: {
        checkLoggedInStatus(){
            console.log('checkLoggedInStatus()');
            this.loggedIn = this.$store.getters.getLoggedInValue;
            console.log(this.loggedIn);
            if (this.loggedIn === true) return;
            else if (this.loggedIn === false)
            {
                console.log('checkLoggedInStatus, ELSE (meaning this.loggedIN = false)');
                this.$router.push('/login');
            }
        },
        increaseQuantity(name){
            this.$store.dispatch('increaseQuantityAction', name);
                },
        decreaseQuantity(name){
            this.$store.dispatch('decreaseQuantityAction', name);
                },
        deleteShoppingCart(){
            // Clear the shopping cart in VUEX, then clear is locally
            this.$store.dispatch('deleteShoppingCartAction');
        },
        checkOut(){
            console.log('func not made yet!!');
        }
    },
    mounted(){
        console.log('mounted test (shoppingcart)')
        this.checkLoggedInStatus();
    }
}

</script>

<template>
    <div v-for="(product, index) in this.$store.state.shoppingCart.items" :key="product.name">
        <div>
            <img @click = console.log(product) src="../../public/pics/bike.jpg" alt="card image" class="w-40 h-40 mr-2">
        </div>
        <div class=" hover:text-sky-700 cursor-pointer active:text-sky-200">
            {{  product.name }}
        </div>
            
        <div>
            {{  product.description }}
        </div>

        <div>
            Category:
            {{  product.ProductSubcategoryName }}
        </div>

        <div>
            ${{  product.listPrice }}.00
        </div>

        <div>
            Quantity:
            {{  product.quantity }}
        </div>
        
        <div class="flex">
            <div @click="increaseQuantity(product)" class="text-3xl hover:text-sky-700 cursor-pointer active:text-sky-200">+</div>
            <div @click="decreaseQuantity(product)" class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200">-</div>
        </div>

    </div>
        <div v-if="this.$store.state.shoppingCart.total">
            TOTAL:
            {{ this.$store.state.shoppingCart.total }}
        </div>
        <div @click="deleteShoppingCart" class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200">
            deleteShoppingCart()
        </div>
        <div @click="checkOut" class="text-2xl hover:text-sky-700 cursor-pointer active:text-sky-200">
            checkOut()
        </div>

</template>