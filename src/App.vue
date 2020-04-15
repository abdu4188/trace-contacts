<template>
  <div id="app">
    <Navbar/>
    <router-view/>
    <vue-progress-bar/>
    <Footer/>
  </div>
</template>
<script>
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  mounted () {
    this.$Progress.finish()
  },
  created () {
    this.$Progress.start()
    
    this.$router.beforeEach((to, from, next) => {
      
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress
        
        this.$Progress.parseMeta(meta)
      }
      
      this.$Progress.start()
      
      next()
    })
    
    this.$router.afterEach(() => {
      
      this.$Progress.finish()
    })
  }
}
</script>
<style>
</style>
