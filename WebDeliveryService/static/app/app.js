const HomePage = { template: '<home-page></home-page>' }
const LoginPage = { template: '<login-page></login-page>' }
const RestaurantPage = { template: '<restaurant-page></restaurant-page>' }
const AdministratorPage = { template: '<administrator-page></administrator-page>' }
const AddNewRestaurant = { template: '<addNewRestaurant-page></addNewRestaurant-page>' }
const UserProfile = { template: '<user-profile-page></user-profile-page>' }
const UserProfilesView = {template: '<user-profiles-page></user-profiles-page>'}

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
	    { path: '/addNewRestaurant', component: AddNewRestaurant },
	    { path: '/userProfile', component: UserProfile },
	    { path: '/userProfilesView', component: UserProfilesView },
	  ]
});

var app = new Vue({
	router,
	el: '#webShop'
});

