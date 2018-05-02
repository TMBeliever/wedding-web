<template>
    <div class="role">
      <v-header></v-header>
      <router-view></router-view>
    </div>
</template>

<script>
  import headers from '@/components/v-header'
  export default {
    components:{
      'v-header': headers,
    },
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
