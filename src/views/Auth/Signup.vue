<template>
  <div class="signup container">
      <form @submit.prevent="signup" class="card-panel">
          <h2 class="center teal-text">Signup</h2>

          <div class="field">
              <label for="firstName">First Name:</label>
              <input type="text" name="firstName" v-model="firstName">
          </div>
          <p class="red-text center" v-if="firstNameFeedback"> {{firstNameFeedback}} </p>

          <div class="field">
              <label for="lastName">Last Name:</label>
              <input type="text" name="lastName" v-model="lastName">
          </div>
          <p class="red-text center" v-if="lastNameFeedback"> {{lastNameFeedback}} </p>

          <div class="field">
              <label for="phone">Phone number:</label>
              <input type="tel" name="phone" v-model="phone">
          </div>
          <p class="red-text center" v-if="phoneFeedback"> {{phoneFeedback}} </p>

          <div class="field">
              <label for="email">Email:</label>
              <input type="email" name="email" v-model="email">
          </div>
          <p class="red-text center" v-if="emailFeedback"> {{emailFeedback}} </p>

          <div class="field">
              <label for="password">Password:</label>
              <input type="password" name="password" v-model="password">
          </div>
          <div class="field">
              <label for="repassword">Retype Password:</label>
              <input type="password" name="repassword" v-model="rePassword">
          </div>

          <p class="red-text center" v-if="rePasswordFeedback"> {{rePasswordFeedback}} </p>
          <div class="field center">
              <button class="btn deep-teal">Signup</button>
          </div>
      </form>
  </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
    name: 'Signup',
    data(){
        return{
            firstName: null,
            firstNameFeedback: null,
            lastName: null,
            lastNameFeedback: null,
            phone: null,
            phoneFeedback: null,
            email: null,
            password: null,
            rePassword: null,
            emailFeedback: null,
            passwordFeedback: null,
            rePasswordFeedback: null,
            admin: null,
            sentEmail: null,
        }
    },
    methods:{
        signup(){
            this.$Progress.start()
            if (this.firstName == null) {
                this.$Progress.fail()
                this.firstNameFeedback = "First name is required"
            }
            if (this.lastName == null) {
                this.$Progress.fail()
                this.lastNameFeedback = "Last name is required"
            }
            if (this.phone == null) {
                this.$Progress.fail()
                this.phoneFeedback = "Phone number is required"
            }
            if (this.email == null) {
                this.$Progress.fail()
                this.emailFeedback = "Email is required"
            }
            if(this.email != null && this.email != this.$route.params.email){
                this.$Progress.fail()
                this.emailFeedback = "You can only register with the email address you recieved the invitaion with"
            }
            if (this.password == null) {
                this.$Progress.fail()
                this.passwordFeedback = "Password is required"
            }
            if (this.password != this.rePassword) {
                this.$Progress.fail()
                this.rePasswordFeedback = "Passwords do not match"
            }
            if (this.firstName && this.lastName && this.email && this.phone && this.password && this.rePassword && this.password == this.rePassword && this.email != this.$route.params.email) {
                this.firstNameFeedback = null
                this.lastNameFeedback = null
                this.emailFeedback = null
                this.phoneFeedback = null
                this.passwordFeedback = null
                this.rePasswordFeedback = null

                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
                    cred => {
                        db.collection('admin').doc(cred.user.uid).set({
                            admin: this.admin,
                            email: this.email,
                            fname: this.firstName,
                            phone: this.phone,
                            surname: this.lastName,
                            'user.uid': cred.user.uid
                        })
                    }
                ).then( () => {
                    this.$Progress.finish()
                    this.$router.push({name: 'Login'})
                }
                ).catch(
                    err => {
                        this.$Progress.fail()
                        console.log(err.message)
                        this.rePasswordFeedback = err.message
                    }
                )
            }
        }
    },
    created(){
        firebase.auth().signOut().then()
        this.sentEmail = this.$route.params.email
        if(this.$route.params.superu){
            this.admin = "super"
        }
        else{
            this.admin = "admin"
        }
    }
}
</script>

<style>
    .signup{
        max-width: 600px;
        margin-top: 60px;
    }
    .signup h2{
        font-size: 2.4em;
    }
    .signup .field{
        margin-bottom: 16px;
    }
</style>