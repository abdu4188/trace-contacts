<template>
  
    <div>
        
        <div class="card search-bar">

            <div class="card-title">
                <h5 class="teal-text center">Search User</h5>
            </div>

            <div class="search">

            <div class="input-field first-name">
                <label for="fname">First Name:</label>
                <input type="text" name="fname" v-model="searchFName">
            </div>

            <div class="input-field last-name">
                <label for="lname">Last Name:</label>
                <input type="text" name="lname" v-model="searchLName">
            </div>

            <div class="input-field phone-number">
                <label for="phone">Phone number:</label>
                <input type="text" name="phone" v-model="searchPhone">
            </div>

            </div>


        </div>
        <div class="card-panel" v-if="searched.length > 0">
            <div class="card inner-card" v-for="(person, index) in searched" :key="index">
                <div class="side-by-side">
                    <h6 class="center left">{{ person['fname'] }} {{person['lname']}} </h6>
                    <h6 class="center right">{{person['phone']}}</h6>
                </div>
                <div class="center detail-button">
                     <router-link :to="{name: 'ContactsList', params : {id: person['uid']}}"><a class="waves-effect waves-light btn" style="width: 10vw"><span class="white-text">View Contacts</span></a></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'SearchPerson',
    data(){
        return{
            searchFName: "",
            searchLName: "",
            searchPhone: "",
            people: [],
        }
    },
    created(){
        var query = db.collection('users')
            query.get().then(
                snapshot => {
                    if(!snapshot.empty){
                        snapshot.forEach(
                            doc => {                                
                                this.people.push({
                                    "fname": doc.data()['fname'],
                                    "lname": doc.data()['surname'],
                                    "phone": doc.data()['phone'],
                                    "uid": doc.data()['user.uid'],
                                    
                                })
                            }
                        )
                    }
                },
            )
    },
    methods: {
        searchClicked(){
                        
        },
    },
    computed: {
        searched(){
            return this.people.filter(
                person => {
                    return person.fname.toLowerCase().includes(this.searchFName.toLowerCase()) && person.lname.toLowerCase().includes(this.searchLName.toLowerCase()) && person.phone.includes(this.searchPhone)
                }
            )
        }
    }
}
</script>

<style>

.first-name{
  width: 27%;
  float: left;
  margin-left: 1vw;
}

.last-name{
  width: 27%;
  float: left;
  margin-left: 1vw;
}

.phone-number{
  width: 27%;
  margin-left: 1vw;
  float: left;
}

.search-btn{
  margin-top: 3%;
  width: 10%;
  margin-left: 1vw;
  float: right;
}

.search{
  width: 80%;
  margin: 0 auto;
}

.search-bar{
    margin-bottom: 10vh;
}
.side-by-side{
    margin-top: 3vh;
    /* margin-bottom: 3vh; */
    width: 40%;
    margin: 0 auto;
}
.side-by-side .left{
    float: left;
}

.side-by-side .right{
    float: right;
}
.detail-button{
    margin-top: 3vh;
    margin-bottom: 3vh;
}
.inner-card{
    box-shadow: none !important;
}
</style>