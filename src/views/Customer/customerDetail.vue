<template>
    <master-layout pageTitle = "Customer Detail">
        
             <div v-if="loading">
            <Loader/>
        </div>
        
        <div v-else>
            <div class=" mt-10 bg-white/60 backdrop-blur-md backdrop-filter px-3 py-2 mx-2">
                <div class=" z-20 p-2">
                     <div>
                        <input type="search" v-model="search" placeholder=" search invoice ..." /> 
                    </div>
                </div>

                

                <div class=" flex justify-between mt-16 px-6">
                   
                            <div  v-if="customer.profile == null" alt="" class="object-scale-down h-12 w-12 p-1 rounded mx-auto">
                                   <PersonIcon/>
                                </div>
                                <img :src="`https://fulfilmm.com/img/profiles/` + customer.profile" v-else alt="" srcset="" class="object-scale-down h-12 w-12 p-1 rounded-md mx-auto">
                   
                    <div>
                         <div class=" text-gray-700 my-2">
                           <p class=" font-bold mr-3"> Name </p> <p class=" font-semibold"> {{customer.name}} </p>
                        </div>
                          <div class=" text-gray-700 my-2">
                           <p>id</p><p class=" font-semibold"> {{customer.customer_id}} </p>
                        </div>
                        <div class=" text-gray-700 my-2">
                            <p> Phone </p> <p class=" font-semibold"> {{ customer.phone}}</p>
                        </div>
                         <div class=" text-gray-700 my-2">
                            <p> Current Credit  </p> <p class=" font-semibold"> {{ customer.current_credit}}</p>
                        </div>
                         <div class=" text-gray-700 my-2">
                             <p>Credit Limit </p> <p class=" font-semibold"> {{ customer.credit_limit }}</p>
                        </div>
                    </div>
                    <div>
                          <div class=" text-gray-700 my-2">
                            <p class=" font-semibold"> Total Paid - </p> <p class=" font-thin text-lg"> {{paid_total}} </p>
                        </div>
                          <div class=" text-gray-700 my-2">
                            <p class=" font-semibold"> Open Amt - </p> <p class=" font-thin text-lg"> {{open}} </p>
                        </div>
                          <div class=" text-gray-700 my-2">
                            <p class=" font-semibold"> Over Due - </p> <p class=" font-thin text-lg"> {{overdue}} </p>
                        </div>
                    </div>
                </div>
                
                 
            
               <div v-if="! invoice.length" class="bg-white min-h-screen">
                    <img src="../empty.gif" alt="" class=" mx-auto d-block pt-10">
               </div>
              
                     <div v-for="record in filteredInv" :key="record.id" class="my-4" v-else>
                        <header class="text-white bg-emerald-400/60">
                            
                            <h4> Invoice Number - {{ record.invoice_id}} </h4>
                           
                            <h6 class=" text-gray-700">  Invoice Date - {{moment(record.invoice_date).format("MMM Do YYYY")}}  </h6>
                            <h6 class=" text-gray-700">  Due Date - {{moment(record.due_date).format("MMM Do YYYY")}}  </h6>
                            <div class=" flex ion-justify-content-between">
                                 <p class="text-gray-600 font-bold"> {{record.inv_type}} </p> 
                                <div>
                                    <p v-if="record.cancel == 1 " class="text-right text-red-800 font-bold"> Canceled</p>
                                    <p v-else class="text-right text-gray-800 font-bold"> {{record.status}}</p>
                                </div>
                            </div>
                        </header>
                        <div class=" text-gray-700 font-medium">
                            <div class=" grid grid-cols-2 gap-2 font-bold text-lg">
                                 

                                  
                                    <div>
                                       <label> Total </label>
                                    </div>
                                    <div>
                                        <p>  {{record.grand_total}} MMK </p>
                                    </div>
                                   
                          

                               
                                    <div>
                                       <label> Due Amount </label>
                                    </div>
                                    <div>
                                        <p>  {{record.due_amount}} MMK </p>
                                    </div>
                                   
                                
                            </div> 
                             <div class="text-right">   
                                <router-link class=" px-2 py-1 rounded-md bg-blue-50" :to="`/invoice-detail/${record.id}`"> 
                               Invoice Detail
                            </router-link>>
                            </div>
                            
                             
                        </div>
                        </div>
                </div>
                   
              
               
         
        </div>
        </master-layout>
</template>
<script>



import Loader from '../../components/loaderComponent.vue'
import axios from 'axios'
import moment from 'moment'
import PersonIcon from 'vue-material-design-icons/Account.vue'

export default {
    data() {
        return {
            search:'',
            loading: false,
            customer:{},
            invoice:[],
            paid_total :'',
            overdue: '',
            open:'',
            moment: moment,
        }
    },

    

    components:{
  
        Loader, PersonIcon
    },

    methods:{
        async getData(){
            this.loading = true;
            await axios.get(`api_customers/${this.$route.params.id}` , {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                }) 
                .then( (res) => {
                    this.customer = res.data.customer;
                    this.invoice = res.data.invoice;
                    this.paid_total = res.data.paid_total;
                    this.overdue = res.data.overdue;
                    this.open = res.data.open
                })
                .finally(() => this.loading = false)
        }
    },

    computed:{
        filteredInv(){
            return this.invoice.filter((inv) => {
                return inv.invoice_id.toLowerCase().match(this.search.toLowerCase()) ||
                        inv.status.toLowerCase().match(this.search.toLowerCase())
            })
        }
    },

    created() {
        this.getData();
    },
    
}
</script>

<style scoped>
  
</style>
