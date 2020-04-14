<template>
  <div class="container add-user">
      <div class="card-panel">
          <div class="card-title">
              <h2 class="center teal-text">Add user</h2>
          </div>
          <div class="card-content">
              <form @submit.prevent="sendEmail()">
                  <div class="field">
                      <label for="email">Email</label>
                      <input type="email" name="email" v-model="email">
                  </div><br>
                  <div class="switch">
                    <label>
                    Super user
                    <input type="checkbox" v-model="superu">
                    <span class="lever"></span>
                    </label>
                </div><br><br>
                <div class="field center">
                    <button class="btn deep-teal">Add</button>
                </div>
              </form>
          </div>
      </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name:'AddUser',
    data(){
        return{
            email: null,
            superu: false,
        }
    },
    methods: {
        sendEmail(){
            console.log(this.email)
            let sendMail = firebase.functions().httpsCallable('sendMail');
            sendMail(
                {
                    email: this.email,
                    superu: this.superu
                }
            ).then(
                result => {
                    console.log(result.data)
                }
            )
        }
    }

}
</script>

<style>
.add-user{
    max-width: 400px;
    margin-top: 60px;
}

.add-user h2{
    font-size: 2.4em;
}
.add-user .field{
    margin-bottom: 10px;
}
.switch label{
    font-size: 1.0em;
}
</style>