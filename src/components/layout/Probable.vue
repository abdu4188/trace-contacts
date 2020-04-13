<template>
  <div class="card-panel probable-cases">
        <div class="card-title center">
            <h5 class="teal-text">Probable cases identified from app</h5>
        </div>
        <div class="card" v-for="(person, index) in people" :key="index">
            <div class="card-title center">
                <h5> {{person['fname']+" "+person['lname']}} </h5><br>
            </div>
            <div class="row">
                <div class="col-sm-6">
                <p> {{person['phone']}} </p>
                <p> {{person['email']}} </p>
                </div>
                <div class="col-sm-6">
                <router-link :to="{name: 'ContactsList', params : {id: person['user.uid']}}" >
                    <a class="waves-effect waves-light btn white-text">Contacts</a>
                </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'


export default {
    name: 'probable',
    data(){
      return {
          people: [],
      }
    },

  mounted(){
    db.collection('probable').get().then(
      snapshot => {
        snapshot.forEach(
          doc => {
            this.people.push(doc.data())
          }
        )
      }
    )
  },

}
</script>

<style>

/* .probable-cases{
  height: 100vh;
} */
</style>