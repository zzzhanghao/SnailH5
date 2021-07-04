<template>
   <div>
     <page-header/>
     <router-view></router-view>
   </div>
   
</template>

<script>
import PageHeader from '@/components/page-header'
export default {
   data () {
      return {

      };
   },

   components: {
     PageHeader
   },

   computed: {},

   methods: {}
}
</script>
<style lang='css' scoped>

</style>