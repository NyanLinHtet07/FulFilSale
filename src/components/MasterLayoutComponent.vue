<template>
    <div class="h-screen flex bg-gradient-to-t from-slate-400/70 to-white">
        <div class=" w-1/5 bg-white/80 bg-opacity-50 backdrop-blur-md backdrop-filter rounded-br-2xl px-2 py-3
                     border-r-2 border-emerald-200/10 drop-shadow-md"  v-if="!menu">
            <header class=" mt-5 mb-3">
                <h2 class=" font-bold text-2xl text-gray-600"> FulFil</h2>
            </header>
           <nav>
                <div class="border-b-2 border-gray-200 py-2 ">
                   <router-link to="/" class="flex justify-start transition ease-in-out delay-150 relative font-thin text-gray-700">
                     <HomeIcon class=" ml-2 mr-5"/> <p> Home </p>
                    </router-link> 
                </div>

                 <div class="border-b-2 border-gray-200 py-2">
                   <router-link to="/select_sales" class="flex justify-start transition ease-in-out delay-150 relative font-thin text-gray-700">
                     <CartIcon class=" ml-2 mr-5"/> <p> Sales </p>
                    </router-link> 
                </div>

                <!-- <div class>
                     <router-link to="/about"  class="flex justify-start"> About</router-link>
                </div> -->

                 <div class="border-b-2 border-gray-200 py-2">
                   <div class="flex justify-start transition ease-in-out delay-150 relative font-thin text-gray-700"  @click="logout()">
                     <LogoutIcon class=" ml-2 mr-5"/> <p> Logout </p>
                    </div> 
                </div>
            </nav>
        </div>


        <div class=" w-4/5 flex-1">
            <div class=" py-3 px-2 rounded-md bg-gray-200/30 backdrop-blur-lg bg-opacity-40 mb-2  mt-1 mx-2
                         w-auto border-2 border-emerald-200/20 flex justify-between">
                
                     <MenuIcon @click="openMenu()" v-if="! menu" 
                            class=" ml-3 font-medium hover:text-emerald-600 transition-colors delay-300" /> 

                     <CloseIcon  @click="closeMenu()" v-else  
                            class=" ml-3 font-medium text-red-500 hover:text-red-800 transition-colors delay-300" />
                
                
                 <h1 class=" text-lg font-semibold text-gray-500 mr-3"> {{pageTitle }}</h1>
            </div>
           
            <main>
                 <slot />
            </main>
           
        </div>
    </div>
</template>
<script>

import HomeIcon from 'vue-material-design-icons/HomeOutline.vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import CloseIcon from 'vue-material-design-icons/CloseCircleOutline.vue'
import CartIcon from 'vue-material-design-icons/CartOutline.vue'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'


export default {
    props:["pageTitle"],

    data() {
        return {
            menu: false,
        }
    },

    components:{
       HomeIcon, MenuIcon, CloseIcon, CartIcon, LogoutIcon
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