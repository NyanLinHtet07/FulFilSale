<template>
   <master-layout pageTitle="Invoice Detail">

  
            <div v-if="loading">
                    <Loader/> 
            </div>
            <div v-else class=""> 
                <div v-if=" invoice.cancel == 1">
                    <p class=" text-red-700 font-bold text-xl"> This invoice was canceled</p>
                </div>
                <div v-else class=" flex mb-3">
                    <button class="mx-2 px-2 py-1 rounded-xl text-sm drop-shadow-md shadow-md shadow-stone-300 bg-stone-500 text-white
                                    hover:bg-stone-600/50 transition duration-200 ease-in-out " 
                        @click="markSent()" :disabled="invoice.mark_sent == 1"> Mark Send </button>
                
                    <button @click="toggleModal" class="mx-2 px-2 py-1 rounded-xl text-sm drop-shadow-md shadow-md shadow-lime-100 bg-lime-500 text-white
                                    hover:bg-lime-600/50 transition duration-200 ease-in-out" 
                     :disabled=" invoice.due_amount == 0"> Make Paymeny </button>
                    
                    <div v-if="invoice.status == 'Draft' && invoice.mark_sent == 0">
                        <button @click="edit()" v-if=" !visible"  
                        class="mx-2 px-2 py-1 rounded-xl text-sm drop-shadow-md shadow-md shadow-sky-100 bg-sky-500 text-white
                                    hover:bg-sky-600/50 transition duration-200 ease-in-out"> Edit </button>

                        <button @click="detail()" v-if="visible" 
                        class="mx-2 px-2 py-1 rounded-xl text-sm drop-shadow-md shadow-md shadow-orange-100 bg-orange-900 text-white
                                    hover:bg-orange-600 transition duration-200 ease-in-out"> Detail </button>
                    </div>
                    <div v-else>
                        <button disabled class="mx-2 px-2 py-1 rounded-xl text-sm drop-shadow-md shadow-md shadow-slate-100 bg-slate-500 text-white
                                    hover:bg-slate-600/50 transition duration-200 ease-in-out"> Disable To edit</button>
                    </div>
                    
                    <!-- <ion-button color="medium" shape="round"> Stock Out </ion-button> -->
                   

                    <button @click="destroy()" class="mx-2 px-2 py-1 rounded-xl text-sm drop-shadow-md shadow-md shadow-red-100 bg-red-500 text-white
                                    hover:bg-red-600/50 transition duration-200 ease-in-out"> Cancel </button>

                      <button @click="print()" class="mx-2 px-2 py-1 rounded-xl text-sm drop-shadow-md shadow-md shadow-fuchsia-100 bg-fuchsia-500 text-white
                                    hover:bg-fuchsia-600/50 transition duration-200 ease-in-out"> print </button>
                </div>
               
                   
            
                
                <div class=" bg-white rounded-md shadow-md px-3 py-6 mx-3" v-if="! visible">
                            <div class=" flex justify-between mb-5">
                                <div v-if="company == null">
                                    <img src="/assets/err1.png" alt="" srcset="" class="object-contain h-48 w-96 mt-10 mr-7">
                                </div>
                                <div v-else>
                                    
                                    <div>
                                         <img :src= "`https://fulfilmm.com/img/profiles/` + company.logo" class="" />
                                    </div>
                                    

                                      <div class=" mt-3 px-3 ml-5">

                                        <div class=" text-emerald-700 text-sm">
                                            <div class=" font-semibold py-2">
                                            <div class=" my-1 flex">
                                                    <StoreIcon/>
                                                  <p class="ml-4 mt-1"> {{company.name}}</p>
                                            </div>
                                            <div class="my-1 flex">
                                                <PhoneIcon/>
                                                 <p class="ml-4 mt-1"> {{company.phone}}</p>
                                            </div>
                                            <div class="my-1 flex">
                                                 <CallIcon/>
                                                 <p class="ml-4 mt-1">  {{company.mobile_phone}}</p>
                                            </div>
                                            <div class="my-1 flex">
                                                <FaxIcon/>
                                                 <p class="ml-4 mt-1">  {{company.fax}}</p>
                                            </div>
                                            <div class="my-1 flex">
                                                <MailIcon/>
                                                <p class="ml-4 mt-1">  {{company.email}}</p>
                                            </div>
                                            <div class="my-1 flex">
                                                 
                                               <WebIcon/>
                                                 <p class="ml-4 mt-1">  {{company.web_link}}</p>

                                            </div>
                                            <div class="my-1 flex">
                                               <AddressIcon/>
                                                <p class="ml-4 mt-1">  {{company.address}}</p>
                                            </div>
                                           
                                           

                                    </div>
                
                                        </div>

                                    </div>
                                </div>

                                <div class=" mt-8 mr-6 px-3 text-left text-emerald-800 grid grid-cols-2">
                                    <div class="col-span-2">
                                        <h2 class="text-emerald-900 font-thin text-2xl">{{invoice.invoice_id}}</h2>
                                    </div>
                                     <div class="col-span-2">
                                          <h3 class=" text-emerald-700  font-semibold text-2xl font-serif"> To</h3>
                                    </div>
                                     <div class="">
                                                 <p class="my-1"> Name</p> 
                                                 <p class="my-1"> Phone.No</p>
                                                 <p class="my-1"> Email</p>
                                                 <p class="my-1"> Address</p>
                                                 <p class="my-1"> Billing </p>
                                            </div>
                                            <div class=" font-bold">
                                                <p class="my-1">{{cus.name}}</p>
                                                <p class="my-1">{{cus.phone}}</p>
                                                <p class="my-1">{{invoice.email}}</p>
                                                <p class="my-1">{{invoice.customer_address}}</p>
                                                <p class="my-1">{{invoice.billing_address}}</p>
                                            </div>

                                    <div class="col-span-2 text-sm text-emerald-600">
                                        <div class=""> <span> Invoice Date - </span>  {{moment(invoice.invoice_date).format("MMM Do YYYY")}} </div>
                                        <div class=""> <span> Due Date - </span> {{moment(invoice.due_date).format("MMM Do YYYY")}} </div>
                                    </div>
                                       
                                </div>
       
                            </div>
                      
                           
                      

                        
                    <div class="flex justify-center items-center">

                        <table class="table-auto w-full mx-2 py-2">
                            <thead class=" text-center font-bold text-cyan-900 bg-emerald-200/60 rounded-lg">
                                <th class=" py-5"> Name </th>
                                <th> Unit </th> 
                                <th> Price </th>
                                <th> Quantity  </th>
                                <th> Discount </th>
                                <th> Total </th>
                             
                            </thead>

                            <tbody v-for="product in items" :key="product.id">
                                <tr v-if="product.foc == 0 " class=" text-center text-sm font-bold text-sky-900 bg-lime-50">
                                
                                    <td class="py-3"> {{ product.variant.product_name }}</td>
                                   
                                    <td class="py-3">
                                        {{product.unit.unit}}
                                    </td>
                                    <td class="py-3">
                                        {{product.unit_price}}
                                    </td>

                                    <td class="py-3">                           
                                        {{ product.quantity}} 
                                    </td>
                                    <td class="py-3">
                                        {{product.discount_promotion}} %
                                    </td>
                                   
                                    <td class="py-3">
                                    {{product.total}}
                                    </td>
                                
                                </tr>

                                
                                <tr  v-if="product.foc == 1"  class=" text-center text-sm font-bold text-gray-900">
                                
                                    <td class="py-3"> {{ product.variant.product_name }}</td>
                                    <td>                             
                                                        <div v-for="u in units" :key="u.id">
                                                            <span v-if="u.id == product.sell_unit">{{u.unit}}</span>
                                                        </div>
                                    </td>
                                    <td>
                                        Foc Item
                                    </td>

                                    <td>                           
                                        {{ product.quantity}} 
                                    </td>
                                    <td colspan="3">
                                        {{product.description}}
                                    </td>
                                </tr>
                            
                            </tbody>
                            <tfoot class="text-gray-700 bg-emerald-50">
                                <tr class=" my-2">
                                    <td colspan="5" class=" text-right"> Total </td>
                                    <td colspan="2" class=" text-center"> {{ invoice.total}}</td>
                                </tr>

                                <tr class=" my-2">
                                    <td colspan="5" class=" text-right"> Discount </td>
                                    <td colspan="2" class=" text-center"> {{ invoice.discount}}</td>
                                </tr>

                                <tr class="my-2">
                                    <td colspan="5" class=" text-right"> Tax </td>
                                    <td colspan="2" class="text-center"> {{ invoice.tax_rate}} %</td>
                                </tr>
                                <tr class=" my-5 font-semibold">
                                    <td colspan="5" class=" text-right py-3"> Grand Total</td>
                                    <td colspan="2" class="text-center">{{ invoice.grand_total }}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                
               

            <!-------------------------------------- Display Data End --------------------------------------------------------------->


            <!---------------------------------------------------- edit field start -------------------------------------------------->
                <!-- <Edit v-if="visible" :invoice="invoice" :items="items" :prices="prices" :units="units" :itemDiscounts="itemDiscounts" :amount_discount="amount_discount" :taxes="taxes"/> -->
                <div v-if="visible" class=" px-2 my-5">
                    
                    
                                <div class="">
                                     <div class=" grid grid-cols-4 gap-1 rounded-md px-2 py-1 my-2 mx-3 bg-white/90">
                 <!-------------------- invoice information ------------------->
                      
                         <div class=" col-span-4 mt-1 text-left">
                                   
                                        <input type="text" id="title" v-model="invoice.title"  class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/40 w-full" placeholder="Add Title"/>
                
                         </div>

              

                         <div class=" col-span-2 text-left">
                             <label  for="method" class="text-sm block"> Select Payment Method </label>
                                    <select id="method" v-model="invoice.payment_method" class=" px-2 py-1 rounded-lg bg-emerald-100/40 w-32">
                                        <option v-for="(p,index) in payment_method"  :key="index" :value="p" class=" bg-white"> {{p}}</option>
                                    </select>
                                  
                         </div>

                         <div class=" text-left">
                             <label  for="type" class="text-sm block"> Select Invoice Type</label>
                                    <select id="type" v-model="invoice.invoice_type" class=" px-2 py-1 rounded-lg bg-emerald-100/40 w-32">
                                        <option value="General Invoice"  class=" bg-white"> General Invoice</option>
                                        <option value=" Cash On Delivery"  class=" bg-white"> Cash On Delivery</option>
                                    </select>
                         </div>

                         <div>
                             <label  for="zone" class="text-sm block"> Select Zone</label>
                                    <select id="zone" v-model="invoice.zone_id" class=" px-2 py-1 rounded-lg bg-emerald-100/40 w-32">
                                        <option v-for="z in zones" :key="z.id" :value="z.id" class="bg-white"> {{z.name}}</option>
                                    </select>
                                     <!-- <p v-if="! zone_id" class=" text-sm text-ellipsis text-red-800 font-bold">Please Select Sale Zone</p> -->
                         </div>
                    </div>

                                    <table class="table-auto px-4 w-full py-2 my-3 rounded-md">
                                            <thead class=" text-center font-bold text-emerald-900 bg-emerald-300 rounded-lg">
                                                <th> Name </th>
                                                <th> Unit </th> 
                                                <th> Price </th>
                                                <th> Quantity  </th>
                                                <th> Discount </th>
                                                <th> Total </th>
                                                <th> Sub </th>
                                            
                                            </thead>

                                            <tbody v-for="product in items" :key="product.id" class="border-b-2 border-b-slate-300 bg-sky-50">
                                                <tr v-if="product.foc == 0 " class=" text-center text-sm font-bold text-sky-900 mx-2 my-2">
                                                
                                                    <td> {{ product.variant.product_name }}</td>
                                                    <td>  
                                                             <!-- <select v-model="product.sell_unit" class="mx-1 block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white">
                                                                 <option v-for="(u,index) in product.all_unit" :key="index" :value="u.id">{{u.unit}}</option>
                                                             </select> -->
                                                            <div class="dropdown">
                                                               
                                                                <p  v-for="uni in product.all_unit" :key="uni.id" class="mt-2">
                                                                    <span v-if="product.sell_unit == uni.id"> {{ uni.unit}}</span>    
                                                                </p>  

                                                                        <ul class="dropdown-content">
                                                                            <li  v-for="(u,index) in product.all_unit" :key="index"  @click="pricing(product.id , u.id)" class=" my-2 rounded px-2 py-2 bg-white text-sm"> {{u.unit}} </li>
                                                                        </ul>  
                                                            </div> 
                                                                                        
                                                    
                                                                        
                                                    </td>
                                                    <td>
                                                      {{ product.unit_price}}
                                                    </td>

                                                    <td>                           
                                                        <input type="text" v-model="product.quantity" class="mx-1 block appearance-none w-full  text-gray-700 py-2 px-3 pr-5 rounded leading-tight focus:outline-none bg-white text-center"> 
                                                    </td>
                                                    <td>
                                                        <div v-for="(dis,index) in itemDiscounts" :key="index">
                                                            <span v-if="product.variant.id == dis.variant_id">

                                                                            <select v-model="product.discount_promotion" class="mx-1 block appearance-none w-full  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none bg-white" id="grid-state">
                                                                                <option :value="0"> 0 %</option>
                                                                                <option :value="dis.rate">{{dis.rate}} %</option>
                                                                            </select>
                                                    </span>
                                                </div>
                                                    
                                                    </td>
                                                    <td>
                                                        {{product.unit_price * product.quantity}}
                                                    </td>
                                                    <td>
                                                    {{ (product.unit_price * product.quantity)-(((product.unit_price*product.quantity)/100)*product.discount_promotion)}}
                                                    </td>
                                                
                                                </tr>

                                                
                                                <tr  v-if="product.foc == 1"  class=" text-center text-sm font-bold text-gray-900 mx-2 my-2">
                                                
                                                    <td> {{ product.variant.product_name }}</td>
                                                    <td>                             
                                                                    <div  v-for="(u,index) in units" :key="index">
                                                                    <span v-if="u.product_id == product.variant.product_id">
                                                                        <select v-model="product.sell_unit" class=" rounded-md w-3/6 bg-white px-2 py-2 mx-auto block">
                                                                                                        <option  :value="u.id">
                                                                                                                {{u.unit}}
                                                                                                        </option>
                                                                                        </select>
                                                                    </span>
                                                            </div>
                                                    </td>
                                                    <td>
                                                        Foc Item
                                                    </td>

                                                    <td>                           
                                                        {{ product.quantity}} 
                                                    </td>
                                                    <td colspan="3">
                                                        {{product.description}}
                                                    </td>
                                                </tr> 
                                            
                                            </tbody>
                                            <tfoot class="text-sky-900 bg-white">
                                                <tr class=" my-2">
                                                    <td colspan="5" class=" text-right"> Total </td>
                                                    <td colspan="2" class=" text-center"> {{ getTotal}}</td>
                                                </tr>

                                                <tr>
                                                
                                                        <td colspan="5" class=" text-right"> Discount </td>
                                                
                                                    <td colspan="2">
                                                        <div v-for="cartDis in amount_discount" :key="cartDis.id">
                                                            <div v-if="cartDis.min_amount < getTotal && cartDis.max_amount > getTotal">
                                                            
                                                                    
                                                                        <select v-model="invoice.discount" class=" rounded-md w-3/6 bg-gray-50  px-2 py-2 mx-auto block">
                                                                            <option value="0"> None </option>
                                                                            <option :value="cartDis.rate">{{cartDis.rate}} %</option>
                                                                        </select>
                                                                        <p class="inputText">{{addDis}}</p> 
                                                                    
                                                            </div>
                                    
                                                    </div>
                                                
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td colspan="5" class=" text-right my-3"> Tax </td>
                                                    <td colspan="2" class="text-center"> 
                                                        <select name="" id="" v-model=" invoice.tax_rate" class=" rounded-md w-3/6 bg-gray-50  px-2 py-2 mx-auto block">
                                                            <option v-for="t in taxes" :key="t.id" :value="t.rate"> {{t.name}} </option>
                                                        </select>
                                                            <p>  {{addTax}} </p>
                                                    
                                                    </td>
                                                </tr>
                                                <tr class="text-lg font-thin">
                                                    <td colspan="5" class=" text-right"> Grand Total</td>
                                                    <td colspan="2" class="text-center">{{ addTotal }}</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                    

            <!-------------------- customer data ----------------------------------------->
             <div class=" flex justify-between my-2">
                
                <!-- <div class="w-4/5 mt-2">
                <input type="search" autocomplete="off" v-model="search" class=" w-full rounded-xl drop-shadow-lg py-2 px-3 mx-2 mb-3" placeholder=" Search Customers ...">
                <p v-if="! (search == '')" class=" text-xs text-left ml-3 text-ellipsis text-red-800 font-bold">Please Select Customer Name</p>
                <ul class="" v-if="!(search == '')">
                             <li v-for="data in filteredCustomer" class=" my-1 text-left rounded px-2 py-1 bg-white hover:shadow-lg transition ease-linear duration-200" :key="data.id" @click="addData(data)" button="true">
                                <p :value="data"> {{data.name}}</p>
                            </li> 
                        </ul>
                </div> -->

                <!-- <div class=" w-1/5">
                <button  type="button" class=" mr-3 inline-block mt-3 p-1 rounded-full bg-emerald-600/80 text-white drop-shadow-lg shadow-lg shadow-emerald-400" v-on:click="toggleModal()" > <CusIcon/> </button>
                </div> -->
                 
           </div>
           <!--------------end --------------------------->


                        

           <!----------------- for external data ----------------->
           <div class=" py-2 px-3 text-left bg-white/90 rounded-md mb-4">
            <h4 class=" my-2 text-left font-semibold"> Customer information </h4>
                <div class=" grid grid-cols-2 gap-1">
                        <div class="my-1">
                             <input type="text"  v-model="cus.name"  class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full" readonly/>
                    
                        </div>

                        <div class=" my-1">
                             <input type="text" v-model="invoice.email"  class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full" readonly/>
                          
                        </div>
                        <div>
                            
                            <input type="text" v-model="cus.phone" placeholder="phone number" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full"/>
                        </div>

                        <div>
                           
                            <input type="text" id="add" v-model="invoice.customer_address" placeholder="Customer Address" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full" />
                           
                        </div>
                        
                       <div>
                            <!-- <label  for="shipping" class="text-sm block" > Add Shipping Address </label> -->
                            <input type="text" id="shipping" v-model="invoice.billing_address" placeholder="Shipping Address" class=" text-sm px-2 py-1 rounded-lg bg-emerald-100/60 w-full"/>
                           
                         </div>

                        

                        
           </div>
        
           </div>
            <div class=" text-right my-2 mr-5">
                            
                             <button :disabled="posting" type="submit" @click="submitData()" class=" px-2 py-1 w-32 rounded-full bg-emerald-800 text-white" > Submit </button>
                             <!-- <ion-spinner  name="circles" v-if='posting' class=" mx-3"></ion-spinner> -->
                        </div>
                </div> 

            <!------------------- end --------------------->

            <!------------ print ------------------------->
            <div class="invisible">
                <div  id="print"
                    style="max-width: 800px;margin: auto;padding: 30px;font-size: 16px;line-height: 24px;font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;color: #555;">
                    <table cellpadding="0" cellspacing="0" style="width: 100%;line-height: inherit;text-align: left; border:none;">
                        <div v-if=" company == null">
                            <img src="/assets/err.png" alt="" srcset="" style=" width:100px; height:100px; margin:auto; padding:20px;">
                        </div>

                        <div v-else>
                            <tr>
                            <td colspan="6" style="padding: 5px;vertical-align: top;padding-bottom: 20px;font-size: 45px;line-height: 45px;color: #333; border:none">
                                   
                                     <div v-if=" company.logo == null"> Noob </div>
                                    <div v-else>
                                         <img :src= "`https://fulfilmm.com/img/profiles/` + company.logo" class="" />
                                    </div>
                                  
                                
                           
                           
                            </td>
                             <td style=" border:none;">
                                     <h2 style=" font-size: bold; padding:10px">{{invoice.invoice_id}}</h2>
                                </td>
                        </tr>
      
                                <tr>
                                     <td colspan="6" style="padding: 5px; vertical-align: top ;padding-bottom: 20px; font-weight:bold; font-size:small; border:none;">
                                    <h2 style=" color: gray;">{{company.name}} </h2> 
                                    Phone --- {{company.phone}} / {{company.mobile_phone}} <br>
                                     Fax ------- {{company.fax}} <br>
                                    email ---- {{company.email}} <br>
                                    Website - {{company.web_link}} <br>
                                    Address - {{company.address}}
                                    </td>

                                      <td style="padding: 5px; margin-top: 30px; vertical-align: top;padding-bottom: 40px; font-weight:bold; font-size:small; border:none;">
                                     Name - {{cus.name}}<br>
                                     Phone.No -  {{cus.phone}} <br>
                                     Email -  {{invoice.email}}<br>
                                     Address -  {{invoice.customer_address}} <br>
                                     Billing - {{invoice.billing_address}} <br>
                                     Invoice Date -  {{moment(invoice.invoice_date).format("MMM Do YYYY")}}<br>
                                     Due Data -   {{moment(invoice.due_date).format("MMM Do YYYY")}} 
                                     </td>
                                </tr>
                        </div>
                        
                          
                           
                        

                       

                        <tr>
                            <td colspan="8">
                                <table style="width:100%;line-height: inherit;text-align: center;   padding:5px; font-size:small;">
                                    <thead>
                                         <th> Name </th>
                                        <th> Unit </th> 
                                        <th> Price </th>
                                        <th> Quantity  </th>
                                        <th> Discount </th>
                                        <th> Total </th>
                                    </thead>
                                    <tbody v-for="product in items" :key="product.id">
                                <tr v-if="product.foc == 0 ">
                                
                                    <td class="py-3"> {{ product.variant.product_name }}</td>
                                   
                                    <td class="py-3">
                                        {{product.unit.unit}}
                                    </td>
                                    <td class="py-3">
                                        {{product.unit_price}}
                                    </td>

                                    <td class="py-3">                           
                                        {{ product.quantity}} 
                                    </td>
                                    <td class="py-3">
                                        {{product.discount_promotion}} %
                                    </td>
                                   
                                    <td class="py-3">
                                    {{product.total}}
                                    </td>
                                
                                </tr>

                                
                                <tr  v-if="product.foc == 1">
                                
                                    <td class="py-3"> {{ product.variant.product_name }}</td>
                                    <td>                             
                                                        <div v-for="u in units" :key="u.id">
                                                            <span v-if="u.id == product.sell_unit">{{u.unit}}</span>
                                                        </div>
                                    </td>
                                    <td style=" font-weight:bold;">
                                        Foc Item
                                    </td>

                                    <td>                           
                                        {{ product.quantity}} 
                                    </td>
                                    <td colspan="3" style=" font-weight:bold;">
                                        {{product.description}}
                                    </td>
                                </tr>
                            
                            </tbody>
                            <tfoot style=" text-align:right; margin-right:5px;">
                                <tr>
                                    <td colspan="4"> Total </td>
                                    <td colspan="3"> {{ invoice.total}}</td>
                                </tr>

                                <tr class=" my-2">
                                    <td colspan="4"> Discount </td>
                                    <td colspan="3"> {{ invoice.discount}}</td>
                                </tr>

                                <tr class="my-2">
                                    <td colspan="4"> Tax </td>
                                    <td colspan="3"> {{ invoice.tax_rate}} %</td>
                                </tr>
                                <tr>
                                    <td colspan="4"> Grand Total</td>
                                    <td colspan="3">{{ invoice.grand_total }}</td>
                                </tr>
                            </tfoot>
                                   
                                </table>
                            </td>
                           
                        </tr>
                        </table>
                    
                </div>
                </div>
                
            
            </div>



            <!----------------- show modal --------------------->
               <div v-if="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
                    <div class="relative w-auto my-6 mx-auto max-w-2xl w-xl">
                        <!--content-->
                        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <!--header-->
                      
                        <!--body-->
                        <div class="relative p-6 flex-auto">
                             <form @submit.prevent="submitPayment()">
                        <div class=" text-left grid grid-cols-2 gap-2 mb-2">
                                      <label> Title</label>
                                        <p class=" ml-2"> {{invoice.title}}</p>
                        </div>
                         <div class=" text-left grid grid-cols-2 gap-2 mb-2">
                            <label for=""> Customer </label>
                            <p class=" ml-2"> {{invoice.customer.name}}</p>
                        </div>

                        <div class=" text-left grid grid-cols-2 gap-2 mb-2">
                            <label for=""> Date </label>
                             <input type="date" class="bg-slate-50 ml-2 px-3 py-2 rounded" v-model="form.transaction_date"/>
                        </div>

                        <div class=" text-left grid grid-cols-2 gap-2 mb-2">
                            <label for="">Pay Amount </label>
                            <div>
                                 <input type="text" :placeholder="invoice.due_amount" v-model="due_amt" v-if="invoice.due_amount >= due_amt" class=" w-full mx-2 px-2 py-1 rounded" />

                                  <input v-else readonly value="Please fill valid amount" class=" text-red-700 font-bold"/>
                            </div>
                           

                        </div>
                
                  
                    <div class=" text-left grid grid-cols-2 gap-2 mb-2">
                        <label> Currency</label>
                        <div>
                             <select v-model="form.currency" class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option value="MMK" class="text-sm"> MMK</option>
                            </select> 
                            <p v-if="! form.currency" class=" text-xs text-ellipsis text-red-800  font-semibold">Please Select Currency</p>
                        </div>
                       
                    </div>
                
                <div class=" text-left grid grid-cols-2 gap-2 mb-2">
                        <label>Advance</label>
                        <select v-model="form.advance"  class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option value="on" class="text-sm"> on </option>
                             <option value="" class="text-sm"> off </option>
                        </select>   
                </div>

               

                  <div class=" text-left grid grid-cols-2 gap-2 mb-2">
                        <label>Payment Method</label>
                        <div>
                             <select v-model="form.payment_method"  class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                            <option v-for="(method,index) in payment_method" :key="index" :value="method" class="text-sm"> {{ method}} </option>

                            </select>
                            <p v-if="! form.payment_method" class=" text-xs text-ellipsis text-red-800  font-semibold">Please Select Payment Method</p>   
                        </div>
                       
                </div>

                <div class="text-left grid grid-cols-2 gap-2 mb-2">
                       <label>Cashier</label>

                       <div>
                              <select v-model="form.approver_id"  class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                                    <option v-for="cashier in cashiers" :key="cashier.id" :value="cashier.id" class="text-sm"> {{ cashier.name}} </option>

                                </select>
                                <p v-if="! form.approver_id" class=" text-xs text-ellipsis text-red-800  font-semibold">Please Select Cashier</p>   
                       </div>
                      
                </div>

                 <div class="text-left grid grid-cols-2 gap-2 mb-2">
                       <label>Category</label>

                       <div>
                             <select v-model="form.category"  class=" px-2 py-1 rounded-md ml-2 w-28 text-sm">
                                <option v-for="category in payment_category" :key="category.id" :value="category.id" class="text-sm"> {{ category.name}} </option>

                            </select>
                            <p v-if="! form.category" class=" text-xs text-ellipsis text-red-800  font-semibold">Please Select Cashier</p>   
                       </div>
                       
                </div>


                <div class="text-left grid grid-cols-2 gap-2 mb-2">
                    <label> Reference</label>
                    <input type="text" v-model=" form.reference">
                </div>

                 <div class="text-left grid grid-cols-2 gap-2 mb-2">
                    <label> Description</label>
                    <input type="text" v-model=" form.description">
                </div>

                <div class="text-left grid grid-cols-2 gap-2 mb-2">
                    <label> File </label>
                     <input type="file" ref="img" class=" ml-2" @change="onChangeFileUpload()" />
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

        
        
    </master-layout>
    
        
   
</template>
<script>

import axios from 'axios'
// import moment from 'moment'
//import Payment from '../../component/Sale/PayMentComponent.vue'
import Loader from '../../components/loaderComponent.vue'
import print from 'print-js'
import moment from 'moment'

import StoreIcon from 'vue-material-design-icons/StoreOutline.vue'
import CallIcon from 'vue-material-design-icons/Phone.vue'
import PhoneIcon from 'vue-material-design-icons/PhoneClassic.vue'
import FaxIcon from 'vue-material-design-icons/Fax.vue'
import MailIcon from 'vue-material-design-icons/Email.vue'
import WebIcon from 'vue-material-design-icons/Web.vue'
import AddressIcon from 'vue-material-design-icons/MapCheckOutline.vue'
//import { PDFGenerator } from '@awesome-cordova-plugins/pdf-generator';
//import Edit from '../../component/Sale/editInvoice.vue'

export default {
    components:{
        StoreIcon,  CallIcon, PhoneIcon,FaxIcon, MailIcon, WebIcon, AddressIcon, Loader
    },

    setup(){
   
    },

    data(){
        return{
            showModal: false,
            disable: true,
            posting:false,
            loading:false,
            visible:false,
            date: null ,
            img:'',
            err:'',
            moment: moment,
            due_amt:'',

            product:{},
            items: [],
            units:[],
            prices:[],
            taxes:[],
            amount_discount:[],
            itemDiscounts:[],
            invoice:{},
            customers:[],
            zones:[],
            cashiers:[],
            payment_category:[],
            payment_method:[],
            company:{},

            search:'',
            filteredCustomer:[],
            
            cus:{},

            res:'',

             form:{
                transaction_date:moment().format('YYYY-MM-DD'),
                attachmment:'',
                category:'',
                payment_method:'',
                approver_id:'',
                currency:'',
                advance:'',
                reference:'',
                description:'',

            }

            //pdf
            //pdfGenerator : PDFGenerator,
        }
    },

    methods:{

        // d(){
        //     let r = this.invoice.id
        //     console.log(r)
        // },

          reset(){
            this.form = {
                transaction_date:'',
                attachmment:'',
                category:'',
                payment_method:'',
                approver_id:'',
                currency:'',
                advance:'',
                reference:'',
                description:'',

            }
        },

         onChangeFileUpload(){
            this.form.attachmment= this.$refs.img.files[0];
        },


         toggleModal(){
                        this.showModal = !this.showModal;
                        },
        

        pricing(p_id , u_id){
            this.items.map( item => {
                 if(item.id == p_id){
                     item.sell_unit = u_id


                     item.all_unit.filter ( u =>{
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
                                                   return item.unit_price = price.price
                                                }
                                    }
                                else{
                                    return item.unit_price = 0
                                }
      
                                }

                    })

                    this.prices.forEach((price, index) => {
                                    if(price.unit_id == u_id && item.variant_id == price.product_id){
                                         if(price.min <= item.quantity )
                                                {
                                                    item.unit_price = price.price
                                                    console.log(price);
                                                    console.log(index);
                                                }
                                            
                                        
                                    }
                                
                                   
                                });
                 }
                
            })
        },

        async Data(){
            this.loading = true
            await axios.get(`mobile_invoice/${this.$route.params.id}/edit` , {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                 },
                }) .then (res => {
                    this.product = res.data
                    this.items = res.data.invoice_item
                    this.invoice = res.data.invoice
                    this.cus = res.data.invoice.customer
                    this.units = res.data.unit
                    this.prices = res.data.price
                    this.amount_discount = res.data.amount_discount
                    this.itemDiscounts = res.data.discount
                    this.taxes = res.data.tax
                    this.customers = res.data.customers
                    this.zones = res.data.zones
                    this.cashiers = res.data.cashier
                    this.payment_category = res.data.payment_category
                    this.payment_method = res.data.payment_method
                    this.company = res.data.base_company
                })
                .finally(() => this.loading = false)
            
        },

        edit(){
            this.visible = true
        },

        detail(){
            this.visible = false
        },

         filterCustomer(){
            this.filteredCustomer = this.customers.filter( state => {
                return state.name.toLowerCase().startsWith(this.search.toLowerCase());
            })
        },

        addData(data){
                this.invoice.customer_id = data.id;
                this.invoice.customer.name = data.name;
                this.invoice.customer.phone = data.phone;
                this.invoice.email = data.email;
                this.invoice.customer_address = data.address;
               
        },

        async markSent(){
                if(! confirm('Are You Sure to Mark Sent')) return;
                await axios.put(`mobile_invoice/${this.$route.params.id}`, {
                mark_sent : 1,
            }, {
                headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                },
            });
            this.Data();
            this.detail();
        
        },

        async submitData(){
                let itemary = JSON.stringify(this.items);
                this.posting = true;
                    await axios.put(`mobile_invoice/${this.$route.params.id}` ,{
                    title: this.invoice.title,
                    client_id : this.invoice.customer_id,
                    inv_date : this.invoice.invoice_date,
                    due_date : this.invoice.due_date,
                    client_address : this.invoice.customer_address,
                    bill_address : this.invoice.billing_address,
                    payment_method : this.invoice.payment_method,
                    order_items : itemary,
                    client_email : this.invoice.email,
                    inv_grand_total : this.addTotal,
                    tax_rate : this.invoice.tax_rate,
                    total : this.getTotal,
                    invoice_type: this.invoice.invoice_type,
                    delivery_fee: 0 ,
                    warehouse_id: this.invoice.warehouse_id,
                    sale_type: this.invoice.inv_type,
                   
                   
                    discount: this.addDis,
                    zone_id: this.invoice.zone_id 
                }, { 
                 headers: {
                'Authorization': "Bearer" + localStorage.getItem('token'),
                },
             
                });
                    this.posting = false ;
                    //window.location.reload();
                    this.Data();
                    this.detail();
                  
                  //console.log(response)

        },


        async submitPayment(){
            var data = new FormData();
           
            data.append('customer_id', this.invoice.customer_id);
            data.append('title', this.invoice.title);

            if( this.due_amt > this.invoice.due_amount){
                 data.append('amount', 0);
            }

            else {
                 data.append('amount', this.due_amt);
            }
           
            data.append('invoice_id', this.invoice.id);
            data.append('payment_method', this.form.payment_method);
            data.append('category', this.form.category);
            data.append('approver_id', this.form.approver_id);
            data.append('transaction_date', this.form.transaction_date);
            data.append('currency', this.form.currency);
            data.append('advance', this.form.advance);
            data.append('attachment',  this.form.attachmment);
            data.append('reference', this.form.reference);
            data.append('description', this.form.description);

             const config = {
                    headers: {
                        'content-type': 'multipart/form-data',
                        'Authorization': "Bearer" + localStorage.getItem('token'),
                        
                    }
                }
            await axios.post(`revenues`, data, config)
                    .then( response => {
                        this.err = response.message;
                       
                           this.posting = false;
                           this.reset();
                           //this.closeModal();
                           this.toggleModal = false;
                           window.location.reload();
                    })
                    .catch( error => {
                        console.log(error);
                        this.posting = false;
                    });
           
            
           
        },

        


        async destroy(){ 
            if(!confirm('Are You Sure To Cancel')) return;
            await axios.post(`invoice/cancel/${this.$route.params.id}`,{
                headers : {
                    'Authorization': "Bearer" + localStorage.getItem('token'),
                }
            });
            this.Data();


        },

         print(){
      
          
                   
                print({
                    printable: "print",
                    type: "html",
                    //header: " မြင့်မြတ်"
                    scanStyles: false,
                    onPrintDialogClose: () => console.log("The print dialog was closed"),
                    onError: e => console.log(e)
                });
            
        }
    

        
    },

    computed:{

       amt(){
        return this.invoice.due_amount 
       },
       

            getTotal(){
             let sum = 0
                this.items.map( x => {
                    sum = sum + ((x.unit_price * x.quantity)-(((x.unit_price*x.quantity)/100)*x.discount_promotion))
                })
               
               return sum
  
        },

          addTotal(){
            let a = Number(this.getTotal);
            let b = Number(this.addTax);
            // let d = Number(this.deli);
            let dis = Number(this.addDis);
            let c = (a - dis) + b;
            return c.toFixed(2);
        },

        addTax(){
            let t = Number(this.invoice.tax_rate);
            let amt = Number(this.getTotal);
            let tax = (amt / 100)*t;

            return tax.toFixed(2);
        },

        addDis(){
            let d = Number(this.invoice.discount);
            let amt = Number(this.getTotal);
            let dis = (amt/100)*d;

            return dis.toFixed(2);
        },

        isDisable(){
            return this.invoice.status !== 'Paid'; 
        }
    },

    created() {
        this.Data();
        //this.d();
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


    th, td{
       border: 1px solid rgba(247, 233, 233, 0.596);
    }
</style>