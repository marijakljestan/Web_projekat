Vue.component("home-page", {
	data: function () {
		    return {
		      restaurants: null,
		      usernameRegister: '',
		      passwordRegister: '',
		      nameRegister: '',
			  surnameRegister: '',
			  genderRegister:'',
		      dateOfBirthRegister: '',
		      roleRegister : '',
		      usernameLog: '',
		      passwordLog: '',
		      errorMessage: ''
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
            <li v-on:click="login"><span class="glyphicon glyphicon-user"></span> Prijavite se </li>
            <li v-on:click="register"><span class="glyphicon glyphicon-user"></span> Registrujte se</li>
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
            <input v-model="usernameLog" type="text" class="login-inputs" placeholder="korisničko ime"><br/>
            <input v-model="passwordLog" type="password" class="login-inputs" placeholder="lozinka"> <br/><br/>
    		<p style="color:red;text-transform:none;">{{errorMessage}}</p>
            <button v-on:click="loginUser" class="button" style="background-color: rgb(224, 142, 64); color: white;"> Prijavite se</button>
        </div>
      </div>
    </div>

    <div class="registracija">
      <div class="modal-content-reg">
        <div class="login-title">
          <h3 style="color: rgb(161, 89, 21); font-weight: bolder;"> KREIRAJTE VAŠ NALOG </h3>
        </div>
        <div v-on:click="registrationClose" class="close">+</div>
        <div class = "form-div" style="margin-top: 20px;">
          <form>
            <input v-model="usernameRegister" type="text"  class="login-inputs" style="margin-top: 0px;" placeholder="korisničko ime" id = "userNameReg">
            <label style="color : red;" id="usernameLabel" name = "labels" display="hidden"> </label>
            <input v-model="passwordRegister" type="password" class="login-inputs" style="margin-top: 0px;" placeholder="lozinka"> 
            <label style="color : red;" id="passwordLabel" name = "labels" display="hidden"> </label>
            <input v-model="nameRegister" type="text" class="login-inputs" style="margin-top: 0px;" placeholder="ime">
            <label style="color : red;" id="nameLabel" name = "labels" display="hidden"> </label>
            <input v-model="surnameRegister" type="text" class="login-inputs" style="margin-top: 0px;" placeholder="prezime">
            <label style="color : red;" id="surnameLabel" name = "labels" display="hidden"> </label>
            <select v-model="genderRegister" class="login-inputs" style="margin-top: 0px;">
                <option>MUŠKO</option>
                <option>ŽENSKO</option>
            </select>
            <label style="color : red;" id="genderLabel" name = "labels" display="hidden"> </label>
            <label>Datum rođenja:</label>
	        <input type="date" class="login-inputs" style="margin-top: 1px;" id="date_input">
          	<label style="color : red;" id="dateLabel" name = "labels" display="hidden"> </label>  
            <button v-on:click="registerUser" class="button" style="background-color: rgb(224, 142, 64); color: white;"> Potvrdi</button>
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
		},
		register : function (event) {
			document.querySelector('.registracija').style.display = 'flex';
		},
		registerUser : function (event) {
				
				event.preventDefault();
				
				let genderReg;
				if (this.genderRegister == 'MUŠKO') {
					genderReg = 'MALE';
				} else if(this.genderRegister == 'ŽENSKO'){
					genderReg = 'FEMALE';
				}
				var dates = document.getElementById("date_input").value;
       			var d=new Date(dates);
       			
       			var valid = true;
       			     		      			
       			 if(!this.usernameRegister){
			        document.getElementById('usernameLabel').innerHTML = "Morate uneti korisnicko ime!";
					document.getElementById('usernameLabel').style.display = 'block';
					valid = false;
			    }
			     else if(!this.passwordRegister){
			       document.getElementById('passwordLabel').innerHTML = "Morate uneti lozinku!";
				   document.getElementById('passwordLabel').style.display = 'block';
				   valid = false;
			    }
			    else if(this.nameRegister[0] < 'A' || this.nameRegister[0] > 'Z' || !this.nameRegister){
			        document.getElementById('nameLabel').innerHTML = "Morate uneti ime koje pocinje velikim slovom!";
					document.getElementById('nameLabel').style.display = 'block';
					valid = false;
			    }
			    else if(this.surnameRegister[0] < 'A' || this.surnameRegister[0] > 'Z' || !this.surnameRegister){
			        document.getElementById('surnameLabel').innerHTML = "Morate uneti prezime koje pocinje velikim slovom!";
					document.getElementById('surnameLabel').style.display = 'block';
					valid = false;
			    }
			    else if(!genderReg){
			    	document.getElementById('genderLabel').innerHTML = "Morate izabrati pol!";
					document.getElementById('genderLabel').style.display = 'block';
					valid = false;
			    }
			    else if(!dates){
			    	document.getElementById('dateLabel').innerHTML = "Morate izabrati datum rodjenja!";
					document.getElementById('dateLabel').style.display = 'block';
					valid = false;
			    }
			    
			    if(valid == true){
			    	let newUser = {
						username : this.usernameRegister,
						password : this.passwordRegister,
	    				name : this.nameRegister,
	    				surname : this.surnameRegister,
	    				gender : genderReg,
	    				dateOfBirth : d,
	    				role : 'CUSTOMER'				
    			}
				axios 
    			.post('/users/register', JSON.stringify(newUser))
    			.then(response => {
    				if (response.data == "") {
						document.getElementById('usernameLabel').innerHTML = "Vec postoji uneto korisnicko ime!";
						document.getElementById('usernameLabel').style.display = 'block';
    				} else {
						window.location.href = "/";
    				}
    			})
    			.catch(error => {
				    console.log(error.response)
				});
			    }
			
		},		
		registrationClose: function (event) {
			 this.usernameRegister = '';
		     this.passwordRegister = '';
		     this.nameRegister = '';
			 this.surnameRegister = '';
			 for (element of document.getElementsByName('labels')){
			 	element.innerHTML = '';
			 	element.style.display = 'hidden';
			 }
			 document.querySelector('.registracija').style.display = 'none';
		},
		loginUser: function(event) {
			if(this.usernameLog=='' || this.passwordLog=='')
			{
				this.errorMessage="Morate popuniti sva polja.";
			}
			else
			{

				let loginParameters = {
    				username : this.usernameLog,
    				password : this.passwordLog
    			}
    			
	    		axios 
	    			.post('/user/login', JSON.stringify(loginParameters))
	    			.then(response => {
	    				if (response.data == "") {
							this.errorMessage="Neispravno korisničko ime ili lozinka.";
						}
						else {
							if(response.data.role == "CUSTOMER"){
								window.location.href = "#/customer";
							} else if (response.data.role == "MANAGER"){
								window.location.href = "#/manager";
							} else if (response.data.role == "DELIVERER") {
								window.location.href = "#/deliverer";
							} else if (response.data.role == "ADMIN") {
								window.location.href = "#/admin";
							} else {
								this.errorMessage="Neispravno korisničko ime ili lozinka.";
							}
	    				}
					})
					.catch(error => {
				    console.log(error.response)
				});
			}
    }, 
		mounted () {
     	/*   axios
          		.get('rest/proizvodi/getJustProducts')
          		.then(response => (this.products = response.data))*/
    }
  }
});