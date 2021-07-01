const HomePage = { template: '<home-page></home-page>' }
const LoginPage = { template: '<login-page></login-page>' }
const RestaurantPage = { template: '<restaurant-page></restaurant-page>' }
const AdministratorPage = { template: '<administrator-page></administrator-page>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePage},	 
	    { path: '/login', component: LoginPage },
	    { path: '/manager', component: LoginPage },
	    { path: '/customer', component: LoginPage },
	    { path: '/deliverer', component: LoginPage },
	    { path: '/admin', component: AdministratorPage },
	    { path: '/restaurant', component: RestaurantPage },
	  ]
});

var app = new Vue({
	router,
	el: '#webShop'
});

