<template>
    <master-layout>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <MenuIcon/>
     <h1 class="text-3xl font-bold underline text-green-300">
    Hello world!
  </h1>
  </div>
  </master-layout>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import MenuIcon from 'vue-material-design-icons/Menu.vue';

export default {
  name: 'HomeView',
  components: {
    //HelloWorld,
    MenuIcon
  }
}
</script>
