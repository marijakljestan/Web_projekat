Vue.component("customer-comments", {
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
             	<li class="active"><a href="#/customer"><span class="glyphicon glyphicon-home"></span> Početna</a></li>
                <li><a href="#/customerProfile"><span class="glyphicon glyphicon-user"></span> Moj Profil</a></li>
                <li><a href="#/ordersCustomer"><span class="glyphicon glyphicon-cutlery"></span> Moje porudžbine</a></li>
                <li><a href="#/customerComments"><span class="glyphicon glyphicon-comment"></span> Komentari</a></li>   
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#/"><span class="glyphicon glyphicon-shopping-cart"></span> Korpa</a></li>
            <li><a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a></li>
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
});