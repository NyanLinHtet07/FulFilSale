<template>
    <div class=" min-w-full min-h-screen flex">
        <div>
            <Menu/>
        </div>
        <div>
            <h1> {{pageTitle }}</h1>
            <main>
                 <slot />
            </main>
           
        </div>
    </div>
</template>
<script>
import Menu from './MenuComponent.vue'
export default {
    props:["pageTitle"],

    components:{
        Menu,
    }
}
</script>