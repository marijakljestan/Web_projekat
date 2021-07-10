Vue.component("comments-manager", {
	data: function () {
		    return {
		      comments: null
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
	            <li class="active"><a href="#/manager"><span class="glyphicon glyphicon-home"></span> Početna</a></li>
	            <li><a href="#/managerProfile"><span class="glyphicon glyphicon-user"></span> Moj Profil</a></li>
	            <li><a v-on:click="showRestaurant"><span class="glyphicon glyphicon-tasks"></span> Moj restoran</a></li>
	            <li><a v-on:click="showOrders"><span class="glyphicon glyphicon-cutlery"></span> Porudžbine</a></li>
	            <li><a v-on:click="showCustomers"><span class="glyphicon glyphicon-globe"></span> Kupci</a></li>
	            <li><a v-on:click="showComments"><span class="glyphicon glyphicon-comment"></span> Komentari</a></li>
          	 </ul>
	          <ul class="nav navbar-nav navbar-right">
	            <li><a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a></li>
	          </ul>
	        </div>
	      </div>
	    </nav>
	
	    <div class="comments-admin">
	
	        <h1 style="position: absolute; margin-top: 20px; margin-left: 600px; font-weight: bolder; color: rgb(30, 31, 104);">KOMENTARI</h1>
	
	        <div class="filter-comments-checkboxes">
	            <input type="checkbox" id="approved-coments" value="comment">
	            <label style="color: rgb(30, 31, 104);"> Odobreni komentari</label><br>
	            <input type="checkbox" id="rejected-comments" value="comment">
	            <label style="color: rgb(30, 31, 104);"> Odbijeni komentari</label><br>
	            <input type="checkbox" id="rejected-comments" value="comment">
	            <label style="color: rgb(30, 31, 104);"> Komentari na čekanju</label><br>
	        </div>
	  
	        <div class="container-fluid text-center" style="position: absolute; left: 250px; top: 100px;">    
            <div class="row content">
                <div class="col-lg-8"> 
                    <div class="comments-panel">
                        <div v-for="comment in comments" class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">{{ comment.customer }}</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> {{ comment.restaurant }}</span><br/>
	                                <span style="margin-left: -145px;"><label>Ocena: </label> {{ comment.grade }}</span><br/>
	                                <p class="comment-text" style="width:280px; margin-left:50px;">
	                                    {{ comment.content }}
	                                </p>
	                            </div>
	                            <div v-if="comment.status == 'PENDDING'">
	                            	<button v-on:click="approveComment(comment)" class="rate-comment" style="margin-left:-80px; background-color: rgb(156, 231, 156);">+</button>
	                            	<button v-on:click="rejectComment(comment)" class="rate-comment" style="margin-left: 5px;background-color: rgb(233, 149, 149);">-</button>
	                            </div>
	                            <h4 v-if="comment.status == 'APPROVED'" style="margin-left:-80px; color: rgb(156, 200, 156);"><b>ODOBREN</b></h4><br/>
	                            <h4 v-if="comment.status == 'REJECTED'" style="margin-left:-80px; margin-top: 10; color: rgb(233, 149, 149);"><b>ODBIJEN</b></h4><br/>
	                        </div>
                        <div class="comment-panel">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -141px;"><label>Restoran:</label> Tortilla cassa</span><br/>
                                <span style="margin-left: -220px;"><label>Ocena: </label> 4.6</span><br/>
                                <p class="comment-text">
                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                                </p>
                            </div>       
                        </div>     
                
                        <div class="comment-panel">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -141px;"><label>Restoran:</label> Tortilla cassa</span><br/>
                                <span style="margin-left: -220px;"><label>Ocena: </label> 4.6</span><br/>
                                <p class="comment-text">
                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                                </p>
                            </div>       
                        </div>

                        <div class="comment-panel">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -141px;"><label>Restoran:</label> Tortilla cassa</span><br/>
                                <span style="margin-left: -220px;"><label>Ocena: </label> 4.6</span><br/>
                                <p class="comment-text">
                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                                </p>
                            </div>       
                        </div> 

                        <div class="comment-panel">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -141px;"><label>Restoran:</label> Tortilla cassa</span><br/>
                                <span style="margin-left: -220px;"><label>Ocena: </label> 4.6</span><br/>
                                <p class="comment-text">
                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                                </p>
                            </div>       
                        </div>

                        
                        <div class="comment-panel">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -141px;"><label>Restoran:</label> Tortilla cassa</span><br/>
                                <span style="margin-left: -220px;"><label>Ocena: </label> 4.6</span><br/>
                                <p class="comment-text">
                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                                </p>
                            </div>       
                        </div>

                        <div class="comment-panel">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -141px;"><label>Restoran:</label> Tortilla cassa</span><br/>
                                <span style="margin-left: -220px;"><label>Ocena: </label> 4.6</span><br/>
                                <p class="comment-text">
                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                                </p>
                            </div>       
                        </div>
                        
                        <div class="comment-panel">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -141px;"><label>Restoran:</label> Tortilla cassa</span><br/>
                                <span style="margin-left: -220px;"><label>Ocena: </label> 4.6</span><br/>
                                <p class="comment-text">
                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
                                </p>
                            </div>       
                        </div>

                        <div class="comment-panel">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -150px;">                      
                                <span style="margin-left: -141px;"><label>Restoran:</label> Tortilla cassa</span><br/>
                                <span style="margin-left: -220px;"><label>Ocena: </label> 4.6</span><br/>
                                <p class="comment-text">
                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
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
          .get('/comments/getRestaurantComments/' + this.$route.query.id)
          .then(response => (this.comments = response.data))
    },
	methods : {
		/*addToCart : function (product) {
			axios
			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		}*/
		
		showRestaurant : function() {
			axios
	          .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/restaurantManager?id="+ response.data.restaurant;
		      })
		},
		
		showOrders: function() {
			axios
	          .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/ordersManager?id="+ response.data.restaurant;
		      })
		},
		
		showCustomers: function() {
			axios
	          .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/customersManger?id="+ response.data.restaurant;
		      })
		},
		
		showComments : function (product) {
			axios
			  .get('/manager/')
	          .then(response => {
		    		window.location.href = "#/commentsManager?id="+ response.data.restaurant;
		      })
		},

		approveComment : function(comment) {
			axios
				.put('/comment/approveComment/' + comment.id)
				.then(response => {
					this.comments = response.data;
				})
				.catch(error => {
					console.log(error.response)
				});
		},
		
		logout : function (event) {
			window.location.href = "#/";
		}
	}
});