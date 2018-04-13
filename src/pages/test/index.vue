<template>
    <div id="app">
      <v-header :show="true"></v-header>
    </div>
</template>

<script>
import header from '@/components/Header'
export default {
  components:{
    'v-header': header
  }
}

</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

</style>
