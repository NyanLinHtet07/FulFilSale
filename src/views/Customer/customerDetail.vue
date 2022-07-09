<template>
    <master-layout pageTitle = "Customer Detail">
        
             <div v-if="loading">
            <Loader/>
        </div>
        
        <div v-else>
            
                <!-- <div class = "w-full relative bg-emerald-600 flex">
                    <div class =" absolute -top-10 ">
                         <div  v-if="customer.profile == null" alt="" class="">
                                   <PersonIcon class =" w-96"/>
                         </div>
                        <img :src="`https://fulfilmm.com/img/profiles/` + customer.profile" v-else alt="" srcset="" class="object-scale-down h-12 w-12 p-1 rounded-md mx-auto">
                    </div>

                </div> -->
    
            <div class=" mt-14 bg-white/60 backdrop-blur-md backdrop-filter px-3 py-4 mx-2 rounded-lg">
               

                

                <div class=" px-6">

                    <div class=" flex justify-between">
                        <div>
                           
                            <div class=" flex">
                                 <PersonIcon class="" /> 
                                <span class=" ml-8"> {{customer.name}} </span>
                            </div>
                            <!----- end ------>

                            <!----- id ------->
                            <div class=" flex">
                                 <IdIcon />
                                 <span class=" ml-8"> {{customer.customer_id}} </span>
                            </div>

                            <!------ end ------->
                            <!----- phone ----->
                            <div class=" flex">
                                 <PhoneIcon /> 
                                 <span class=" ml-8"> {{ customer.phone}} </span>
                            </div>
                            <!------- end ------->
                     
                    </div>

                        <div>
                            <div class=" text-gray-100 bg-slate-500  text-xs px-2 py-1 my-2 rounded-full leading-loose drop-shadow-lg">

                                <span> Current Credit  </span> <span class=" mx-2"> {{ customer.current_credit}}</span>
                            </div>
                            <div class="text-gray-100 bg-indigo-400 text-xs px-2 py-1 my-2 rounded-full leading-loose drop-shadow-lg">
                                <span>Credit Limit </span> <span class=" mx-2"> {{ customer.credit_limit }}</span>
                            </div>
                        </div>
                    </div>
                   
                           
                   
                    <div class=" flex justify-around">
                          <div class="text-gray-100 bg-sky-500  text-xs px-2 py-1 my-2 rounded-full leading-loose drop-shadow-lg">
                            <span> Total Paid - </span> <span class=" mx-2"> {{paid_total}} </span>
                        </div>
                          <div class="text-gray-100 bg-red-500  text-xs px-2 py-1 my-2 rounded-full leading-loose drop-shadow-lg">
                            <span> Open Amt - </span> <span class=" mx-2"> {{open}} </span>
                        </div>
                          <div class="text-gray-100 bg-amber-500  text-xs px-2 py-1 my-2 rounded-full leading-loose drop-shadow-lg">
                            <span> Over Due - </span> <span class=" mx-2"> {{overdue}} </span>
                        </div>
                    </div>
                </div>

                 <div class=" z-20 p-2">
                        <input type="search" v-model="search" placeholder=" search invoice ..." class="bg-white rounded-full px-2 w-4/5 h-9 drop-shadow-lg ml-5 mr-3 mt-2" /> 
                </div>
                
                 
            
               <div v-if="! invoice.length" class="bg-white min-h-screen">
                    <img src="/empty_cart.svg" alt="" class=" mx-auto d-block pt-10 w-96">
               </div>

                 <table v-else class="table-auto overflow-x-scroll border-collapse:separate rounded-xl border-0 border-accent w-5/6 my-6 bg-white bg-opacity-40 backdrop-blur-md mx-auto drop-shadow-lg shadow-2xl shadow-sky-200">
                        <thead class=" border-y border-gray-300/30">
                            <tr>
                            <th class=" py-2 font-thin">Inv-No</th>
                            <th class="py-2 font-thin"> Inv Type</th>
                             <th class="py-2 font-thin"> Status</th>
                             <th class=" py-2 font-thin"> Total </th>
                             <th class=" py-2 font-thin"> Due Amount</th>
                            <th class="py-2 font-thin">Detail</th>
                            
                            </tr>
                        </thead>
                        <tbody class=" bg-white bg-opacity-60 backdrop-blur-md ">
                            <tr v-for="record in filteredInv" :key="record.id" class=" border-y border-gray-200/50 text-sm">
                            <td class=" py-3 pl-3 text-center">{{ record.invoice_id}}</td>
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


              
                     <!-- <div v-for="record in filteredInv" :key="record.id" class="my-4">
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
                        </div> -->
                </div>
                   
              
               
         
        </div>
        </master-layout>
</template>
<script>



import Loader from '../../components/loaderComponent.vue'
import axios from 'axios'
import moment from 'moment'
import PersonIcon from 'vue-material-design-icons/Account.vue'
import IdIcon from 'vue-material-design-icons/IdCard.vue'
import PhoneIcon from 'vue-material-design-icons/Phone.vue'
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
  
        Loader, PersonIcon, IdIcon, PhoneIcon
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
