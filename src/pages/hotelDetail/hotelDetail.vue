<template>
    <div class="main">
      <v-header></v-header>
      <router-view></router-view>
    </div>
</template>

<script>
  import header from '@/components/v-header'
    export default {
      components:{
        'v-header':header
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
