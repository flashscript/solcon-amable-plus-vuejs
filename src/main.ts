import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import { setContext } from 'apollo-link-context'

Vue.directive('opacity', function (el:any, binding: any)
{
	if (binding.value)
		el.style.opacity = 1
	else
		el.style.opacity = 0
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: new ApolloClient({
	  link: setContext(() => ({headers: {authorization: `Bearer ${window.localStorage.getItem('token')}`}})).concat(createHttpLink({uri: `${process.env.VUE_APP_API_URL}/graphql`})),
	  cache: new InMemoryCache(),
	  connectToDevTools: true
	})
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
