<template>
  <div>
      <nav>
        <div class="nav-wrapper teal">
        <a href="#" class="brand-logo">Trace Contacts</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a> {{username}} </a></li>
            <li v-if="superu"><a>Add user</a></li>
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

                db.collection('users').doc(this.uid).get().then(
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