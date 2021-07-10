Vue.component("restaurant-comments", {
	data: function () {
		    return {
			  restaurant: null,
		      comments: null,
		    }
	},
	
	template: ` 
	 <div id="home">
    <div class="jumbotron">
      <div class="restaurant-info" style="background-color:cornsilk; border-radius: 25px; position: absolute; width: 50%; left: 25%; top:5%; height: 200px; text-align: center; display: block;">
        <img v-bind:src= "restaurant.logo" alt="" class="restaurant-logo">
        <h1>{{ restaurant.name }}</h1> 
        <span style="position: absolute; top: 15%; right: 10%;"><label style="font-size: 14px; font-weight: lighte; color:silver">{{ restaurant.status }}</label></span>  
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.type }}</label></span>
        <span style="position: absolute; top: 35%; right: 11%;"><label style="font-size: 16px; font-weight: lighte; color:silver">{{ restaurant.grade.toFixed(1) }}</label></span>  <br/><br/>    
        <span><label style="font-size: 16px; font-weight: lighter; font-family: sans-serif;">{{ restaurant.location.address.street }}  {{ restaurant.location.address.number }}</label></span>
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
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#/"><span class="glyphicon glyphicon-home"></span>  Restorani</a></li>
            <li><a v-on:click="showRestaurantComments"><span class="glyphicon glyphicon-comment"></span> Komentari </a></li>
          </ul>
        </div>
      </div>
    </nav>
	
	    <div class="comments-admin">
	
	        <h1 style="position: absolute; margin-top: 20px; margin-left: 600px; font-weight: bolder; color: rgb(30, 31, 104);">KOMENTARI</h1>
	  
	        <div class="container-fluid text-center" style="position: absolute; left: 250px; top: 100px;">    
	            <div class="row content">
	                <div class="col-lg-8"> 
	                    <div class="comments-panel">
	                        <div v-for="comment in comments" class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">{{ comment.customer }}</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> {{ comment.restaurant }}</span><br/>
	                                <span style="margin-left: -145px;"><label>Ocena: </label> {{ comment.grade }}</span><br/>
	                                <p class="comment-text" style="width:280px">
	                                    {{ comment.content }}
	                                </p>
	                            </div>
	                        </div>
	                                    	                        
	                    </div>
	                 </div>
	            </div>
	         </div>        
	    </div>
	</div>
`
	,
	mounted () {
		axios
          .get('/restaurant/' + this.$route.query.id)
          .then(response => (this.restaurant = response.data))
        axios
          .get('/comments/getApprovedComments/' + this.$route.query.id)
          .then(response => (this.comments = response.data))
    }, 
	methods : {
		showRestaurantComments : function (product) {
			window.location.href = "#/restaurantComments?id="+ this.$route.query.id;
		}
	}
});