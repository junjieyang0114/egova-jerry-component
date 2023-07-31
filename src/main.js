import Vue from 'vue'
import App from './App.vue'
import "@/assets/style/reset.scss";
import "@/assets/style/icon-font.scss";
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
