//home进去的主页面
<template>
   <div>
     <div>{{name}}
     </div>
     <router-view></router-view>
   </div>
   
</template>

<script>
console.log('home');
export default {
   data() {
     return {
       name: 'zhang'
     }
   },
}
</script>
<style lang='css' scoped>

</style>
