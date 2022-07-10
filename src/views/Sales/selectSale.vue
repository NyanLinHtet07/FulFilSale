<template>
    <master-layout pageTitle="Sales">
           
             <div class=" w-5/6 h-1/4 mx-auto grid grid-cols-2 gap-2">
                    <Chart class=" px-3 py-2 bg-white/40 backdrop-blur-md rounded-lg backdrop-filter"/> 
                    <Pie class=" px-3 py-2 bg-white/40 backdrop-blur-md rounded-lg backdrop-filter"/>
               </div>
       
            <div class=" flex justify-center mt-10">
          
                 <div class="px-4 py-3 mx-4 my-3 w-auto md:w-2/5 rounded-lg shadow-md bg-white bg-opacity-30 text-gray-700
                         backdrop-blur-lg backdrop-filter
                         hover:shadow-xl hover:text-green-800 hover:border-2 hover:border-emerald-400/40 transition duration-300">
                    
                    <h2 class=" text-xl font-bold my-3">WholeSales</h2>
                    <router-link to="/wholesales" class="bg-emerald-600 text-gray-100 rounded-xl mx-3 my-3 mt-9 px-3 py-2 drop-shadow-md">
                         Click 
                    </router-link>
            </div>

             <div class="px-4 py-3 mx-4 my-3 w-auto md:w-2/5 rounded-lg shadow-md bg-white bg-opacity-30 text-gray-700
                         backdrop-blur-lg backdrop-filter
                         hover:shadow-xl hover:text-green-800 hover:border-2 hover:border-emerald-400/40 transition duration-300 ">
                    
                    <h2 class=" text-xl font-bold my-3">RetailSales</h2>
                    <router-link to="/retailsales" class="bg-emerald-600 text-gray-100 rounded-xl mx-3 my-3 px-3 py-2 drop-shadow-md">
                         Click 
                    </router-link>
            </div>
            
           
        </div>


         <!-- <div class=" flex justify-center mt-19">
            <div class=" px-4 py-3 mx-4 my-3 w-auto md:w-2/5 rounded-lg shadow-md bg-white bg-opacity-30 text-gray-700 text-center
                         backdrop-blur-lg backdrop-filter
                         hover:shadow-xl hover:text-green-800 hover:border-2 hover:border-emerald-400/40 transition duration-300 ">
                
                        
                    <h2 class=" text-xl font-bold my-3"> Customers</h2>
                    <button class="bg-emerald-600/70 text-gray-100 rounded-xl mx-3 my-3 px-3 py-2 drop-shadow-md">
                         Click 
                    </button>
            </div>

             <div class=" px-4 py-3 mx-4 my-3 w-auto md:w-2/5 rounded-lg shadow-md bg-white bg-opacity-30 text-gray-700
                         backdrop-blur-lg backdrop-filter
                         hover:shadow-xl hover:text-green-800 hover:border-2 hover:border-emerald-400/40 transition duration-300 ">
                    
                    <h2 class=" text-xl font-bold my-3">History</h2>
                    <button class="bg-emerald-600/70 text-gray-100 rounded-xl mx-3 my-3 px-3 py-2 drop-shadow-md">
                         Click 
                    </button>
            </div>
        </div> -->

      
       

        
      
         
    </master-layout>
   
</template>
<script>


import Chart from '../../components/Chart/BarChartComponent.vue'
import Pie from '../../components/Chart/PieChartComponent.vue'

export default {
   components:{
     Chart, Pie
   }
}
</script>