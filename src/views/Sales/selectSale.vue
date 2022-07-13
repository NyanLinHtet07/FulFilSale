<template>
    <master-layout pageTitle="Sales">
           
             <div class="mx-3 grid md:grid-cols-2 md:gap-2 grid-cols-1">

               <!------------  fro web and tab version ---------->
               <div class="px-4 py-3 mx-4 my-2 md:w-5/6 hidden md:block rounded-lg shadow-md bg-white bg-opacity-70 text-gray-700
                         backdrop-blur-lg backdrop-filter
                         hover:shadow-xl hover:text-green-800 hover:border-2 hover:border-emerald-400/40 transition duration-300">
                     <img src="/wholesale.png" alt="fulfil" class=" object-scale-down md:w-28 w-32 mb-6 mt-7 mx-auto"/>
                    <h2 class=" text-xl font-bold my-7">WholeSales</h2>
                    <router-link to="/wholesales" class="bg-emerald-600 text-gray-100 rounded-xl mx-3 my-3 mt-7 mb-3 px-3 py-2 drop-shadow-md">
                         Click 
                    </router-link>
               </div>

               

               <div class="px-4 py-3 mx-4 my-3 w-auto md:w-5/6 hidden md:block rounded-lg shadow-md bg-white bg-opacity-70 text-gray-700
                         backdrop-blur-lg backdrop-filter
                         hover:shadow-xl hover:text-green-800 hover:border-2 hover:border-emerald-400/40 transition duration-300 ">
                     <img src="/retailsale.png" alt="fulfil" class=" object-scale-down md:w-28 w-32 mb-6 mt-7 mx-auto"/>
                    <h2 class=" text-xl font-bold my-7">RetailSales</h2>
                    <router-link to="/retailsales" class="bg-emerald-600 text-gray-100 rounded-xl mx-3 mt-7 mb-3 px-3 py-2 drop-shadow-md">
                         Click 
                    </router-link>
            </div>
            <!--------------  end ----------------------->

            <!------------- for mobile version ---------->
                 <div class="px-4 py-3 mx-4 my-2 md:w-5/6 md:hidden block rounded-lg shadow-md bg-white bg-opacity-70 text-gray-700
                         backdrop-blur-lg backdrop-filter
                         hover:shadow-xl hover:text-green-800 hover:border-2 hover:border-emerald-400/40 transition duration-300">
                     <img src="/wholesale.png" alt="fulfil" class=" object-scale-down md:w-28 w-32 mb-6 mt-7 mx-auto"/>
                    <h2 class=" text-xl font-bold my-7">WholeSales</h2>
                    <router-link to="/mobile/wholesales" class="bg-emerald-600 text-gray-100 rounded-xl mx-3 my-3 mt-7 mb-3 px-3 py-2 drop-shadow-md">
                         Click 
                    </router-link>
               </div>

               

               <div class="px-4 py-3 mx-4 my-3 w-auto md:w-5/6 md:hidden block rounded-lg shadow-md bg-white bg-opacity-70 text-gray-700
                         backdrop-blur-lg backdrop-filter
                         hover:shadow-xl hover:text-green-800 hover:border-2 hover:border-emerald-400/40 transition duration-300 ">
                     <img src="/retailsale.png" alt="fulfil" class=" object-scale-down md:w-28 w-32 mb-6 mt-7 mx-auto"/>
                    <h2 class=" text-xl font-bold my-7">RetailSales</h2>
                    <router-link to="/mobile/retailsales" class="bg-emerald-600 text-gray-100 rounded-xl mx-3 mt-7 mb-3 px-3 py-2 drop-shadow-md">
                         Click 
                    </router-link>
            </div>



               <Chart class=" w-5/6 px-4 py-3 mx-4 my-2 bg-white/40 backdrop-blur-md rounded-lg backdrop-filter"/>    
               <Pie class="w-5/6 px-4 py-3 mx-4 my-2 bg-white/40 backdrop-blur-md rounded-lg backdrop-filter"/>
              
       
       
          
                

          

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