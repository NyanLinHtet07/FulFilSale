<template>
   <master-layout>
    <div v-if="loading">
        <Loader/>
    </div>
        <div v-else class=" grid h-screen place-items-center">
            <div class=" px-3 py-2 rounded-lg  backdrop-blur-md backdrop-filter bg-white/60">
                  
            </div>
          
        </div>
   </master-layout>
</template>
<script>
    import Loader from '../../components/loaderComponent.vue'
    import axios from 'axios'

    export default {
        data() {
            return {
            
                loading: false,
                shop:{},
                location:{},
            }
        },

       

        components:{
            Loader
        },

        methods: {
            async getData(){
                this.loading = true;
                await axios.get(`shops/${this.$route.params.id}` , {
                    headers: {
                    'Authorization': "Bearer" + localStorage.getItem('token'),
                    },
                    }) 
                    .then( (res) => {
                        this.shop = res.data.shop;
                        this.location = res.data.location;
                    })
                    .finally(() => this.loading = false)
            },

        },

    

        created() {
            this.getData();
            
        },
    }
    </script>
    <style scoped>
        /* ion-icon {
    font-size: 24px;
    } */
    </style>