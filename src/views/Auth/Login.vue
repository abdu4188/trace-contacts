<template>
  <div class="container login">
      <form @submit.prevent="login()" class="card-panel">
          <h2 class="center card-title teal-text">Login</h2>
          <div class="field">
              <label for="email">Email:</label>
              <input type="email" name="email" v-model="email">
          </div>
          <p class="red-text center" v-if="emailFeedback"> {{emailFeedback}} </p>
          <div class="field">
              <label for="password">Password:</label>
              <input type="password" name="password" v-model="password">
          </div>
          <p class="red-text center" v-if="passwordFeedback"> {{passwordFeedback}} </p>
          <div class="field center">
              <button class="btn deep-teal">Login</button>
          </div>
      </form>
  </div>
</template>

<script>
import * as firebase from 'firebase'
import db from '@/firebase/init'


export default {
name:'Login',
    data(){
        return{
            email: null,
            password: null,
            emailFeedback: null,
            passwordFeedback: null
        }
    },
    created(){
        firebase.auth().signOut().then()
    },
    methods: {
        login(){
            this.$Progress.start()
            if(this.email && this.password){
                this.passwordFeedback = null
                this.emailFeedback =  null
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
                    () => {
                        this.checkAdmin(firebase.auth().currentUser.uid)
                    }
                ).catch(err => {
                    this.$Progress.fail()
                    this.passwordFeedback = err.message
                })
            }
            else if(this.email == null){
                this.$Progress.fail()
                this.emailFeedback = "Please enter an email address"
            }
            else{
                this.$Progress.fail()
                this.passwordFeedback = "Please enter your password"
            }
        },
        checkAdmin(uid){
            db.collection('admin').doc(uid).get().then(
                doc => {
                    if(doc.exists)
                    {
                        this.$Progress.finish()
                        this.$router.push({name: 'Home'})
                    }
                    else{
                        this.$Progress.fail()
                        this.passwordFeedback = "Sorry you don't have admin access."
                    }
                }
            )
        }
    }
}
</script>

<style>
.login{
    max-width: 400px;
    margin-top: 60px;
}

.login h2{
    font-size: 2.4em;
}
.login .field{
    margin-bottom: 10px;
}
</style>