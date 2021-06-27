Vue.component("home-page", {
	data: function () {
		    return {
		      restaurants: null
		    }
	},
	template: ` 
	    <div id="home">

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
      <a class="navbar-brand" href="#">Logo</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">Products</a></li>
        <li><a href="#">Deals</a></li>
        <li><a href="#">Stores</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li v-on:click="login"><span class="glyphicon glyphicon-user"></span> Prijavite se/Registrujte se</a></li>
      </ul>
    </div>
  </div>
</nav>

<div class="container">    
  <div class="row">
    <div class="col-lg-4">
      <div class="panel panel-primary">
        <div class="panel-heading">TORTILLA CASA</div>
        <div class="panel-body"><img src="https://www.gdecemo.rs/images/company/large/38391402_2229231537361475_218978392190484480_n-N13B.jpg" class="img-responsive" style="style='height: 100%; width: 100%; object-fit: contain'" alt="Image"></div>
        <div class="panel-footer">Bulevar oslobodjenja 50</div>
      </div>
    </div>
    <div class="col-lg-4">  
      <div class="panel panel-primary">
        <div class="panel-heading">KFC</div>
        <div class="panel-body"><img src="https://indiaeducationdiary.in/wp-content/uploads/2020/10/IMG-20201024-WA0014.jpg" class="img-responsive" style="style='height: 100%; width: 100%; object-fit: contain'" alt="Image"></div>
        <div class="panel-footer">Promenada</div>
      </div>
    </div>
    <div class="col-lg-4"> 
      <div class="panel panel-primary">
        <div class="panel-heading">JOKER</div>
        <div class="panel-body"><img src="https://i.pinimg.com/564x/98/25/9f/98259fcd873f22730e10112a9cf568e2.jpg" class="img-responsive" style="style='height: 100%; width: 100%; object-fit: contain'" alt="Image"></div>
        <div class="panel-footer">Zeleznicka 55</div>
      </div>
    </div>
  </div>
</div><br>

<div class="container">    
  <div class="row">
    <div class="col-lg-4">
      <div class="panel panel-primary">
        <div class="panel-heading">GYROS MASTER</div>
        <div class="panel-body"><img src="https://lh3.googleusercontent.com/proxy/Zxq-zT3FBtYf-uas7DL5C34OHko-ZeFgWLExyOGrYesw1x6PYxCU3fvpFJDCn6q-48GoqARGJFRqpA" class="img-responsive" style="width:100%" alt="Image"></div>
        <div class="panel-footer">Buy 50 mobiles and get a gift card</div>
      </div>
    </div>
    <div class="col-lg-4"> 
      <div class="panel panel-primary">
        <div class="panel-heading">FOODY</div>
        <div class="panel-body"><img src="https://promenadanovisad.rs/wp-content/uploads/2018/10/Foody-logo.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
        <div class="panel-footer">Buy 50 mobiles and get a gift card</div>
      </div>
    </div>
    <div class="col-lg-4"> 
      <div class="panel panel-primary">
        <div class="panel-heading">MILKY</div>
        <div class="panel-body"><img src="https://www.biznisgroup.com/wp-content/uploads/2018/11/46655053_303621933816462_2332955887917858816_n-600x600.jpg" class="img-responsive" style="width:100%" alt="Image"></div>
        <div class="panel-footer">Buy 50 mobiles and get a gift card</div>
      </div>
    </div>
  </div>
</div><br><br>


<div class="bg-modal">
  <div class="modal-content">
    <div class="login-title">
      <h3 style="color: rgb(161, 89, 21); font-weight: bolder;"> PRISTUPITE VAŠEM NALOGU </h3>
    </div>
    <div v-on:click="loginClose" class="close">+</div>
    <div class = "form-div">
      <form>
        <input type="text" class="login-inputs" placeholder="korisničko ime"><br/>
        <input type="password" class="login-inputs" placeholder="lozinka"> <br/><br/>

        <button class="button" style="background-color: rgb(224, 142, 64); color: white;"> Prijavite se</button>
      </form>
    </div>
  </div>
</div>

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
		
		login : function (event) {
			document.querySelector('.bg-modal').style.display = 'flex';
		},
		
		loginClose: function (event) {
			document.querySelector('.bg-modal').style.display = 'none';
		}
	},
	mounted () {
     /*   axios
          .get('rest/proizvodi/getJustProducts')
          .then(response => (this.products = response.data))*/
    }
});