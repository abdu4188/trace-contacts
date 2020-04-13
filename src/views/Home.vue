<template>
  <div class="home">
    <div class="row">

      <div class="col-sm-4">
        <Probable/>
      </div>

      <div class="col-sm-8">
        <SearchPerson/>
      </div>
    </div>
  </div>
</template>

<script>
import Probable from '@/components/layout/Probable'
import SearchPerson from '@/components/layout/SearchPerson'

export default {
  name: 'Home',
  data(){
    return{
    }
  },
  methods: {
  },
  components: {
    Probable,
    SearchPerson
  }
  
}
</script>

<style>

</style>
