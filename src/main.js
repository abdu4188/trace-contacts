import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import VueProgressBar from 'vue-progressbar'
import VuejsDialog from 'vuejs-dialog';

import 'vuejs-dialog/dist/vuejs-dialog.min.css';

const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '8px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.config.productionTip = false
Vue.use(VueProgressBar, options)
Vue.use(VuejsDialog);

let app = null

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
})