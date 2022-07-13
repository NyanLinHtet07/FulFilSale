<template>
    <master-layout pageTitle="Home">
  <div class="home">
      <p>{{lat}},{{lon}}</p>
      <p>{{error}}</p>
      <button @click="myFunction()">Click Me</button>
      
  </div>
  </master-layout>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'


export default {
  name: 'HomeView',

  data() {
    return {
        error: '',
        lat:'',
        lon:''
    }
  },


   methods:{
    myFunction() {		
        if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(this.showPosition);
        }else{
        this.error = "Geolocation is not supported."; 
          
        }
      },
    showPosition(position) {	
      this.lat = position.coords.latitude;
      this.lon = position.coords.longitude;
    }
	}


}
</script>
