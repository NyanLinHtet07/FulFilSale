<template>
    <div class="h-screen flex bg-gradient-to-t from-emerald-300/70 to-white">
        <div class="w-64 max-h-full bg-white bg-opacity-80 backdrop-blur-lg border-b border-gray-100 px-3 py-2 rounded-r-3xl  space-y-6
                                             absolute inset-0 left-0 transform -translate-x-full transition duration-400 ease-in-out block"
                                    :class="{'relative -translate-x-0 transition duration-500': !showSidebar}">
            <header class=" mt-5 mb-3">
                <!-- <h2 class=" font-bold text-2xl text-gray-600"> FulFil</h2> -->
                <img src="/fulfil.png" alt="fulfil" class=" object-scale-down w-48 mx-auto" />
            </header>
           <nav>
                <!-- <div class="border-b-2 border-gray-200 py-2 ">
                   <router-link to="/" class="flex justify-start transition ease-in-out delay-150 relative font-thin text-gray-700">
                     <HomeIcon class=" ml-2 mr-5"/> <p> Home </p>
                    </router-link> 
                </div> -->

                 <div class="border-b-2 border-gray-200 py-2">
                   <router-link to="/select_sales" class="flex justify-start transition ease-in-out delay-150 relative font-thin text-gray-700">
                     <CartIcon class=" ml-2 mr-5"/> <p> Sales </p>
                    </router-link>  
                </div>

                 <div class="border-b-2 border-gray-200 py-2">
                   <router-link to='/history' class="flex justify-start transition ease-in-out delay-150 relative font-thin text-gray-700">
                     <SaleHistoryIcon class=" ml-2 mr-5"/> <p> Sale History </p>
                    </router-link>  
                </div>

                 <div class="border-b-2 border-gray-200 py-2">
                   <router-link to='/customers' class="flex justify-start transition ease-in-out delay-150 relative font-thin text-gray-700">
                     <CustomerIcon class=" ml-2 mr-5"/> <p> Customers </p>
                    </router-link>  
                </div>

                <div class="border-b-2 border-gray-200 py-2">
                   <router-link to='/shop' class="flex justify-start transition ease-in-out delay-150 relative font-thin text-gray-700">
                     <ShopIcon class=" ml-2 mr-5"/> <p> Shops </p>
                    </router-link>  
                </div>

                <div class="border-b-2 border-gray-200 py-2">
                   <a href='https://fulfilmm.com/employee/login' class="flex justify-start transition ease-in-out delay-150 relative font-thin text-gray-700">
                     <LinkIcon class=" ml-2 mr-5"/> <p> Back Office </p>
                    </a>  
                </div>

                 <div class="border-b-2 border-gray-200 py-2">
                   <div class="flex justify-start transition ease-in-out delay-150 relative font-thin text-gray-700"  @click="logout()">
                     <LogoutIcon class=" ml-2 mr-5"/> <p> Logout </p>
                    </div> 
                </div>
            </nav>
        </div>


        <div class="flex-1 overflow-y-auto h-screen max-w-screen w-screen">
            <div class=" py-3 px-2 rounded-md bg-white backdrop-blur-lg mb-2  mx-2
                         border-2 border-emerald-200/20 flex justify-between fixed top-0  w-screen z-30">
                     <button  @click=" showSidebar = !showSidebar" class=" hover:bg-slate-200/10 hover:rounded-full hover:drop-shadow-lg hover:transition hover:delay-200 p-2">  <MenuIcon/> </button>
                     <!-- <MenuIcon @click="openMenu()" v-if="! menu" 
                            class=" ml-3 font-medium hover:text-emerald-600 transition-colors delay-300" /> 

                     <CloseIcon  @click="closeMenu()" v-else  
                            class=" ml-3 font-medium text-red-500 hover:text-red-800 transition-colors delay-300" /> -->
                
                
                 <h1 class=" text-lg font-semibold text-gray-500 mr-3"> {{pageTitle }}</h1>
            </div>
           
            <main class=" mt-20">
                 <slot />
            </main>
           
        </div>
    </div>
</template>
<script>

//import HomeIcon from 'vue-material-design-icons/HomeOutline.vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue'
//import CloseIcon from 'vue-material-design-icons/CloseCircleOutline.vue'
import CartIcon from 'vue-material-design-icons/CartOutline.vue'
import SaleHistoryIcon from 'vue-material-design-icons/Sale.vue'
import CustomerIcon from 'vue-material-design-icons/AccountGroup.vue'
import ShopIcon from 'vue-material-design-icons/Storefront.vue'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'
import LinkIcon from 'vue-material-design-icons/Link.vue'
import {ref} from 'vue'


export default {
    props:["pageTitle"],

    data() {
        return {
            menu: false,
        }
    },

    setup(){
        const showSidebar = ref(false);

        return { showSidebar, }
    },

    components:{
        MenuIcon,  CartIcon, LogoutIcon, SaleHistoryIcon, CustomerIcon, ShopIcon , LinkIcon
    },

    methods: {
        openMenu(){
            this.menu = true;
        },

        closeMenu(){
            this.menu = false;
        },


        logout(){
        if(!confirm('Are You Sure To Logout')) return;
        this.closeMenu();
        localStorage.removeItem('token');
        this.$router.push('/login')
        //window.reload();
       } 
    },
}
</script>