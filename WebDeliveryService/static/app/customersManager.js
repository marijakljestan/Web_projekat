Vue.component("customers-page", {
	data: function () {
		    return {
		      customers: null
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
            <li v-on:click="logout"><span class="glyphicon glyphicon-user"></span> Odjavite se </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="registered-users">

        <h1 style="position: absolute; margin-top: 20px; margin-left: 700px; font-weight: bolder; color: rgb(30, 31, 104);">KUPCI</h1>

        <div class="show-suspect-users">
            <input type="checkbox" id="suspect-users" value="user">
            <label style="color: rgb(30, 31, 104);"> Zlatni kupci</label><br/>
            <input type="checkbox" id="suspect-users" value="user">
            <label style="color: rgb(30, 31, 104);"> Srebrni kupci</label><br/>
            <input type="checkbox" id="suspect-users" value="user">
            <label style="color: rgb(30, 31, 104);"> Bronzani kupci</label><br/>
        </div>
  
        <div class="container-fluid text-center" style="position: absolute; left: 300px; top: 100px;">    
            <div class="row content">
                <div class="col-lg-8"> 
                    <div class="users-panel">
                        <div class="user-card" style="height:180px;">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -160px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <span style="margin-left: 17px;"><label>Broj bodova:</label> 235</span><br/><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">ZLATNI KUPAC</h4>
                            </div>         
                        </div>

                        <div class="user-card" style="height:180px;">
                          <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                          <div style="margin-top: 40px; margin-left: -160px;">                      
                              <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                              <span><label>Prezime:</label> Peric</span><br/>
                              <span style="margin-left: 17px;"><label>Broj bodova:</label> 235</span><br/><br/>
                              <h4 style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">ZLATNI KUPAC</h4>
                          </div>         
                      </div>    
                
                      <div class="user-card" style="height:180px;">
                        <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                        <div style="margin-top: 40px; margin-left: -160px;">                      
                            <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                            <span><label>Prezime:</label> Peric</span><br/>
                            <span style="margin-left: 17px;"><label>Broj bodova:</label> 235</span><br/><br/>
                            <h4 style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">ZLATNI KUPAC</h4>
                        </div>         
                    </div>

                     <div class="user-card" style="height:180px;">
                            <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                            <div style="margin-top: 40px; margin-left: -160px;">                      
                                <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                                <span><label>Prezime:</label> Peric</span><br/>
                                <span style="margin-left: 17px;"><label>Broj bodova:</label> 235</span><br/><br/>
                                <h4 style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">ZLATNI KUPAC</h4>
                            </div>         
                     </div>

                     <div class="user-card" style="height:180px;">
                      <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                      <div style="margin-top: 40px; margin-left: -160px;">                      
                          <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                          <span><label>Prezime:</label> Peric</span><br/>
                          <span style="margin-left: 17px;"><label>Broj bodova:</label> 235</span><br/><br/>
                          <h4 style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">ZLATNI KUPAC</h4>
                      </div>         
                  </div> 
                        
                  <div class="user-card" style="height:180px;">
                    <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                    <div style="margin-top: 40px; margin-left: -160px;">                      
                        <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                        <span><label>Prezime:</label> Peric</span><br/>
                        <span style="margin-left: 17px;"><label>Broj bodova:</label> 235</span><br/><br/>
                        <h4 style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">ZLATNI KUPAC</h4>
                    </div>         
                </div> 

                <div class="user-card" style="height:180px;">
                  <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                  <div style="margin-top: 40px; margin-left: -160px;">                      
                      <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                      <span><label>Prezime:</label> Peric</span><br/>
                      <span style="margin-left: 17px;"><label>Broj bodova:</label> 235</span><br/><br/>
                      <h4 style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">ZLATNI KUPAC</h4>
                  </div>         
              </div>
                        
              <div class="user-card" style="height:180px;">
                <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
                <div style="margin-top: 40px; margin-left: -160px;">                      
                    <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                    <span><label>Prezime:</label> Peric</span><br/>
                    <span style="margin-left: 17px;"><label>Broj bodova:</label> 235</span><br/><br/>
                    <h4 style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">ZLATNI KUPAC</h4>
                </div>         
            </div>

            <div class="user-card" style="height:180px;">
              <h4 style="margin-top: 10; margin-left: 90px;">peraperic</h4><br/>
              <div style="margin-top: 40px; margin-left: -160px;">                      
                  <span style="margin-left: -31px;"><label>Ime:</label> Pera</span><br/>
                  <span><label>Prezime:</label> Peric</span><br/>
                  <span style="margin-left: 17px;"><label>Broj bodova:</label> 235</span><br/><br/>
                  <h4 style="color: rgb(30, 31, 104); margin-left: 70px; font-weight: bolder;">ZLATNI KUPAC</h4>
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