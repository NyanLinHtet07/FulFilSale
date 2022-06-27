<template>
    <master-layout pageTitle="WholeSales">
         <!-- <Loader class=""/> -->
         <div class=" inline">
         <div class="fixed top-16 w-full mx-auto">
            <div class=" bg-white/60 w-auto backdrop-blur-sm backdrop-filter py-3 px-2 rounded mx-3">
                <div class="flex justify-between mb-2 w-full">
                    <div>
                        <bar-icon class=" text-stone-700"></bar-icon>
                    </div>
                    <div class="flex">
                        <person-icon class=" mx-2 text-emerald-600"></person-icon> 
                        <cart-icon class="mx-2 text-slate-800"></cart-icon> 
                        <cancel-icon class="mx-2 text-red-800"></cancel-icon>
                    </div>
                </div>
                    <input type="search" name="" id="" class=" w-5/6 rounded-lg drop-shadow-lg py-2 px-3" placeholder=" Search ..." />
                </div>
         </div>
         </div>
        
       <div class=" w-auto mt-20">
            Hw
       </div>
    </master-layout>
   
</template>

<script>
import BarIcon from 'vue-material-design-icons/Barcode.vue'
import PersonIcon from 'vue-material-design-icons/Account.vue'
import CartIcon from 'vue-material-design-icons/CartOutline.vue'
import CancelIcon from 'vue-material-design-icons/Cancel.vue'

//import Loader from '../../components/loaderComponent.vue'
export default {
    components:{
        BarIcon, PersonIcon, CartIcon, CancelIcon,
        //Loader
    }
}
</script>