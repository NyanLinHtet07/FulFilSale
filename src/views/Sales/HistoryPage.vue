<template>
        <master-layout pageTitle=" Sales History">
        <div v-if="loading">
                <Loader/>
        </div>
       <div v-else>
              <input type="search" v-model="search" placeholder=" search invoice ..." animated class=" fixed top-14 bg-white z-20"/> 
          
        
                <div class=" mt-20 grid grid-cols-3 gap-3"> 
                    
                    
                    <div v-for="record in filteredInvoice" :key="record.id" class="my-4">
                        <div class="text-white bg-emerald-400/60">
                            
                            <h4> Invoice Number - {{ record.invoice_id}} </h4>
                           
                            <!-- <ion-card-subtitle class=" text-gray-700">  Invoice Date - {{moment(record.invoice_date).format("MMM Do YYYY")}}  </ion-card-subtitle>
                            <ion-card-subtitle class=" text-gray-700">  Due Date - {{moment(record.due_date).format("MMM Do YYYY")}}  </ion-card-subtitle> -->
                            <div class=" flex ion-justify-content-between">
                                 <p class="text-gray-600 font-bold"> {{record.inv_type}} </p> 
                                <div>
                                    <p v-if="record.cancel == 1 " class="text-right text-red-800 font-bold"> Canceled</p>
                                    <p v-else class="text-right text-gray-800 font-bold"> {{record.status}}</p>
                                </div>
                            </div>
                        </div>
                        <div class=" text-gray-700 font-medium">
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
                            <div class="text-right">   
                                <router-link class=" px-2 py-1 rounded bg-emerald-700"  :to="`/invoice-detail/${record.id}`"> 
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
