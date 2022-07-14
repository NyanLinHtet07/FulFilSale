<template>
    <master-layout pageTitle="WholeSales">
        <!-------- for large screen ------------>
        <div class="md:block hidden">
            <Loader class="" v-if="loading"/> 
            <div class=" mt-6 mx-2 flex" v-else>
            <div class=" w-2/5 h-auto mx-1">
                    <div class=" text-left ml-4 my-2">
                        <button  @click="openItems" class=" text-xs px-3 py-1 mx-2 rounded-full shadow-md text-white bg-emerald-500/70"> Products</button>
                        <button @click="openFoc" class="  text-xs px-3 py-1 mx-2 rounded-full shadow-md text-white bg-sky-500/70"> Focs </button>
                    </div>

                    <div v-if=" openItem">
                        <input type="search"  v-model="searchItem" autocomplete="off" class=" w-5/6 rounded-lg drop-shadow-lg py-2 px-3 mb-3" placeholder=" Search Products ..." />

                        <div class=" grid grid-cols-4 gap-2 mx-auto">
                            
                                <div  v-for=" data in filteredItems" :key="data.id" @click="addProduct(data)" class="w-auto col-span-2 px-3 py-2 bg-white bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-lg shadow-sm hover:shadow-xl transition duration-500 ease-in-out">
                                    <img :src="`https://fulfilmm.com/product_picture/` + data.image" class=" object-contain w-28 h-28 rounded-xl px-2 py-1 mx-auto"/>
                                    <p class=" leading-tight font-semibold">{{data.variant.product_name}} </p>
                                    <p class="text-sm">Code - {{ data.variant.item_code}} </p>
                                    <small> {{ data.show_price}} MMK </small>
                                </div>

                        
                        
                        </div>
                    </div>

                    <div v-else>
                        <input type="search"  v-model="state" autocomplete="off" class=" w-5/6 rounded-lg drop-shadow-lg py-2 px-3 mb-3" placeholder=" Search Focs ..." />

                        <div class=" grid grid-cols-4 gap-2 mx-auto">
                            
                                <div  v-for=" data in filteredStates" :key="data.id" @click="addProduct(data)" class="w-auto col-span-2 px-3 py-2 bg-white bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-lg shadow-sm hover:shadow-xl transition duration-500 ease-in-out">
                                    <img :src="`https://fulfilmm.com/product_picture/` + data.image" class=" object-contain w-28 h-28 rounded-xl px-2 py-1 mx-auto"/>
                                    <p class=" leading-tight font-semibold">{{data.variant.product_name}} </p>
                                    <p class="text-sm">Code - {{ data.variant.item_code}} </p>
                                    <small> {{ data.show_price}} MMK </small>
                                </div>

                        
                        
                        </div>
                    </div>
                    
                    
            
            </div>

            <div class=" w-3/5 px-2 py-1 rounded-md bg-white/40 backdrop-blur-lg overflow-y-auto">
                <!----------------------- invoice information --------------------->
                <h3 class=" font-semibold py-2 px-2 text-left"> Invoice information </h3>
                <div class=" grid grid-cols-4 gap-1 rounded-md px-2 py-1 mt-2 mb-4 bg-white/80">
                    <!-------------------- invoice information ------------------->
                        
                            <div class=" col-span-4 mt-1 text-left">
                                        <!-- <label  for="title" class="text-sm block"> Add Title </label> -->
                                            <input type="text" id="title" v-model="saleData.customer_title"  class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/40 w-full" placeholder="Add Title"/>
                                            <p v-if="! saleData.customer_title" class=" text-xs text-ellipsis text-red-800 font-bold">Title Require</p>
                            </div>

                            <div class=" col-span-2">
                                <label  for="inv_date" class="text-sm"> Invoice Date </label>
                                            <input type="date" id="inv_date" v-model="saleData.inv_date" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/40 w-32" placeholder="invoice date" />
                            </div>

                            <div class=" col-span-2">
                                <label for="due_date" class=" text-sm"> Due Date </label>
                                            <input for="due_date" type="date" v-model="saleData.due_date" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/40 w-32" placeholder=" due date"/>
                            </div>

                            <div class=" col-span-2 text-left">
                                <label  for="method" class="text-sm block"> Select Payment Method </label>
                                        <select id="method" v-model="saleData.payment_method" class=" px-2 py-1 rounded-lg bg-emerald-100/40 w-32">
                                            <option v-for="(p,index) in payments"  :key="index" :value="p" class=" bg-white"> {{p}}</option>
                                        </select>
                                        <p v-if="! saleData.payment_method" class=" text-xs text-ellipsis text-red-800 font-bold">Please Select Payment Method</p>
                            </div>

                            <div class=" text-left">
                                <label  for="type" class="text-sm block"> Select Invoice Type</label>
                                        <select id="type" v-model="saleData.invoice_type" class=" px-2 py-1 rounded-lg bg-emerald-100/40 w-32">
                                            <option value="General Invoice"  class=" bg-white"> General Invoice</option>
                                            <option value=" Cash On Delivery"  class=" bg-white"> Cash On Delivery</option>
                                        </select>
                                        <p v-if="! saleData.invoice_type" class=" text-xs text-ellipsis text-red-800 font-bold">Please Select Invoice Type</p>
                            </div>

                            <div>
                                <label  for="zone" class="text-sm block"> Select Zone</label>
                                        <select id="zone" v-model="zone_id" class=" px-2 py-1 rounded-lg bg-emerald-100/40 w-32">
                                            <option v-for="z in zones" :key="z.id" :value="z.id" class="bg-white"> {{z.name}}</option>
                                        </select>
                                        <!-- <p v-if="! zone_id" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Sale Zone</p> -->
                            </div>
                </div>
                    <!------------------- for invoive ------------------------>
            <div class="h-fit mx-1 bg-white/70 p-2 bg-opacity-50 backdrop-blur-md backdrop-filter rounded-lg drop-shadow-lg">
                    <table class="table-auto my-1 border-none  w-full bg-white bg-opacity-40  overflow-x-auto">
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
                <tbody class=" bg-transparent">

                    <!------------------ for items  -------------------->
                    <tr  v-for="(product,index) in cartItems" :key="product.id" class=" border-y border-gray-200/50 text-sm">
                    <td class=" py-2 pl-3 text-center"> {{index + 1}} </td>
            
                    <td class=" py-2 pl-3 text-center">{{ product.product_name}}</td>

                    <td class=" py-2 pl-3 text-center">
                                <div class="dropdown">
                                        <p v-if=" product.unitId == 0"> Select Unit </p>
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
                        <input type="number"  v-model="product.quantity" @keyup="pricing(product.id , product.unitId)" class=" bg-white w-28 py-2 rounded text-center" />
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

                    <td class=" py-2 text-center">{{ (product.price * product.quantity)-(((product.price*product.quantity)/100)*product.discount) }}</td>
                    
                    <td class=" py-2 text-center"> 
                        <button  @click="removeItem(product)" class="p-1 rounded-full bg-red-700/90 drop-shadow-lg shadow-md shadow-red-200 decoration-slate-200 text-white 
                                    hover:drop-shadow-sm hover:opacity-80 hover:shadow-inner
                                    transition ease-in-out duration-300"> 
                                    <DeleteIcon/>
                        </button>
                        </td>
                    </tr>

                    <!---------- end ----------------->

                    <!----------------- for foc ---------->
                    <tr  v-for="foc in focItems" :key="foc.id" class=" bg-slate-500/20 border-y border-gray-200/50 text-sm">
                    <td class=" py-2 pl-3 text-center"> # </td>
            
                    <td class=" py-2 pl-3 text-center">{{ foc.variant.product_name}}</td>

                    <td class=" py-2 pl-3 text-center">
                        <select v-model="foc.unitId" 
                                class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                <option v-for=" u in foc.unit" :key="u.id" :value="u.id">
                                                            <span> {{u.unit}}  </span>
                                                </option>
                        </select>
                    </td>

                    <td class=" py-2 pl-3 text-center"> foc item </td>

                    <td class=" py-2 pl-3 text-center">
                        <input type="number"  v-model="foc.quantity" class=" bg-white w-28 py-2 rounded text-center" />
                    </td>

                    <td class=" py-2 pl-3 text-center">
                        00.00
                    </td>

                    <td class=" py-2 pl-3 text-center">00.00</td>
                    
                    <td class=" py-2 text-center"> 
                        <button  @click="removeFoc(foc)" class="p-1 rounded-full bg-red-700/90 drop-shadow-lg shadow-md shadow-red-200 decoration-slate-200 text-white 
                                    hover:drop-shadow-sm hover:opacity-80 hover:shadow-inner
                                    transition ease-in-out duration-300"> 
                                    <DeleteIcon/>
                        </button>
                        </td>
                    </tr>

                
                </tbody>
                <tfoot class=" bg-white/70 text-sm font-semibold">
                    <tr>
                        <td colspan="6" class="text-right"> Total</td>
                        <td colspan="2"> {{getTotal}} </td>
                    </tr>
                    <tr>
                    <td colspan="6" class="text-right"> Discount </td>
                    <td>
                            <div v-for="cartDis in cartDiscounts" :key="cartDis.id">
                                <div v-if="cartDis.min_amount < getTotal && cartDis.max_amount > getTotal">
                                    <select name="" id="" v-model="tax" class=" rounded-md w-3/6 bg-gray-50  px-2 py-2 mx-auto block">
                                        <option :value="cartDis.rate"> {{cartDis.rate}} </option>
                                    </select>
                                </div>
                                
                            </div>
                        </td> 
                        <td>
                            {{addDis}}
                        </td>
                    </tr>

                    <tr>
                        <td colspan="6" class=" text-right"> Tax</td>
                        <td> 
                            <select name="" id="" v-model="tax" class=" rounded-md w-3/6 bg-gray-50  px-2 py-2 mx-auto block">
                                        <option v-for="(t,index) in taxes" :key="index" :value="t.rate"> {{t.name}} </option>
                                    </select>
                        </td>
                        <td>
                            {{addTax}}   
                        </td>
                    </tr>

                    <tr>
                        <td colspan="6" class=" text-right"> GrandTotal</td>
                        <td colspan="2"> {{ addTotal }} </td>
                    </tr>
                    <tr>
                        <td colspan="6" class=" text-right"> Cash</td>
                        <td colspan="2"> 
                            <input type="number"  v-model="cash" class=" bg-gray-200 w-28 py-2 rounded text-center" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class=" text-right"> Cash Back</td>
                        <td colspan="2"> 
                            <p v-if=" cash == null"> 0 </p>
                            <p v-else> {{ cash - addTotal }} </p>
                        </td>
                    </tr>

                </tfoot>


            </table>
            </div>
            <!------------------end -------------------->



            <!------------------ for customer ------------------>
                
            <div class=" flex justify-between my-2">
                    
                    <div class="w-4/5 mt-2">
                    <input type="search" autocomplete="off" v-model="search" class=" w-full rounded-xl drop-shadow-lg py-2 px-3 mx-2 mb-3" placeholder=" Search Customers ...">
                    <p v-if="! saleData.customer_id" class=" text-xs text-left ml-3 text-ellipsis text-red-800 font-bold">Please Select Customer Name</p>
                    <ul class="" v-if="!(search == '')">
                                <li v-for="data in filteredCustomer" class=" my-1 text-center rounded-lg px-2 py-1 bg-slate-50 hover:shadow-lg transition ease-linear duration-200" :key="data.id" @click="addData(data)" button="true">
                                    <p :value="data"> {{data.name}}</p>
                                </li> 
                            </ul>
                    </div>

                    <div class=" w-1/5">
                    <button  type="button" class=" mr-3 inline-block mt-3 p-1 rounded-full bg-emerald-600/80 text-white drop-shadow-lg shadow-lg shadow-emerald-400" v-on:click="toggleModal()" > <CusIcon/> </button>
                    </div>
                    
            </div>
            <!--------------end --------------------------->


                            

            <!----------------- for external data ----------------->
            <div class=" py-2 px-3 text-left bg-white/90 rounded-md mb-4">
                <h4 class=" my-2 text-left font-semibold"> Customer information </h4>
                    <div class=" grid grid-cols-2 gap-1">
                            <div class="my-1">
                                <input type="text"  v-model="saleData.customer_name" placeholder="Customer Name" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full" readonly/>
                                <!-- <label class="text-sm mb-1">Customer  </label>
                                <h4>{{ saleData.customer_name }}</h4> -->
                            </div>

                            <div class=" my-1">
                                <input type="text" v-model="saleData.customer_email" placeholder="Customer Email" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full" readonly/>
                                <!-- <label class="text-sm mb-1">Email  </label>
                                <h4>{{ saleData.customer_email }}</h4> -->
                            </div>
                            <div>
                                <!-- <label for="phone" class="text-sm block"> Add Customer Phone </label> -->
                                <input type="text" v-model="saleData.customer_phone" placeholder="phone number" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full"/>
                            </div>

                            <div>
                                <!-- <label for="add" class="text-sm block"> Add Customer Address </label> -->
                                <input type="text" id="add" v-model="saleData.customer_address" placeholder="Customer Address" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full" />
                                <p v-if="! saleData.customer_address" class=" text-xs text-ellipsis text-red-800 font-bold">Customer Address Require</p>
                            </div>
                            
                        <div>
                                <!-- <label  for="shipping" class="text-sm block" > Add Shipping Address </label> -->
                                <input type="text" id="shipping" v-model="saleData.customer_shipping" placeholder="Shipping Address" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full"/>
                                <p v-if="! saleData.customer_shipping" class=" text-xs text-ellipsis text-red-800 font-bold"> Shipping Address Require </p>
                            </div>

                            <div>
                                <!-- <label  for="shipping" class="text-sm block"> Add Description </label> -->
                                    <input type="text" v-model="saleData.description" placeholder=" Description " class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full"/>
                            </div>

                            
            </div>
            
            </div>
                <div class=" text-right my-2 mr-5">
                                
                                <button :disabled="posting" type="submit" @click="submitData()" class=" px-2 py-1 w-32 rounded-full bg-emerald-800 text-white" > Submit </button>
                                <!-- <ion-spinner  name="circles" v-if='posting' class=" mx-3"></ion-spinner> -->
                            </div>

            <!------------------------------------ modal box --------------------------------->
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
                                <form @submit.prevent="submitCus()">
                            <div class=" text-left">
                                        
                                            <p v-for=" r in regions" :key="r.id" class=" font-bold"> Region - {{r.name}}</p>
                            </div>

                            <div class=" border-b-2 border-gray-400/30 mb-3">
                                <input type="text" v-model="formCus.name"  required="required" placeholder=" Enter Name " class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                                <p v-if="! formCus.name" class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Name Require</p>

                            </div>
                    
                            <div class="border-b-2 border-gray-400/30 mb-3">
                            
                                <input type="text" v-model="formCus.email"  required="required" placeholder="Enter Email" class=" w-full py-2 px-3 rounded-md bg-slate-200"/>
                                <p v-if="! formCus.email"  class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Email Require</p>
                            </div>
                        
                    
                        
                    <div class="border-b-2 border-gray-400/30 mb-3">
                    
                            <input type="text" v-model="formCus.phone"  required="required" placeholder="Enter Phone Number" class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                            <p v-if="! formCus.phone"  class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Phone Number Require</p>
                    </div>

                        <div class="border-b-2 border-gray-400/30 mb-3">
                            <label> Shop</label>
                            <select v-model="formCus.company_id" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                                <option v-for="c in companies" :key="c.id" :value=c.id class="text-sm"> {{c.name}}</option>
                            </select> 
                            <p v-if="! formCus.company_id" class=" text-xs text-ellipsis text-red-800  font-semibold">Please Select Shop</p>
                        </div>
                    
                    <div class="border-b-2 border-gray-400/30 mb-3">
                            <label>Customer Type</label>
                            <select v-model="formCus.customer_type"  class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                                <option value="customer" class="text-sm"> Customer </option>
                            </select>
                            <p v-if="! formCus.customer_type" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Type</p>
                    </div>

                    <div class="border-b-2 border-gray-400/30 mb-3">
                            <label> Gender</label>
                            <select v-model="formCus.gender" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                                <option value="male" class=" text-sm"> Male </option>
                                <option value="female" class=" text-sm"> Female </option>
                            </select>
                            <p v-if="! formCus.gender" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Gender</p>
                    </div>

                    <div class="border-b-2 border-gray-400/30 mb-3">
                            <label> Zone</label>
                            <select v-model="formCus.zone_id" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                                <option v-for="z in zones" :key="z.id" :value=z.id class="text-sm"> {{z.name}} </option>
                                
                            </select>
                            <small v-if="! formCus.zone_id" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Zone</small>
                    </div>
                    <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button class="py-1 px-3  rounded-lg mx-2 bg-red-800 text-white" type="button" v-on:click="toggleModal()">
                                Close
                                </button>
                                <button v-if="! postingCus" class="py-1 px-3 rounded-lg mx-2 bg-green-800 text-white">
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
            </div>
        </div>
        <!-------------- end -------------------->

        <!---------- for small screen ---------->
         <div class=" md:hidden block">
             <Loader class="" v-if="loading"/>
        <div class=" mt-6 mx-2" v-else>
           <div class=" w-full h-screen mx-1" v-if="shop && !cart && !info">
                <div class=" text-left ml-4 my-2">
                    <button  @click="openItems" class=" text-xs px-3 py-1 mx-2 rounded-full shadow-md text-white bg-emerald-500/70"> Products</button>
                    <button @click="openFoc" class="  text-xs px-3 py-1 mx-2 rounded-full shadow-md text-white bg-sky-500/70"> Focs </button>
                </div>

                <div v-if=" openItem">
                    <input type="search"  v-model="searchItem" autocomplete="off" class=" w-5/6 rounded-lg drop-shadow-lg py-2 px-3 mb-3" placeholder=" Search Products ..." />

                    <div class=" grid grid-cols-4 gap-2 mx-auto">
                        
                            <div  v-for=" data in filteredItems" :key="data.id" @click="addProduct(data)" class="w-auto col-span-2 px-3 py-2 bg-white bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-lg shadow-sm hover:shadow-xl transition duration-500 ease-in-out">
                                <img :src="`https://fulfilmm.com/product_picture/` + data.image" class=" object-contain w-28 h-28 rounded-xl px-2 py-1 mx-auto"/>
                                <p class=" leading-tight font-semibold">{{data.variant.product_name}} </p>
                                <p class="text-sm">Code - {{ data.variant.item_code}} </p>
                                <small> {{ data.show_price}} MMK </small>
                            </div>

                    
                    
                    </div>
                </div>

                <div v-else>
                    <input type="search"  v-model="state" autocomplete="off" class=" w-5/6 rounded-lg drop-shadow-lg py-2 px-3 mb-3" placeholder=" Search Focs ..." />

                    <div class=" grid grid-cols-4 gap-2 mx-auto">
                        
                            <div  v-for=" data in filteredStates" :key="data.id" @click="addProduct(data)" class="w-auto col-span-2 px-3 py-2 bg-white bg-opacity-70 backdrop-blur-lg backdrop-filter rounded-lg shadow-sm hover:shadow-xl transition duration-500 ease-in-out">
                                <img :src="`https://fulfilmm.com/product_picture/` + data.image" class=" object-contain w-28 h-28 rounded-xl px-2 py-1 mx-auto"/>
                                <p class=" leading-tight font-semibold">{{data.variant.product_name}} </p>
                                <p class="text-sm">Code - {{ data.variant.item_code}} </p>
                                <small> {{ data.show_price}} MMK </small>
                            </div>

                    
                    
                    </div>
                </div>
                
                <div class=" fixed bottom-3 right-0 mr-10 z-30">
                     <button disabled v-if="cartItems == 0"  class=" bg-slate-700 rounded-full drop-shadow-md text-gray-100 px-2 py-1"> Select Product First</button>
                      <button v-else @click="cartView" class=" bg-emerald-700 rounded-full drop-shadow-md text-gray-100 px-2 py-1"> Continue</button>
                </div>
               
           
           </div>

           <div class=" w-full px-2 py-1 rounded-md bg-white/40 backdrop-blur-lg overflow-y-auto" >
           
                <!------------------- for invoive ------------------------>
            <div v-if="!shop && cart && !info" >
            <div class="h-fit mx-1 border-none mt-10 bg-white/70 p-2 bg-opacity-50 backdrop-blur-md backdrop-filter rounded-lg drop-shadow-lg" >
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
                <tbody class=" bg-transparent">

                    <!------------------ for items  -------------------->
                    <tr  v-for="(product,index) in cartItems" :key="product.id" class=" border-y border-gray-200/50 text-sm">
                    <td class=" py-2 pl-3 text-center"> {{index + 1}} </td>
            
                    <td class=" py-2 pl-3 text-center">{{ product.product_name}}</td>

                    <td class=" py-2 pl-3 text-center">
                                <div class="dropdown">
                                        <p v-if=" product.unitId == 0"> Select Unit </p>
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
                        <input type="number"  v-model="product.quantity" @keyup="pricing(product.id , product.unitId)" class=" bg-white w-28 py-2 rounded text-center" />
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

                    <td class=" py-2 text-center">{{ (product.price * product.quantity)-(((product.price*product.quantity)/100)*product.discount) }}</td>
                    
                    <td class=" py-2 text-center"> 
                        <button  @click="removeItem(product)" class="p-1 rounded-full bg-red-700/90 drop-shadow-lg shadow-md shadow-red-200 decoration-slate-200 text-white 
                                    hover:drop-shadow-sm hover:opacity-80 hover:shadow-inner
                                    transition ease-in-out duration-300"> 
                                    <DeleteIcon/>
                        </button>
                        </td>
                    </tr>

                    <!---------- end ----------------->

                    <!----------------- for foc ---------->
                    <tr  v-for="foc in focItems" :key="foc.id" class=" bg-slate-500/20 border-y border-gray-200/50 text-sm">
                    <td class=" py-2 pl-3 text-center"> # </td>
            
                    <td class=" py-2 pl-3 text-center">{{ foc.variant.product_name}}</td>

                    <td class=" py-2 pl-3 text-center">
                        <select v-model="foc.unitId" 
                                class="block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                <option v-for=" u in foc.unit" :key="u.id" :value="u.id">
                                                            <span> {{u.unit}}  </span>
                                                </option>
                        </select>
                    </td>

                    <td class=" py-2 pl-3 text-center"> foc item </td>

                    <td class=" py-2 pl-3 text-center">
                        <input type="number"  v-model="foc.quantity" class=" bg-white w-28 py-2 rounded text-center" />
                    </td>

                    <td class=" py-2 pl-3 text-center">
                        00.00
                    </td>

                    <td class=" py-2 pl-3 text-center">00.00</td>
                    
                    <td class=" py-2 text-center"> 
                        <button  @click="removeFoc(foc)" class="p-1 rounded-full bg-red-700/90 drop-shadow-lg shadow-md shadow-red-200 decoration-slate-200 text-white 
                                    hover:drop-shadow-sm hover:opacity-80 hover:shadow-inner
                                    transition ease-in-out duration-300"> 
                                    <DeleteIcon/>
                        </button>
                        </td>
                    </tr>

                
                </tbody>
                <tfoot class=" bg-white/70 text-sm font-semibold">
                    <tr>
                        <td colspan="6" class="text-right"> Total</td>
                        <td colspan="2"> {{getTotal}} </td>
                    </tr>
                    <tr>
                    <td colspan="6" class="text-right"> Discount </td>
                    <td>
                            <div v-for="cartDis in cartDiscounts" :key="cartDis.id">
                                <div v-if="cartDis.min_amount < getTotal && cartDis.max_amount > getTotal">
                                    <select name="" id="" v-model="tax" class=" rounded-md w-3/6 bg-gray-50  px-2 py-2 mx-auto block">
                                        <option :value="cartDis.rate"> {{cartDis.rate}} </option>
                                    </select>
                                </div>
                                
                            </div>
                        </td> 
                        <td>
                            {{addDis}}
                        </td>
                    </tr>

                    <tr>
                        <td colspan="6" class=" text-right"> Tax</td>
                        <td> 
                            <select name="" id="" v-model="tax" class=" rounded-md w-3/6 bg-gray-50  px-2 py-2 mx-auto block">
                                        <option v-for="(t,index) in taxes" :key="index" :value="t.rate"> {{t.name}} </option>
                                    </select>
                        </td>
                        <td>
                            {{addTax}}   
                        </td>
                    </tr>

                    <tr>
                        <td colspan="6" class=" text-right"> GrandTotal</td>
                        <td colspan="2"> {{ addTotal }} </td>
                    </tr>
                    <tr>
                        <td colspan="6" class=" text-right"> Cash</td>
                        <td colspan="2"> 
                            <input type="number"  v-model="cash" class=" bg-gray-200 w-28 py-2 rounded text-center" />
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class=" text-right"> Cash Back</td>
                        <td colspan="2"> 
                            <p v-if=" cash == null"> 0 </p>
                            <p v-else> {{ cash - addTotal }} </p>
                        </td>
                    </tr>

                </tfoot>


            </table>
            </div>
            
            <div class="  fixed bottom-3 right-0 mr-10 z-30 flex justify-end w-full">
                 <div>
                    <button @click="shopView()" class=" px-2 py-1 rounded-full bg-rose-500 drop-shadow-lg text-gray-100 mx-2"> Back</button>
                </div>
                <button type="" @click="infoView" class="px-2 py-1 rounded-full bg-emerald-700 drop-shadow-lg text-gray-100"> Continue </button>
            </div>
            
            </div>
           <!------------------end -------------------->



           <!------------------ for customer ------------------>

            <!----------------------- invoice information --------------------->
             <div v-if="!shop && !cart && info">
              <h3 class=" font-semibold py-2 px-2 text-left"> Invoice information </h3>
            <div class=" grid grid-cols-4 gap-1 rounded-md px-2 py-1 mt-2 mb-4 bg-white/80">
                 <!-------------------- invoice information ------------------->
                      
                         <div class=" col-span-4 mt-1 text-left">
                                    <!-- <label  for="title" class="text-sm block"> Add Title </label> -->
                                        <input type="text" id="title" v-model="saleData.customer_title"  class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/40 w-full" placeholder="Add Title"/>
                                         <p v-if="! saleData.customer_title" class=" text-xs text-ellipsis text-red-800 font-bold">Title Require</p>
                         </div>

                         <div class=" col-span-2">
                              <label  for="inv_date" class="text-sm"> Invoice Date </label>
                                         <input type="date" id="inv_date" v-model="saleData.inv_date" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/40 w-32" placeholder="invoice date" />
                         </div>

                         <div class=" col-span-2">
                              <label for="due_date" class=" text-sm"> Due Date </label>
                                         <input for="due_date" type="date" v-model="saleData.due_date" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/40 w-32" placeholder=" due date"/>
                         </div>

                         <div class=" col-span-4 text-left">
                             <label  for="method" class="text-sm block"> Select Payment Method </label>
                                    <select id="method" v-model="saleData.payment_method" class=" px-2 py-1 rounded-lg bg-emerald-100/40 w-full">
                                        <option v-for="(p,index) in payments"  :key="index" :value="p" class=" bg-white"> {{p}}</option>
                                    </select>
                                     <p v-if="! saleData.payment_method" class=" text-xs text-ellipsis text-red-800 font-bold">Please Select Payment Method</p>
                         </div>

                         <div class=" text-left col-span-2">
                             <label  for="type" class="text-sm block"> Select Invoice Type</label>
                                    <select id="type" v-model="saleData.invoice_type" class=" px-2 py-1 rounded-lg bg-emerald-100/40 w-full">
                                        <option value="General Invoice"  class=" bg-white"> General Invoice</option>
                                        <option value=" Cash On Delivery"  class=" bg-white"> Cash On Delivery</option>
                                    </select>
                                     <p v-if="! saleData.invoice_type" class=" text-xs text-ellipsis text-red-800 font-bold">Please Select Invoice Type</p>
                         </div>

                         <div  class=" text-left col-span-2">
                             <label  for="zone" class="text-sm block"> Select Zone</label>
                                    <select id="zone" v-model="zone_id" class=" px-2 py-1 rounded-lg bg-emerald-100/40 w-full">
                                        <option v-for="z in zones" :key="z.id" :value="z.id" class="bg-white"> {{z.name}}</option>
                                    </select>
                                     <!-- <p v-if="! zone_id" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Sale Zone</p> -->
                         </div>
            </div>
            
           <div class=" flex justify-between my-2">
                
                <div class="w-4/5 mt-2">
                <input type="search" autocomplete="off" v-model="search" class=" w-full rounded-xl drop-shadow-lg py-2 px-3 mx-2 mb-3" placeholder=" Search Customers ...">
                <p v-if="! saleData.customer_id" class=" text-xs text-left ml-3 text-ellipsis text-red-800 font-bold">Please Select Customer Name</p>
                <ul class="" v-if="!(search == '')">
                             <li v-for="data in filteredCustomer" class=" my-1 text-center rounded-lg px-2 py-1 bg-slate-50 hover:shadow-lg transition ease-linear duration-200" :key="data.id" @click="addData(data)" button="true">
                                <p :value="data"> {{data.name}}</p>
                            </li> 
                        </ul>
                </div>

                <div class=" w-1/5">
                <button  type="button" class=" mr-3 inline-block mt-3 p-1 rounded-full bg-emerald-600/80 text-white drop-shadow-lg shadow-lg shadow-emerald-400" v-on:click="toggleModal()" > <CusIcon/> </button>
                </div>
                 
           </div>
           <!--------------end --------------------------->


                        

           <!----------------- for external data ----------------->
           <div class=" py-2 px-3 text-left bg-white/90 rounded-md mb-4">
            <h4 class=" my-2 text-left font-semibold"> Customer information </h4>
                <div class=" grid grid-cols-2 gap-1">
                        <div class="my-1">
                             <input type="text"  v-model="saleData.customer_name" placeholder="Customer Name" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full" readonly/>
                              <!-- <label class="text-sm mb-1">Customer  </label>
                              <h4>{{ saleData.customer_name }}</h4> -->
                        </div>

                        <div class=" my-1">
                             <input type="text" v-model="saleData.customer_email" placeholder="Customer Email" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full" readonly/>
                            <!-- <label class="text-sm mb-1">Email  </label>
                             <h4>{{ saleData.customer_email }}</h4> -->
                        </div>
                        <div>
                             <!-- <label for="phone" class="text-sm block"> Add Customer Phone </label> -->
                            <input type="text" v-model="saleData.customer_phone" placeholder="phone number" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full"/>
                        </div>

                        <div>
                             <!-- <label for="add" class="text-sm block"> Add Customer Address </label> -->
                            <input type="text" id="add" v-model="saleData.customer_address" placeholder="Customer Address" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full" />
                             <p v-if="! saleData.customer_address" class=" text-xs text-ellipsis text-red-800 font-bold">Customer Address Require</p>
                        </div>
                        
                       <div>
                            <!-- <label  for="shipping" class="text-sm block" > Add Shipping Address </label> -->
                            <input type="text" id="shipping" v-model="saleData.customer_shipping" placeholder="Shipping Address" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full"/>
                             <p v-if="! saleData.customer_shipping" class=" text-xs text-ellipsis text-red-800 font-bold"> Shipping Address Require </p>
                         </div>

                         <div>
                             <!-- <label  for="shipping" class="text-sm block"> Add Description </label> -->
                                 <input type="text" v-model="saleData.description" placeholder=" Description " class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full"/>
                         </div>

                        
           </div>
        
           </div>
            <div class=" flex justify-between my-2 mr-5">
                             <button @click="cartView()" class=" px-2 py-1 rounded-full bg-rose-500 text-gray-100"> Back</button>
                             <button :disabled="posting" type="submit" @click="submitData()" class=" px-2 py-1 w-32 rounded-full bg-emerald-800 text-white" > Submit </button>
                             <!-- <ion-spinner  name="circles" v-if='posting' class=" mx-3"></ion-spinner> -->
                        </div>

          
        
        </div>

           <!------------------------------------ modal box --------------------------------->
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
                             <form @submit.prevent="submitCus()">
                        <div class=" text-left">
                                      
                                        <p v-for=" r in regions" :key="r.id" class=" font-bold"> Region - {{r.name}}</p>
                        </div>

                        <div class=" border-b-2 border-gray-400/30 mb-3">
                            <input type="text" v-model="formCus.name"  required="required" placeholder=" Enter Name " class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                            <p v-if="! formCus.name" class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Name Require</p>

                        </div>
                
                        <div class="border-b-2 border-gray-400/30 mb-3">
                          
                            <input type="text" v-model="formCus.email"  required="required" placeholder="Enter Email" class=" w-full py-2 px-3 rounded-md bg-slate-200"/>
                            <p v-if="! formCus.email"  class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Email Require</p>
                        </div>
                    
                
                    
                <div class="border-b-2 border-gray-400/30 mb-3">
                   
                        <input type="text" v-model="formCus.phone"  required="required" placeholder="Enter Phone Number" class=" w-full py-2 px-3 rounded-md bg-slate-200" />
                        <p v-if="! formCus.phone"  class=" text-xs text-ellipsis text-left mr-3 mt-2 text-red-800 font-semibold">Customer Phone Number Require</p>
                </div>

                    <div class="border-b-2 border-gray-400/30 mb-3">
                        <label> Shop</label>
                        <select v-model="formCus.company_id" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option v-for="c in companies" :key="c.id" :value=c.id class="text-sm"> {{c.name}}</option>
                        </select> 
                        <p v-if="! formCus.company_id" class=" text-xs text-ellipsis text-red-800  font-semibold">Please Select Shop</p>
                    </div>
                
                <div class="border-b-2 border-gray-400/30 mb-3">
                        <label>Customer Type</label>
                        <select v-model="formCus.customer_type"  class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option value="customer" class="text-sm"> Customer </option>
                        </select>
                        <p v-if="! formCus.customer_type" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Type</p>
                </div>

                <div class="border-b-2 border-gray-400/30 mb-3">
                        <label> Gender</label>
                        <select v-model="formCus.gender" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option value="male" class=" text-sm"> Male </option>
                            <option value="female" class=" text-sm"> Female </option>
                        </select>
                        <p v-if="! formCus.gender" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Gender</p>
                </div>

                <div class="border-b-2 border-gray-400/30 mb-3">
                        <label> Zone</label>
                        <select v-model="formCus.zone_id" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option v-for="z in zones" :key="z.id" :value=z.id class="text-sm"> {{z.name}} </option>
                            
                        </select>
                        <small v-if="! formCus.zone_id" class=" text-xs text-ellipsis text-red-800 font-semibold">Please Select Zone</small>
                </div>
                  <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button class="py-1 px-3  rounded-lg mx-2 bg-red-800 text-white" type="button" v-on:click="toggleModal()">
                            Close
                            </button>
                            <button v-if="! postingCus" class="py-1 px-3 rounded-lg mx-2 bg-green-800 text-white">
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
        </div>
        </div>

        <!------------ end --------------------->
    </master-layout>
   
</template>

<script>
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import CusIcon from 'vue-material-design-icons/AccountMultiplePlus.vue'
import axios from 'axios'
import { mapGetters } from "vuex";
import moment from 'moment'

const url = "mobile_invoice/create";
import Loader from '../../components/loaderComponent.vue'
export default {
    components:{
        DeleteIcon , Loader, CusIcon
    },

     data() {
        return {
            shop:true,
            cart:false,
            info:false,

            cash:null,
            showModal: false,
            posting:false,
            postingCus: false,
            loading: false,
            test:'',
            openItem: true,
            visiable:false,
            err:'',
            
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
            companies:[],
            regions:[],
            warehouse:{},
            d:[],

               formCus:{
                name:'',
                email:'',
                company_id:'',
                phone:'',
                customer_type:'',
                gender:'',
                zone_id:'',
                //region_id:'',
            },

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
        shopView(){
            this.shop = true;
            this.cart = false;
            this.info = false;
            },
        
        cartView(){
            this.shop = false;
            this.cart = true;
            this.info = false;
        },

        infoView(){
             this.shop = false;
            this.cart = false;
            this.info = true;
        },



           toggleModal(){
                        this.showModal = !this.showModal;
                        },

            resetCus(){
            this.formCus = {
                name:'',
                email:'',
                company_id:'',
                phone:'',
                customer_type:'',
                gender:'',
                zone_id:'',
                //region_id:'',
            }
        },



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
                this.search = '';
               
        },


         async submitCus(){
           this.postingCus = true;
             await axios.post(`api_customers`, {
                name: this.formCus.name,
                email: this.formCus.email,
                company_id: this.formCus.company_id,
                phone: this.formCus.phone,
                customer_type: this.formCus.customer_type,
                gender: this.formCus.gender,
                zone_id: this.formCus.zone_id,
                //region_id: this.form.region_id
            }, {
            headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
            },
            })
            .then((response) => {
                     this.err = response.message
                     this.postingCus = false;
                     this.resetCus();
                     this.wholeSales();
                     window.alert('Successfully, Customer Added')
                    this.showModal = false;
                     
                })
            .catch( error => {
                console.log(error);
                this.postingCus = false;
                //this.showModal = true
            })

            //console.log(response)
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
                     window.alert('Please Fill Required Field')
                    this.posting = false;
               }

               else{
                 this.posting = false ;
                this.$router.push({name:'invoice.detail', params:{id :inv_id}});
                this.show();
                 this.reset();
                 this.clearCartData();
                 this.cash == null;
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
                        this.companies = res.data.companies;
                        this.regions = res.data.region;
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