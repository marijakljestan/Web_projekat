Vue.component("deliverer-page", {
	data: function () {
		    return {
		      restaurants: null,
		      restaurantTypes : null,
		      searchName : '',
		      searchLocation: '',
		      searchType: '',
		      searchGrade: '',
		      sortMode : '',
		      sortParameter : ''
		    }
	},
	template: ` 
   <div id="home" style="background : #fff">

        <div class="jumbotron">
          <div class="container text-center">
            <h1>donesi.com</h1>      
            <p>Najbolja dostava u gradu</p>
          </div>
        </div>
        
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>                        
              </button>       
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav">
                <li class="active"><a href="#/deliverer"><span class="glyphicon glyphicon-home"></span> Početna</a></li>
                <li><a href="#/delivererProfile"><span class="glyphicon glyphicon-user"></span> Moj Profil</a></li>
                <li><a href="#/delivererOrders"><span class="glyphicon glyphicon-cutlery"></span> Porudžbine</a></li>
              </ul>
              <ul class="nav navbar-nav navbar-right">
            	<li><a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a></li>
              </ul>
            </div>
          </div>
        </nav>
        
            <div class="search">
        <input type="text" v-model="searchName" 	class="search-input" placeholder="Naziv restorana">
        <input type="text" v-model="searchLocation" class="search-input" placeholder="Lokacija restorana">
             
        <select v-model="searchType" class="search-input">
        	<option disabled selected>Izaberite tip</option>
			<option v-for="type in restaurantTypes" v-bind:value="type">
				 {{ type }} 
			</option>
		</select>
		
		<select v-model="searchGrade" class="search-input">
        	<option disabled selected> Izaberite ocenu</option>
			<option v-for="index in 5" :key="index" v-bind:value="index">
				{{ index }} 
			</option>
		</select>
    
        <button class="search-submit" v-on:click="searchRestaurants"> Pretraži </button>
    </div>
    
    <div class="col-sm-2 sidenav" style="position: absolute; left: 1%; top: 50%; border-radius: 25px; background-color: cornsilk;">
    	<label style="color: darkgrey;" > Filteri: </label><br/><br/>
        <input type="checkbox" @change="showOnlyOpenRestaurants($event)" id="open-restaurants" value="restaurant">
        <label style="color: darkgrey;" > Otvoreni restorani</label><br/>
        <hr>
        <label style="color: darkgrey);" > Sortiranje restorana: </label><br/><br/>
        <input type="checkbox"  @change="setDescendingSortMode($event)">
        <label style="color: darkgrey;"> Opadajuće</label><br/>
        <input type="checkbox" @change="setAscendingSortMode($event)">
        <label style="color: darkgrey;" > Rastuće</label><br/><br/>
        
        <label style="color: darkgrey;" > Parametri sortiranja: </label><br/><br/>
        <input type="checkbox" @change="setNameAsSortParameter($event)">
        <label style="color: darkgrey;"> Naziv</label><br/>
        <input type="checkbox" @change="setLocationAsSortParameter($event)">
        <label style="color: darkgrey;"> Lokacija </label><br/>
        <input type="checkbox" @change="setGradeAsSortParameter($event)">
        <label style="color: darkgrey;"> Prosečna ocena</label><br/>
        
        <button class="search-submit" v-on:click="sortRestaurants" style="margin-left:50px; margin-top:15px; margin-bottom:10px; color:#fff" > Sortiraj </button>
        
    </div>
        
        <div class="container" style="position:relative; left:100px">    
      <div class="row">      
        <div class="col-lg-10" > 
            
		      <div v-for="restaurant in restaurants" v-on:click="showRestaurant(restaurant)" class="restaurant-info-home-page" style="background-color:cornsilk; border-radius: 25px; height: 200px; text-align: center; display: block;">
		        <img v-bind:src= "restaurant.logo" alt="" class="restaurant-logo-home-page">
		        <h1 class="restaurant-name">{{ restaurant.name }}</h1> 
		        <span class="restaurant-status"><label style="font-size: 18px; font-weight: lighte; color:silver">{{ restaurant.status}}</label></span>  
		        <span class="restaurant-type"><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.type }}</label></span>
		        <span class="restaurant-grade"><label style="font-size: 16px; font-weight: lighte; color:silver">{{ restaurant.grade.toFixed(1) }}</label></span>  <br/><br/>    
		        <span class="restaurant-address"><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.location.address.street }}</label></span>
		      </div>    
        </div>
        
      </div>
        </div><br>
      
       
        <footer class="container-fluid text-center">
          <p>Online Food Delivery Copyright</p>  
        </footer>
        </div>
`
	,
	mounted () {
	    axios
	     	.get('/restaurants/getAll')
	        .then(response => {
			if (response.data != null) {
				this.restaurants = response.data;
			}
		});
		
		axios
          .get('/restaurants/getAllTypes')
          .then(response => {
		  	if (response.data != null) {
				this.restaurantTypes= response.data;
			}
		});
    }, 
	methods : {
		setAscendingSortMode : function (event) {
			this.sortMode = 'asc';
		},
		
		setDescendingSortMode : function (event) {
			this.sortMode = 'desc'
		},
		
		setNameAsSortParameter : function (event) {
			this.sortParameter = 'name';
		},
		
		setLocationAsSortParameter : function (event) {
			this.sortParameter = 'location';
		},
		
		setGradeAsSortParameter : function (event) {
			this.sortParameter = 'grade';
		},
		
		sortRestaurants : function (event) {
			
					let sortParameters = {
						mode : this.sortMode,
						parameter : this.sortParameter		
    			}
    			
    			axios 
		    		.post('/restaurants/sortRestaurants', JSON.stringify(sortParameters))
		    		.then(response => {
		    		   this.restaurants = response.data;
		    	})
		},
		
		showRestaurant : function (restaurant) {
			window.location.href = "#/restaurant?id=" + restaurant.name;
		},
		
		showOnlyOpenRestaurants : function (event) {
			axios
          		.get('/restaurants/getAllOpenedRestaurants')
          		.then(response => {
				if (response.data != null) {
					this.restaurants = response.data;
				}
			});
		},
		
		searchRestaurants : function (event) {
				let searchParameters = {
						name : this.searchName,
						location : this.searchLocation,
	    				type : this.searchType,
	    				grade : this.searchGrade			
    			}
    			
    			axios 
		    		.post('/restaurants/searchRestaurants', JSON.stringify(searchParameters))
		    		.then(response => {
		    		   this.restaurants = response.data;
		    	})
		}
	}
});