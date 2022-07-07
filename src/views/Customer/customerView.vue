<template>
    <master-layout pageTitle = "Customers">
     <div v-if="loading">
            <Loader/>
     </div>
        <div v-else class="">
           
            <div class=" flex justify-end px-2 py-2  bg-white z-30 w-full">
                <router-link to="/wholesales"> Wholesales </router-link>
                <router-link to="/retailsales"> Retails</router-link>
            </div>


            <!------------------  visiable data  ---------------->

            <div class=" mb-14 pb-3">

                    
                    <input type="search" v-model="search" placeholder=" search customers ..."  class=" bg-white z-30 w-full"/> 

                    <div class=" mt-40">
                         <button  type="button" class=" mr-3 inline-block mt-3 p-1 rounded-full bg-emerald-600/80 text-white drop-shadow-lg shadow-lg shadow-emerald-400" v-on:click="toggleModal()" > 
                         <PersonAddIcon/>
                         </button>
                          
                    </div>
                  
            
             <div class=" grid  md:grid-cols-3 md:gap-3 grid-cols-1 ">
                
                    <div v-for=" cus in filterCustomers" :key="cus.id" class="my-2 mx-2 rounded-xl px-2 py-3 shadow-lg transition-shadow duration-400 hover:shadow-sm bg-white/80 backdrop-blur-lg backdrop-filter">
                          <div>
                                <div v-if="cus.profile == null" class="text-sky-700/75 text-3xl px-2 py-2 mb-2 rounded-3xl bg-slate-200">
                                     <PersonIcon/>
                                </div>
                                
                                <img v-else :src="`https://fulfilmm.com/img/profiles/` + cus.profile" alt=""/> 

                            </div>

                            <p class=" ml-12"> {{cus.name}} </p>

                            <p class="text-gray-600/90">  {{cus.phone}} </p>
                            <router-link to="`/customers/invoices/${cus.id}`"> Noop </router-link>
                    </div>
               
             </div>
                  
               
            
            
            
            </div>

            <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
                    <div class="relative w-auto my-6 mx-auto max-w-2xl w-xl">
                        <!--content-->
                        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <!--header-->
                        <div class="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                            <h6>
                                Add New Customer
                            </h6>
                        </div>
                        <!--body-->
                        <div class="relative p-6 flex-auto">
                            <form @submit.prevent="submit">
                                     <div class=" text-left">
                                      
                                        <p v-for=" r in regions" :key="r.id" class=" font-bold"> Region - {{r.name}}</p>
                        </div>

                        <div class=" border-b-2 border-gray-400/30 mb-3">
                            <input type="text" v-model="form.name"  required="required" placeholder=" Enter Name " class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                            <p v-if="! form.name" class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Name Require</p>

                        </div>
                
                        <div class="border-b-2 border-gray-400/30 mb-3">
                          
                            <input type="text" v-model="form.email"  required="required" placeholder="Enter Email" class=" w-full py-2 px-3 rounded-md bg-slate-200"/>
                            <p v-if="! form.email"  class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Email Require</p>
                        </div>
                    
                
                    
                <div class="border-b-2 border-gray-400/30 mb-3">
                   
                        <input type="text" v-model="form.phone"  required="required" placeholder="Enter Phone Number" class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                        <p v-if="! form.phone"  class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Phone Number Require</p>
                </div>

                    <div class="border-b-2 border-gray-400/30 mb-3">
                        <label> Shop</label>
                        <select v-model="form.company_id" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option v-for="c in company" :key="c.id" :value=c.id class="text-sm"> {{c.name}}</option>
                        </select> 
                        <p v-if="! form.company_id" class=" text-xs text-ellipsis text-red-800  font-semibold">Please Select Shop</p>
                    </div>
                
                <div class="border-b-2 border-gray-400/30 mb-3">
                        <label>Customer Type</label>
                        <select v-model="form.customer_type"  class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option value="customer" class="text-sm"> Customer </option>
                        </select>
                        <p v-if="! form.customer_type" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Type</p>
                </div>

                <div class="border-b-2 border-gray-400/30 mb-3">
                        <label> Gender</label>
                        <select v-model="form.gender" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option value="male" class=" text-sm"> Male </option>
                            <option value="female" class=" text-sm"> Female </option>
                        </select>
                        <p v-if="! form.gender" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Gender</p>
                </div>

                <div class="border-b-2 border-gray-400/30 mb-3">
                        <label> Zone</label>
                        <select v-model="form.zone_id" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option v-for="z in zone" :key="z.id" :value=z.id class="text-sm"> {{z.name}} </option>
                            
                        </select>
                        <small v-if="! form.zone_id" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Zone</small>
                </div>
                  <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button class="py-1 px-3  rounded-lg mx-2 bg-red-800 text-white" type="button" v-on:click="toggleModal()">
                            Close
                            </button>
                            <button v-if="! posting" class="py-1 px-3 rounded-lg mx-2 bg-green-800 text-white">
                            Submit
                            </button>

                             <button type="button" v-else class="bg-indigo-300 rounded-lg mx-3 px-2 py-2" disabled>
                            <div class=" flex">
                                <p class=" mr-4 test-sm font-semibold"> Processing... </p>
                                <svg role="status" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-emerald-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                            </div>
                       
                    </button>

                        </div>
                        

                        </form>
                       </div>
                        <!--footer-->
                      
                        </div>
                    </div>
                    </div>
                    <div v-if="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
          
            </div>

         
       
        
  
    </master-layout>
</template>
<script>

import Loader from '../../components/loaderComponent.vue'
import PersonAddIcon from 'vue-material-design-icons/AccountMultiplePlus.vue'
import PersonIcon from 'vue-material-design-icons/Account.vue'
import axios from 'axios';
export default {
 

 components:{
        Loader, PersonAddIcon, PersonIcon
 },
    
    data() {
        return {
            loading: false,
            posting: false,
            showModal: false,
            form:{
                name:'',
                email:'',
                company_id:'',
                phone:'',
                customer_type:'',
                gender:'',
                zone_id:'',
           
            },

            company:[],
            zone:[],
            region:[],
            customers:[],
            search:'',
            err:'',

            
        }
    },

   

  
 
    methods:{
        toggleModal(){
                        this.showModal = !this.showModal;
                        },

        reset(){
            this.form = {
                name:'',
                email:'',
                company_id:'',
                phone:'',
                customer_type:'',
                gender:'',
                zone_id:'',
               
            }
        },

       
        async getData(){
            this.loading = true
            await axios.get(`mobile_invoice/create` ,{ 
                         headers: {
                                    'Authorization': "Bearer" + localStorage.getItem('token'),
                                    },
                                    })
                        .then( res => {
                                this.company = res.data.companies;
                                this.zone = res.data.zone;
                                this.region = res.data.region;
                                this.customers = res.data.allcustomers;
                        })
                        .finally(() => this.loading = false)
        },

     
 
       async submit(){
           this.posting = true;
             await axios.post(`api_customers`, {
                name: this.form.name,
                email: this.form.email,
                company_id: this.form.company_id,
                phone: this.form.phone,
                customer_type: this.form.customer_type,
                gender: this.form.gender,
                zone_id: this.form.zone_id,
                //region_id: this.form.region_id
            }, {
            headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
            },
            }). then(
                response => {
                    this.err = response.message;
                   
                     this.posting = false;
                     this.reset();
                    this.showModal = false;
                     this.getData();
                    window.alert('Successfully Uploaded')
                }
            ). catch( error => {
                console.log(error);
                this.posting = false;
            });
           
          
        } 
    },

    computed:{
        filterCustomers(){
            return this.customers.filter((cus) => {
                return cus.name.toLowerCase().startsWith(this.search.toLowerCase())
            })
        }
    },

    created(){
        this.getData();
        //this.getCus();
    }
}
</script>
<style scoped>
      .top{
         position: fixed;
         top: 30;
         background: white;
        
      
    }

</style>