<template>
  <div>
      <nav>
        <div class="nav-wrapper teal">
        <a href="#" class="brand-logo" style="margin-left: 1vw">Trace Contacts</a>
        <ul id="nav-mobile" class="right nav-links hide-on-med-and-down">
            <li v-if="loggedIn" style="margin-top: 1.6vh; margin-right: 3vw;"><h6><b> {{username}} </b></h6></li>
            <li><router-link style=" color:white; text-decoration:none" :to="{name: 'Home'}">Home</router-link></li>
            <li v-if="loggedIn && superu"><router-link style=" color:white; text-decoration:none" :to="{name: 'AddUser'}">Add user</router-link></li>
            <li v-if="loggedIn"  @click="logout()"><a>Logout</a></li>
            <li v-if="!loggedIn"><a>Login</a></li>
        </ul>
        </div>
    </nav>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'

export default {
    data(){
        return{
            username: null,
            uid: null,
            superu: false,
            loggedIn: false
        }
    },
    created(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.uid = user.uid
                this.loggedIn = true

                db.collection('admin').doc(this.uid).get().then(
                    doc => {
                        this.username = doc.data()['fname']
                        if (doc.data()['admin'] == 'super') {
                            this.superu = true
                        }
                    }
                )
            }
        })
    },
    methods: {
        logout(){
            this.loggedIn = false
            firebase.auth().signOut().then(() =>{
                this.$router.push({
                    name: 'Login'
                })
            })
        }
    }
}
</script>

<style>

</style>