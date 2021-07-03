Vue.component("administrator-page", {
	data: function () {
		    return {
		      restaurants: null
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
            <li class="active"><a href="#/admin">Početna</a></li>
            <li><a href="#/userProfile">Moj Profil</a></li>
            <li><a href="#/userProfilesView">Korisnici</a></li>
            <li><a href="#/commentsAdmin">Komentari</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li v-on:click="logout"><span class="glyphicon glyphicon-user"></span> Odjavite se </li>
          </ul>
        </div>
      </div>
    </nav>
    
        <div class="search">
        <input type="text" class="search-input" placeholder="Naziv restorana">
        <input type="text" class="search-input" placeholder="Lokacija restorana">
        <select class="search-input">
           <option disabled selected>Tip restorana</option>
            <option>Roštilj</option>
            <option>Kineski</option>
        </select>
        <select class="search-input">
          <option disabled selected>Izaberite ocenu</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
      </select>
        <input type="submit" class="search-submit" value="Pretrazi">

    </div>
    
   <div class="col-sm-2 sidenav" style="position: absolute; left: 1%; top: 38%;">
        <button class="add-restaurant" v-on:click="addNewRestaurant">+ Novi restoran</button>
      </div>
    
    <div class="container" style="top:43%">    
      <div class="row">
        <div class="col-lg-12"> 
          <div class="menu-group">
          
            <div class="panel panel-primary" v-on:click="showRestaurant">
              <div class="panel-heading">TORTILLA CASA</div>
              <div class="panel-body"><img src="https://www.gdecemo.rs/images/company/large/38391402_2229231537361475_218978392190484480_n-N13B.jpg" class="img-responsive" style="style='height: 100%; width: 100%; object-fit: contain'" alt="Image"></div>
              <div class="panel-footer">Bulevar oslobodjenja 50</div>
            </div>    
        
            <div class="panel panel-primary" v-on:click="showRestaurant">
              <div class="panel-heading">KFC</div>
              <div class="panel-body"><img src="https://indiaeducationdiary.in/wp-content/uploads/2020/10/IMG-20201024-WA0014.jpg" class="img-responsive" style="style='height: 100%; width: 100%; object-fit: contain'" alt="Image"></div>
              <div class="panel-footer">Promenada</div>
            </div>
        
        
            <div class="panel panel-primary" v-on:click="showRestaurant">
              <div class="panel-heading">JOKER</div>
              <div class="panel-body"><img src="https://i.pinimg.com/564x/98/25/9f/98259fcd873f22730e10112a9cf568e2.jpg" class="img-responsive" style="style='height: 100%; width: 100%; object-fit: contain'" alt="Image"></div>
              <div class="panel-footer">Zeleznicka 55</div>
            </div>

            <div class="panel panel-primary" v-on:click="showRestaurant">
              <div class="panel-heading">GYROS MASTER</div>
              <div class="panel-body"><img src="https://pronadjiusrbiji.rs/wp-content/uploads/2018/03/1521743677_brhrrngyrmastns_logo.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
              <div class="panel-footer">Buy 50 mobiles and get a gift card</div>
            </div>

            <div class="panel panel-primary" v-on:click="showRestaurant">
              <div class="panel-heading">FOODY</div>
              <div class="panel-body"><img src="https://promenadanovisad.rs/wp-content/uploads/2018/10/Foody-logo.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
              <div class="panel-footer">Buy 50 mobiles and get a gift card</div>
            </div>

            <div class="panel panel-primary" v-on:click="showRestaurant">
              <div class="panel-heading">MILKY</div>
              <div class="panel-body"><img src="https://www.biznisgroup.com/wp-content/uploads/2018/11/46655053_303621933816462_2332955887917858816_n-600x600.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
              <div class="panel-footer">Buy 50 mobiles and get a gift card</div>
            </div>

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
	methods : {
		/*addToCart : function (product) {
			axios
			.post('rest/proizvodi/add', {"id":''+product.id, "count":parseInt(product.count)})
			.then(response => (toast('Product ' + product.name + " added to the Shopping Cart")))
		}*/
		addNewRestaurant : function (){
			window.location.href = "#/addNewRestaurant";
		},
		logout : function (){
			window.location.href = "#/";
		}
	},
	mounted () {
     /*   axios
          .get('rest/proizvodi/getJustProducts')
          .then(response => (this.products = response.data))*/
    }
});