Vue.component("comments-manager", {
	data: function () {
		    return {
		      comments: null,
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
	            <li class="active"><a href="#/manager">Početna</a></li>
	            <li><a href="#/managerProfile">Moj Profil</a></li>
	            <li><a href="#/restaurantManager">Moj restoran</a></li>
	            <li><a href="#/ordersManager">Porudžbine</a></li>
	            <li><a href="#/customersManger">Kupci</a></li>
	            <li><a href="#/commentsManager">Komentari</a></li>
	          </ul>
	          <ul class="nav navbar-nav navbar-right">
	            <li v-on:click="logot"><span class="glyphicon glyphicon-user"></span> Odjavite se </li>
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
	                        <div class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> Tortilla cassa</span><br/>
	                                <span style="margin-left: -195px;"><label>Ocena: </label> 4.6</span><br/>
	                                <p class="comment-text" style="width:280px">
	                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
	                                </p>
	                            </div> 
	                            <button class="rate-comment" style="margin-left:-80px; background-color: rgb(156, 231, 156);">+</button> <br/>
	                            <button class="rate-comment" style="margin-left: 5px;background-color: rgb(233, 149, 149);">-</button>       
	                        </div>
	
	                        <div class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> Tortilla cassa</span><br/>
	                                <span style="margin-left: -195px;"><label>Ocena: </label> 4.6</span><br/>
	                                <p class="comment-text" style="width:280px">
	                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
	                                </p>
	                            </div> 
	                       		<button class="rate-comment" style="margin-left:-80px; background-color: rgb(156, 231, 156);">+</button> <br/>
	                            <button class="rate-comment" style="margin-left: 5px;background-color: rgb(233, 149, 149);">-</button>       
	                        </div>  
	                
	                        <div class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> Tortilla cassa</span><br/>
	                                <span style="margin-left: -195px;"><label>Ocena: </label> 4.6</span><br/>
	                                <p class="comment-text" style="width:280px">
	                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
	                                </p>
	                            </div> 
	                           <button class="rate-comment" style="margin-left:-80px; background-color: rgb(156, 231, 156);">+</button> <br/>
	                            <button class="rate-comment" style="margin-left: 5px;background-color: rgb(233, 149, 149);">-</button>      
	                        </div>
	
	                        <div class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> Tortilla cassa</span><br/>
	                                <span style="margin-left: -195px;"><label>Ocena: </label> 4.6</span><br/>
	                                <p class="comment-text" style="width:280px">
	                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
	                                </p>
	                            </div> 
	                            <button class="rate-comment" style="margin-left:-70px; background-color: rgb(156, 231, 156); display : none;">+</button> <br/>
	                            <button class="rate-comment" style="background-color: rgb(233, 149, 149); display : none;">-</button>       
	                        </div>
	
	                        <div class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> Tortilla cassa</span><br/>
	                                <span style="margin-left: -195px;"><label>Ocena: </label> 4.6</span><br/>
	                                <p class="comment-text" style="width:280px">
	                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
	                                </p>
	                            </div> 
	                            <button class="rate-comment" style="margin-left:-80px; background-color: rgb(156, 231, 156);">+</button> <br/>
	                            <button class="rate-comment" style="margin-left: 5px;background-color: rgb(233, 149, 149);">-</button>      
	                        </div>
	                        
	                        <div class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> Tortilla cassa</span><br/>
	                                <span style="margin-left: -195px;"><label>Ocena: </label> 4.6</span><br/>
	                                <p class="comment-text" style="width:280px">
	                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
	                                </p>
	                            </div> 
	                            <button class="rate-comment" style="margin-left:-80px; background-color: rgb(156, 231, 156);">+</button> <br/>
	                            <button class="rate-comment" style="margin-left: 5px;background-color: rgb(233, 149, 149);">-</button>       
	                        </div>
	
	                        <div class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> Tortilla cassa</span><br/>
	                                <span style="margin-left: -195px;"><label>Ocena: </label> 4.6</span><br/>
	                                <p class="comment-text" style="width:280px">
	                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
	                                </p>
	                            </div> 
	                         	<button class="rate-comment" style="display:none; margin-left:-80px; background-color: rgb(156, 231, 156);">+</button> <br/>
	                            <button class="rate-comment" style="display:none; margin-left: 5px;background-color: rgb(233, 149, 149);">-</button>          
	                        </div>
	                        
	                        <div class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> Tortilla cassa</span><br/>
	                                <span style="margin-left: -195px;"><label>Ocena: </label> 4.6</span><br/>
	                                <p class="comment-text" style="width:280px">
	                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
	                                </p>
	                            </div> 
	                          	<button class="rate-comment" style="display:none; margin-left:-80px; background-color: rgb(156, 231, 156);">+</button> <br/>
	                            <button class="rate-comment" style="display:none; margin-left: 5px;background-color: rgb(233, 149, 149);">-</button>            
	                        </div>
	
	                     <div class="comment-panel">
	                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
	                            <div style="margin-top: 40px; margin-left: -150px;">                      
	                                <span style=" position: relative; margin-left: -100px;"><label>Restoran:</label> Tortilla cassa</span><br/>
	                                <span style="margin-left: -195px;"><label>Ocena: </label> 4.6</span><br/>
	                                <p class="comment-text" style="width:280px">
	                                    Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.Lorem ipsum dolor.
	                                </p>
	                            </div> 
	                            <button class="rate-comment" style="display:none; margin-left:-80px; background-color: rgb(156, 231, 156);">+</button> <br/>
	                            <button class="rate-comment" style="display:none; margin-left: 5px;background-color: rgb(233, 149, 149);">-</button>     
	                        </div>
	                    </div>
	                 </div>
	            </div>
	         </div>        
	    </div>
	</div>
`
	, 
	methods : {
		/*addToCart : function (product) {
			axios
			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		}*/
		
		logout : function (event) {
			window.location.href = "#/";
		}
	},
	mounted () {
     /*   axios
          .get('rest/proizvodi/getJustProducts')
          .then(response => (this.products = response.data))*/
    }
});/**
 * 
 */