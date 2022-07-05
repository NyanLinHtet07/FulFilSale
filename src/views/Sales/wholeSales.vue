<template>
    <master-layout pageTitle="WholeSales">
         <!-- <Loader class=""/> -->
         <!-- <div class=" inline">
        
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
         </div> -->
       
        
       <div class=" mt-6 mx-2 flex h-fit">
           <div class=" w-2/5 mx-1">
                  <input type="search"  v-model="searchItem" autocomplete="off" class=" w-5/6 rounded-lg drop-shadow-lg py-2 px-3 mb-3" placeholder=" Search ..." />

                <div class=" grid grid-cols-4 gap-2 mx-auto">
                    
                         <div  v-for=" data in filteredItems" :key="data.id" @click="addProduct(data)" class="w-auto col-span-2 px-3 py-2 bg-white/70 backdrop-blur-sm backdrop-filter rounded-lg shadow-sm hover:shadow-xl transition duration-500 ease-in-out">
                             <img :src="`https://fulfilmm.com/product_picture/` + data.image" class=" object-contain w-28 h-28 rounded-xl px-2 py-1 mx-auto"/>
                            <p>{{data.variant.product_name}}</p>
                         </div>

                   
                   
                </div>
           
           </div>
           <div class=" w-3/5 mx-1 bg-white/70 p-2 bg-opacity-50 backdrop-blur-md backdrop-filter rounded-lg drop-shadow-lg">
                <table class="table-auto my-1 border-none  w-full bg-white bg-opacity-40">
            <thead class=" border-y border-gray-300/30 bg-white/80">
                <tr class="text-sm">
                <th class=" py-2 font-thin">No</th>
                <!-- <th class="py-2 font-thin">Icon</th> -->
                <th class=" py-2 font-thin">Name</th>
                <th class="py-2 font-thin"> Unit</th>
                <th class="py-2 font-thin"> Price</th>
                <th class="py-2 font-thin"> Qty</th>
                <th class="py-2 font-thin"> Dis </th>
                <th class="py-2 font-thin"> Total</th>
                <th class=" py-2 font-thin">Delete</th>
                </tr>
            </thead>
            <tbody class=" bg-tr">
                <tr  v-for="(product,index) in cartItems" :key="product.id" class=" border-y border-gray-200/50 text-sm">
                <td class=" py-2 pl-3 text-center"> {{index + 1}} </td>
           
                <td class=" py-2 pl-3 text-center">{{ product.product_name}}</td>

                <td class=" py-2 pl-3 text-center">
                             <div class="dropdown">
                                    <p v-if=" product.unitId == 0" class=" mt-2"> Select Unit </p>
                                    <p v-else v-for="uni in product.unit" :key="uni.id" class="mt-2">
                                        <span v-if="product.unitId == uni.id"> {{ uni.unit}}</span>    
                                    </p>  

                                             <ul class="dropdown-content">
                                                <li  v-for="u in product.unit" :key="u.id"  @click="pricing(product.id , u.id)" class=" my-2 rounded px-2 py-2 bg-white text-sm"> {{u.unit}} </li>
                                            </ul>  
                                </div> 
                </td>

                <td class=" py-2 pl-3 text-center">{{ product.price}}</td>

                <td class=" py-2 pl-3 text-center">
                     <input type="number"  v-model="product.quantity" @keyup="pricing(product.id , product.unitId)" class=" bg-white text-sm" />
                </td>

                <td class=" py-2 pl-3 text-center">
                    <div v-for="(dis,index) in itemDiscounts" :key="index">
                                <span v-if="product.variant.id == dis.variant_id">
                                                        <select v-model="product.discount" class="text-sm block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                            <option :value="dis.rate">{{dis.rate}} %</option>
                                                        </select>
                                </span>
                            </div>
                </td>

                <td class=" py-2 pl-3 text-center">{{ (product.price * product.quantity)-(((product.price*product.quantity)/100)*product.discount) }}</td>
                 
                  <td class=" py-2 text-center"> 
                      <button  @click="removeItem(product)" class="p-1 rounded-full bg-red-700/90 drop-shadow-lg shadow-md shadow-red-200 decoration-slate-200 text-white 
                                  hover:drop-shadow-sm hover:opacity-80 hover:shadow-inner
                                  transition ease-in-out duration-300"> 
                                  <DeleteIcon/>
                    </button>
                    </td>
                </tr>
              
            </tbody>
        </table>
           </div>
       </div>
    </master-layout>
   
</template>

<script>
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import axios from 'axios'
import { mapGetters } from "vuex";
import moment from 'moment'

const url = "mobile_invoice/create";
//import Loader from '../../components/loaderComponent.vue'
export default {
    components:{
        DeleteIcon
    },

     data() {
        return {
            posting:false,
            loading: false,
            test:'',
            openItem: true,
            visiable:false,
           
            unitId:'',
            tax:'',
            deli:'',
            discount:'',
            state:'',
            searchItem:'',
            search:'',
            zone_id:'',
            moment:moment,

            payments:[],
            products:[],
            prices:[],
            focs:[],
            itemDiscounts:[],
            taxes:[],
            cartDiscounts:[],
            units:[],
            customers:[],
            zones:[],
            warehouse:{},
            d:[],

            saleData: {
                inv_date: moment().format('YYYY-MM-DD'),
                due_date: moment().add('day', 1) . format('YYYY-MM-DD'),
                cartItems:'',
                focs:'',
                tax_rate:'',
                tax_amount:'',
                discount:'',
                deli:'',
                totalPrice:'',
                grandtotal:'',
                payment_method:'',
                invoice_type:'',
                customer_id:'',
                customer_name:'',
                customer_address:'',
                customer_phone:'',
                customer_email:'',
                customer_title:'',
                customer_shipping:'',
                description:'',
            }
            
        }
    },

 
    methods:{

      

        pricing(p_id , u_id){
            this.cartItems.map( item => {
                 if(item.id == p_id){
                     item.unitId = u_id


                     item.unit.filter ( u =>{
                        if( u.id == u_id){

                            let avl = Number(item.available); 

                            let qty = Math.trunc(Number(item.quantity) * Number(u.unit_convert_rate));

                            
                            if( avl < qty){
                                item.quantity = Math.trunc( avl /Number(u.unit_convert_rate));
                                window.alert("Not Enough Quantity, it is only remaining " + item.quantity  + " " + u.unit)
                            }
                        }
                     })



                 
                    this.prices.filter( price => {
   
                            if(item.variant_id == price.product_id){
                                if(price.unit_id == u_id){
 
                                        if(price.min <= item.quantity )
                                                {
                                                   return item.price = price.price
                                                }
                                    }
                                else{
                                    return item.price = 0
                                }
      
                                }

                    })

                    this.prices.forEach((price, index) => {
                                    if(price.unit_id == u_id && item.variant_id == price.product_id){
                                         if(price.min <= item.quantity )
                                                {
                                                    item.price = price.price
                                                    console.log(price);
                                                    console.log(index);
                                                }
                                            
                                        
                                    }
                                
                                   
                                });
                 }
                
            })
        },

       

        openItems(){
            this.openItem = true
        },

        openFoc(){
            this.openItem = false
        },

         reset(){
            this.saleData = {
                 inv_date:'',
                due_date:'',
                cartItems:'',
                focs:'',
                tax_rate:'',
                tax_amount:'',
                discount:'',
                deli:'',
                totalPrice:'',
                grandtotal:'',
                payment_method:'',
                invoice_type:'',
                customer_id:'',
                customer_name:'',
                customer_address:'',
                customer_phone:'',
                customer_email:'',
                customer_title:'',
                customer_shipping:'',
                description:'',
            }
        },
          addProduct(data){
            this.$store.dispatch("addToCart", data);
        },

        remove(product){
            this.$store.dispatch('removeItem', product);
        },

        removeItem(product){
            this.$store.dispatch('removeProduct', product);
        },

      

        clearCartData(){
            this.$store.dispatch("clearCart");
        },
 
        addFoc(data){
            this.$store.dispatch("addFoc", data)
        },

        removeFocitems(foc){
            this.$store.dispatch("removeFocItems", foc)
        },

        removeFoc(foc){
            this.$store.dispatch('removeFoc', foc)
        },

      

        hide(){
            this.visiable = true;
        }, 

        show(){
            this.visiable = false;
        },

        //for customer
         addData(data){
                this.saleData.customer_id = data.id;
                this.saleData.customer_name = data.name;
                this.saleData.customer_phone = data.phone;
                this.saleData.customer_email = data.email;
                this.saleData.customer_address = data.address;
               
        },

       
      

        async submitData(){
                let itemary = JSON.stringify(this.finalItems);
                let focary = JSON.stringify(this.finalFocs);

                this.posting = true;
                const response = await axios.post (  "https://www.fulfilmm.com/api/auth/mobile_invoice" ,{
                    title: this.saleData.customer_title,
                    client_id : this.saleData.customer_id,
                    inv_date : this.saleData.inv_date,
                    due_date : this.saleData.due_date,
                    client_address : this.saleData.customer_address,
                    bill_address : this.saleData.customer_shipping,
                    payment_method : this.saleData.payment_method,
                    order_items : itemary,
                    client_email : this.saleData.customer_email,
                    inv_grand_total : this.addTotal,
                    tax_rate : this.tax,
                    total : this.getTotal,
                    invoice_type: this.saleData.invoice_type,
                    delivery_fee: 0 ,
                    warehouse_id: this.warehouseId,
                    sale_type: 'Whole Sale',
                    foc_items: focary,
                    tax_amount: this.addTax,
                    discount: this.addDis,
                    zone_id: this.zone_id 
                }, { 
                 headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                },
             
                });

                const inv_id = response.data.invoice_id;
               
               if( inv_id == null){
                //    this.presentAlert();
                    this.posting = false;
               }

               else{
                 this.posting = false ;
                this.$router.push({name:'invoice.detail', params:{id :inv_id}});
                this.show();
                 this.reset();
                 this.clearCartData();
               }
               
             
        },



         async wholeSales(){
             this.loading = true
              await axios.get(url, { 
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                })
                    .then(res => {
                        this.d = res.data;
                        this.payments = res.data.payment_method;
                        this.products = res.data.aval_product;
                        this.prices = res.data.prices
                        this.focs = res.data.focs
                        this.units = res.data.unit
                        this.itemDiscounts = res.data.dis_promo
                        this.taxes = res.data.taxes
                        this.cartDiscounts = res.data.amount_discount
                        this.customers = res.data.allcustomers
                        this.zones = res.data.zone
                        this.warehouse = res.data.warehouse
                    })
                    .finally(() => this.loading = false)
        }
        

    },

    computed:{

        filteredStates(){
            
                return this.focs.filter( state => {
                    return state.variant.product_name.toLowerCase().match(this.state.toLowerCase());
            })
            
        },

         filteredItems(){
                
                        return this.products.filter( p => {
                        return p.variant.product_name.toLowerCase().match(this.searchItem.toLowerCase());
                    })
                
            
        },

        filteredCustomer(){
            if(this.search == ''){
                return ''
            }

            else{
                 return this.customers.filter( state => {
                    return state.name.toLowerCase().startsWith(this.search.toLowerCase());
            })
            }
               
        
        },


        warehouseId(){
            return this.warehouse.id;
        },

         customer(){
            return this.$store.state.customer;
        },
        
         cartItems(){
            return this.$store.getters.cartItems;
        },

            focItems(){
                return this.$store.getters.focs;
            },

            finalFocs(){
                return this.$store.getters.finalFocs;
            },

            finalItems(){
                return this.$store.getters.finalItems;
            },

        ...mapGetters(["getTotal"]),

        addTotal(){
            let a = Number(this.getTotal);
            let b = Number(this.addTax);
            let d = Number(this.deli);
            let dis = Number(this.addDis);
            let c = (a - dis) + ( b + d );
            return c.toFixed(2);
        },

        addTax(){
            let t = Number(this.tax);
            let amt = Number(this.getTotal);
            let tax = (amt / 100)*t;

            return tax.toFixed(2);
        },

        addDis(){
            let d = Number(this.discount);
            let amt = Number(this.getTotal);
            let dis = (amt/100)*d;

            return dis.toFixed(2);
        },

       


    },

  

    created() {
        this.wholeSales();
       
    },
    


}
</script>

<style scoped>
    
    .dropdown {
        position: relative;
        display: inline-block;
        }

        .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 12px 16px;
        z-index: 1;
        }

        .dropdown:hover .dropdown-content {
        display: block;
        }
</style>