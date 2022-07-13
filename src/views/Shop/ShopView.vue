<template>
    <master-layout pageTitle="Shops">
        <div v-if="loading">
            <Loader/>
        </div>

             <div v-else>
                 <div  class=" mb-14 pb-3">
                    
                    <div class="fixed top-16 bg-transparent z-30 w-5/6 mx-auto block">
                        <input type="search" v-model="search" placeholder=" search shops ..." class=" w-4/5 rounded-xl drop-shadow-lg shadow-emerald-200 py-2 px-3 mb-3 mx-2"/> 
                         <button  type="button" class=" ml-3 inline-block mt-3 px-3 py-1 rounded-full bg-emerald-600/80 text-white drop-shadow-lg shadow-lg shadow-emerald-400" v-on:click="toggleModal()" > 
                            Add
                        </button>
                    </div>
                     
                    <div class=" mt-32">

                        <table class="table-auto border-collapse:separate rounded-xl border-0 border-accent w-5/6 my-6 bg-white bg-opacity-40 backdrop-blur-md mx-auto drop-shadow-sm shadow-2xl shadow-sky-200">
                        <thead class=" border-y border-gray-300/60">
                            <tr>
                            <th class=" py-2 font-bold text-sm">No</th>
                            <th class=" py-2 font-bold text-sm">Img</th>
                            <th class=" py-2 font-bold text-sm">Name</th>
                            <th class=" py-2 font-bold text-sm"> Phone</th>
                            <th class=" py-2 font-bold text-sm"> Branch</th>
                            <th class=" py-2 font-bold text-sm"> Region</th>
                            <th class=" py-2 font-bold text-sm"> Zone </th>
                            <!-- <th class="py-2 font-thin">Detail</th> -->
                            
                            </tr>
                        </thead>
                        <tbody class=" bg-white bg-opacity-60 backdrop-blur-md ">
                            <tr v-for="(shop,index) in filteredShop" :key="index" class=" border-y border-gray-400/50 text-sm">
                            <td class=" py-2 pl-3 text-center">{{index + 1}}</td>
                            <td class=" py-2 pl-3 text-center">
                                <div  v-if="shop.picture == null" alt="" class="object-scale-down h-10 w-10 p-1 rounded mx-auto">
                                    <ShopIcon/>
                                </div>
                                <img :src="`https://fulfilmm.com/img/profiles/` + shop.picture" v-else alt="" srcset="" class="object-scale-down h-10 w-10 p-1 rounded-md mx-auto">

                            </td>
                            <td class=" py-2 pl-3 text-center">{{shop.name}}</td>
                            <td class=" py-2 pl-3 text-center text-sm">{{shop.phone}}</td>
                             <td class=" py-2 pl-3 text-center text-sm">{{shop.branch.name}}</td>
                              <td class=" py-2 pl-3 text-center text-sm">{{shop.region.name}}</td>
                              <td class=" py-2 pl-3 text-center text-sm">
                                <p v-if=" shop.zone == null"> There is no zone</p>
                                <p v-else>{{ shop.zone.name}}</p>
                              </td>
                        
                            <!-- <td class=" py-2 text-center">
                                <router-link :to="`/shops/detail/${shop.id}`" class="p-2 text-xs rounded-full bg-emerald-700/90  drop-shadow-lg shadow-md shadow-emerald-200 decoration-slate-200 text-white 
                                            hover:drop-shadow-sm hover:opacity-80 hover:shadow-inner
                                            transition ease-in-out duration-300"> 
                                            View
                                </router-link> 
                            </td> -->
                            
                            </tr>
                        
                        </tbody>
                    </table>

                      
                   
                </div>
                
                </div>


            <!----------------------  modal --------------------->
            <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed mt-4 inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
                    <div class="relative w-auto my-6 mx-auto max-w-2xl w-xl">
                        <!--content-->
                        <div class="border-0 mt-48  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <!--header-->
                        <div class="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                            <h6>
                                Add New Shop
                            </h6>
                        </div>
                        <!--body-->
                        <div class="relative p-3  flex-auto">
                            <form @submit.prevent="submit">
                                  

                        <div class=" border-b-2 border-gray-400/30 mb-2">
                            <input type="text" v-model="form.name"  required="required" placeholder=" Enter Name " class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                            <p v-if="! form.name" class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Name Require</p>

                        </div>

                         <div class=" border-b-2 border-gray-400/30 mb-2">
                            <input type="text" v-model="form.contact"  required="required" placeholder=" Enter Contact " class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                            <p v-if="! form.name" class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Name Require</p>

                        </div>

                        <div class="border-b-2 border-gray-400/30 mb-2">
                   
                            <input type="text" v-model="form.phone"  required="required" placeholder="Enter Phone Number" class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                            <p v-if="! form.phone"  class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Phone Number Require</p>
                        </div>

                        <div class="border-b-2 border-gray-400/30 mb-2 text-left grid grid-cols-2 gap-2">
                        <label>Select Type</label>
                            <select v-model="form.shop_type"  class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                                <option value="wholesales" class="text-sm"> WholeSales </option>
                                <option value="retailsales" class="text-sm"> RetailSales </option>
                            </select>
                            <p v-if="! form.shop_type" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Type</p>
                    </div>
                

                    <div class="border-b-2 border-gray-400/30 mb-2 text-left grid grid-cols-2 gap-2">
                        <label> Select Branch</label>
                        <select v-model="form.branch_id" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option v-for="b in branches" :key="b.id" :value=b.id class="text-sm"> {{b.name}}</option>
                        </select> 
                        <p v-if="! form.branch_id" class=" text-xs text-ellipsis text-red-800  font-semibold">Please Select Branch</p>
                    </div>

                       <div class="border-b-2 border-gray-400/30 mb-2 text-left grid grid-cols-2 gap-2">
                        <label> Select Region</label>
                        <select v-model="form.region_id" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option v-for="r in regions" :key="r.id" :value=r.id class="text-sm"> {{r.name}}</option>
                        </select> 
                        <p v-if="! form.region_id" class=" text-xs text-ellipsis text-red-800  font-semibold">Please Select Region</p>
                    </div>
                
                

                <div class="border-b-2 border-gray-400/30 mb-2 text-left grid grid-cols-2 gap-2">
                        <label> Zone</label>
                        <select v-model="form.zone_id" class=" px-2 py-1 rounded-md w-28 text-sm ml-6">
                            <option v-for="z in zones" :key="z.id" :value=z.id class="text-sm"> {{z.name}} </option>
                            
                        </select>
                        <p v-if="! form.zone_id" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Zone</p>
                </div>

                 <div class=" border-b-2 border-gray-400/30 mb-2">
                            <input type="text" v-model="form.township"  required="required" placeholder=" Enter Township " class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                            <p v-if="! form.township" class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Name Require</p>

                </div>

                 <div class=" border-b-2 border-gray-400/30 mb-2">
                            <input type="text" v-model="form.address"  required="required" placeholder=" Enter Address " class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                            <p v-if="! form.address" class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Address Require</p>

                </div>

                 <div class=" border-b-2 border-gray-400/30 mb-2">
                            <input type="text" v-model="form.description"  required="required" placeholder=" Enter Description " class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                            <!-- <p v-if="! form.name" class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Name Require</p> -->

                </div>

                <div>
                    <input type="file" ref="img" @change="onChangeFileUpload()" />
                            <label class=" text-sm text-ellipsis text-red-800 font-bold"> you can upload files up to 8MB</label>
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
import ShopIcon from 'vue-material-design-icons/StorefrontOutline.vue'



import axios from 'axios';
export default {

      data(){
        return {
          
            posting: false,
            loading: false,
             showModal: false,
            shops:[],
            branches:[],
            regions:[],
            zones:[],
            d:[],
            search:'',
            searchZone:'',
          
            location:'',
            form:{
                name:'',
                pictrue:'',
                contact:'',
                phone:'',
                branch_id:'',
                region_id:'',
                zone_id:'',
                shop_type:'',
                township:'',
                address:'',
                description:'',
            },
            img:'',
            m:'',
        }
    },

  

    components:{
       Loader, ShopIcon
    },

    methods: {
        toggleModal(){
                        this.showModal = !this.showModal;
                        },

       getPosition(){
            this.$getLocation()
            .then((coordinates) => {
                //window.alert(coordinates.lat);
                console.log(coordinates.lat +','+ coordinates.lng)
                this.location = coordinates.lat +','+ coordinates.lng
            })
            .catch((error) => {
                console.log(error);
            });
        },

        reset(){
            this.form = {
                name:'',
                img:'',
                contact:'',
                phone:'',
                branch_id:'',
                description:'',
            }
        },

         async getData(){
            this.loading = true;
            await axios.get(`shops` , {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                }) 
                .then( (res) => {
                  this.shops = res.data.shops;
                  this.branches = res.data.branch;
                  this.regions = res.data.region;
                  this.zones = res.data.zone;
                  this.d = res.data;
                })
                .finally(() => this.loading = false)
        },

    
        onChangeFileUpload(){
            this.form.img = this.$refs.img.files[0];
        },


        //get current position

        // async currentPosition() {
        //             const coordinates = await Geolocation.getCurrentPosition();
        //             this.location = coordinates.coords.latitude +','+ coordinates.coords.longitude;
        //         },
        
        async submit(){



            if(this.location == ''){
                window.alert('Please Check GPS');
            }

            else{
                 this.posting = true
             
           
            var data = new FormData();

            data.append('name' , this.form.name);
            data.append('location', this.location);

            if(! this.form.img){
                 data.append('img', 0);
            }
            else{
                 data.append('img', this.form.img);
            }
           
            data.append('contact', this.form.contact);
            data.append('phone', this.form.phone);
            data.append('branch_id', this.form.branch_id);
            data.append('region_id', this.form.region_id);
            data.append('zone_id', this.form.region_id);
            data.append('shop_type', this.form.shop_type);
            data.append('township', this.form.township);
            data.append('address',  this.form.address);
            data.append('description', this.form.description);

           
               await axios.post(`shops`, data,{
             headers: {
                 'content-type': 'multipart/form-data',
                'Authorization': "Bearer" + localStorage.getItem('token'),
            },}).then(
                (res) => {
                    this.m = res.message;
                     this.posting = false;
                     this.reset();
                     this.getData();
                    
                        this.location = {
                            lat :'',
                            lng:'',
                        }
                    this.showModal = false;
                }
            ).catch( error => {
                console.log(error);
                this.posting = false;
            });
            }
            
           

            //console.log(res);
        }
    },

    computed:{
        filteredShop(){
            return this.shops.filter( (s) => {
                return  s.name.toLowerCase().startsWith(this.search.toLowerCase());
                // return  s.name.toLowerCase().match(this.search.toLowerCase()) || 
                // s.region.name.toString().toLowerCase().match(this.search.toLowerCase()) ||
                //  s.zone.name.toString().toLowerCase().match(this.search.toLowerCase()) ||
                //   s.branch.name.toString().toLowerCase().match(this.search.toLowerCase())
            })
        }
    },

    created() {
        this.getData();
        this.getPosition();
      
    },

       
    
    
  
}
</script>