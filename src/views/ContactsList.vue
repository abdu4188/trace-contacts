<template>
  <div>
      <h4 class="center teal-text">People {{name}} met with</h4>
      <div class="row" v-for="(person, index) in people" :key="index">
          <div class="col-sm-4 card-panel">
            <div class="card-title center">
                <h5>{{person['name']}}</h5>
                <div class="row">
                    <div class="col-sm-4">
                        <h6> {{person['phone']}} </h6>
                    </div>
                    <div class="col-sm-4">
                        <h6> {{person['location']}} </h6>
                    </div>
                </div>
                <div class="col-sm-4">
                    <h6> {{person['date']}} </h6>
                </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'ConatctsList',
    data(){
        return{
            uid: null,
            name: null,
            people: []
        }
    },
    created(){
        this.uid = this.$route.params.id;
        db.collection('users').doc(this.$route.params.id).get().then(
            doc => {
                if(doc.exists){
                    this.name = doc.data()['fname']
                }
            }
        )
        db.collection('log').where('user', '==', this.$route.params.id).get().then(
            snapshot => {
                snapshot.forEach(
                    doc => {
                        if(doc.exists){
                            this.people.push(
                                {
                                    name : doc.data()['name'],
                                    phone: doc.data()['phone'],
                                    date: doc.data()['date'],
                                    location: doc.data()['location']
                                }
                            )
                        }
                    }
                )
            }
        )
    },
    mounted(){
        
    }
}
</script>

<style>

</style>