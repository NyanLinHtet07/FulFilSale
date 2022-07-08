<template>
        <master-layout pageTitle="Sales History">
        <div v-if="loading">
                <Loader/>
        </div>
       <div v-else>
           
                <input type="search" v-model="search" placeholder=" search invoice ..." class=" w-4/5 rounded-xl drop-shadow-lg shadow-emerald-200 py-2 px-3 mb-3 mx-2" animated /> 
          
              
          
        
                <div class=" grid  md:grid-cols-3 md:gap-3 grid-cols-1 "> 
                    
                    
                    <div v-for="record in filteredInvoice" :key="record.id" class="my-2 mx-2 rounded-2xl px-2 py-3 shadow-xl transition-shadow duration-400 hover:shadow-sm bg-white/60 backdrop-blur-lg backdrop-filter">
                        <div class="text-white bg-emerald-500/90 px-2 py-3 rounded-xl">
                            
                            <h4 class=" text-left"> Invoice Number - {{ record.invoice_id}} </h4>
                           
                            <!-- <ion-card-subtitle class=" text-gray-700">  Invoice Date - {{moment(record.invoice_date).format("MMM Do YYYY")}}  </ion-card-subtitle>
                            <ion-card-subtitle class=" text-gray-700">  Due Date - {{moment(record.due_date).format("MMM Do YYYY")}}  </ion-card-subtitle> -->
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
            </div>
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
