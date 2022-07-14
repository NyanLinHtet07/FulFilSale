<template>
        <master-layout pageTitle="Sales History">
        <div v-if="loading">
                <Loader/> 
        </div>
       <div v-else>
           
                <input type="search" v-model="search" placeholder=" search invoice id ..." class="rounded-xl drop-shadow-lg shadow-emerald-200 py-2 px-3 mb-3 mx-2 mt-2 z-30 w-4/5 sticky top-16" animated /> 
                <!-- <div class=" block">
                     <select name="" id="" v-model="search" class=" px-2 py-1 rounded-xl bg-white/60 backdrop-blur-md">
                        <option value="Whole Sale" class="px-2 py-1 rounded-xl bg-white/90">Whole Sale</option>
                        <option value="Retail Sale" class="px-2 py-1 rounded-xl bg-white/90">Retail Sale</option>
                    </select>
                </div> -->
               
               <table class="table-auto overflow-x-scroll border-collapse:separate rounded-xl border-0 border-accent w-5/6 my-6 bg-white bg-opacity-40 backdrop-blur-md mx-auto drop-shadow-lg shadow-2xl shadow-sky-200">
                        <thead class=" border-y border-gray-300/60">
                            <tr>
                            <th class=" py-2 font-thin">Inv-No</th>
                            <th class="py-2 font-thin">Customer</th>
                            <th class=" py-2 font-thin">Phone</th>
                            <th class="py-2 font-thin"> Inv Type</th>
                             <th class="py-2 font-thin"> Status</th>
                             <th class=" py-2 font-thin"> Total </th>
                             <th class=" py-2 font-thin"> Due Amount</th>
                            <th class="py-2 font-thin">Detail</th>
                            
                            </tr>
                        </thead>
                        <tbody class=" bg-white bg-opacity-60 backdrop-blur-md ">
                            <tr v-for="record in filteredInvoice" :key="record.id" class=" border-y border-gray-400/50 text-sm">
                            <td class=" py-3 pl-3 text-center">{{ record.invoice_id}}</td>
                            <td class=" py-3 pl-3 text-center"> {{record.customer.name}}  </td>
                            <td class=" py-3 pl-3 text-center">{{record.customer.phone}}</td>
                            <td class=" py-3 pl-3 text-center text-sm">{{record.inv_type}}</td>
                            <td class=" py-3 pl-3 text-center">
                                  <p v-if="record.cancel == 1 " class=" text-red-800 font-bold text-sm"> Canceled</p>
                                  <p v-else class=" text-gray-800 text-sm font-semibold"> {{record.status}}</p>
                            </td>
                            <td class=" py-3 pl-3 text-center"> {{record.grand_total}} MMK </td>
                            <td class=" py-3 pl-3 text-center "> {{record.due_amount}} MMK </td>
                            <td class=" py-3 text-center">
                                <router-link :to="`/invoice-detail/${record.id}`" class="p-2 text-xs rounded-full bg-emerald-700/90  drop-shadow-lg shadow-md shadow-emerald-200 decoration-slate-200 text-white 
                                            hover:drop-shadow-sm hover:opacity-80 hover:shadow-inner
                                            transition ease-in-out duration-300"> 
                                            View
                                </router-link> 
                            </td>
                            
                            </tr>
                        
                        </tbody>
                    </table>
          
        
                <!-- <div class=" grid  md:grid-cols-3 md:gap-3 grid-cols-1 "> 
                    
                    
                    <div v-for="record in filteredInvoice" :key="record.id" class="my-2 mx-2 rounded-2xl px-2 py-3 shadow-xl transition-shadow duration-400 hover:shadow-sm bg-white/60 backdrop-blur-lg backdrop-filter">
                        <div class="text-white bg-emerald-500/90 px-2 py-3 rounded-xl">
                            
                            <h4 class=" text-left"> Invoice Number - {{ record.invoice_id}} </h4>
                           
                            <div class=" flex justify-between">
                                 <p class="text-slate-50/90 text-sm font-semibold"> {{record.inv_type}} </p> 
                                <div>
                                    <p v-if="record.cancel == 1 " class="text-right text-red-800 font-bold text-sm"> Canceled</p>
                                    <p v-else class="text-right text-gray-800 text-sm font-semibold"> {{record.status}}</p>
                                </div>
                            </div>
                        </div>
                        <div class=" text-gray-700 font-medium text-left ">
                            <div class=" grid grid-cols-2">
                               
                                    <div>
                                       <p> Customer Name </p>
                                    </div>
                                    <div>
                                        <p> {{record.customer.name}} </p>
                                    </div>
                                   
                               

                               
                                    <div>
                                       <p> Phone </p>
                                    </div>
                                    <div>
                                        <p> {{record.customer.phone}} </p>
                                    </div>
                                  
                               

                            

                                
                                    <div>
                                       <p> Total </p>
                                    </div>
                                    <div>
                                        <p>  {{record.grand_total}} MMK </p>
                                   
                                    </div>
                              
                                    <div>
                                       <p> Due Amount </p>
                                    </div>
                                    <div>
                                        <p>  {{record.due_amount}} MMK </p>
                                    </div>
                                   
                               </div>
                            <div class="text-right mt-3">   
                                <router-link class=" px-3 py-1 rounded-full drop-shadow-lg bg-emerald-600 text-white my-1 mr-2"  :to="`/invoice-detail/${record.id}`"> 
                               Invoice Detail
                            </router-link>
                            </div>
                             
                        </div>

                  
                    

               
        

             </div> 
            </div> -->
       </div>
        </master-layout>
      

  
</template>
<script>


import Loader from '../../components/loaderComponent.vue'
import moment from 'moment';

// import {mapGetters} from 'vuex';

import axios from 'axios';
export default {
    components:{
      
      
        Loader
       
        
    },

    data() {
        return {
          loading: false,
          retails:[],
          posts:[],

          search:'',
          moment: moment
        }
    },

    methods:{
       async getData(){
            this.loading = true

            await axios.get('mobile_invoice', {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                })
            .then( response => {
              this.posts = response.data.allinv
            })

            .finally(() => this.loading = false)
            
        }

    },

    computed:{
        records(){
            return this.$store.state.saleDatas;
        },

        filteredInvoice(){
            return this.posts.filter((post) => {
                return post.invoice_id.toLowerCase().match(this.search.toLowerCase())
                       // post.inv_type.toLowerCase().match(this.search.toLowerCase())
            })
        }

    },


     created() {
        
            this.getData();
           
        },
}
</script>

<style scoped>
    .emptycart{
      margin-top: 60px;
    }
    .text{
        text-align: center;
        font-weight: 400;
        margin-top: 20px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    }

    

</style>
