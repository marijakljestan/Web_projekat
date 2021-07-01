Vue.component("addNewRestaurant-page", {
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
          <a class="navbar-brand" href="#">Logo</a>
        </div>
        <div class="collapse navbar-collapse" id="myNavbar">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Početna</a></li>
            <li><a href="#">Korisnici</a></li>
            <li><a href="#">Komentari</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li v-on:click="login"><span class="glyphicon glyphicon-user"></span> Odjavite se </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="forma-restaurant">

        <h1 style="position: absolute; margin-top: 20px; margin-left: 550px; font-weight: bolder; color: rgb(30, 31, 104);">UNOS NOVOG RESTORANA</h1>
  
        <div  class="col-lg-12"> 
        
            <div class="col-lg-6" style="margin-left: 120px; margin-top: 110px;">
                <input type="text" class="input-fields" placeholder="Naziv restorana"><br/><br/>
                <input type="text" class="input-fields" placeholder="Tip restorana"><br/><br/>
                <label style="color: rgb(30, 31, 104);">Logo:</label><br/>
                <input type="file" style="margin-left: 190px;" id="img" name="img" accept="image/*"><br/>
                <label style="color: rgb(30, 31, 104);">Menadzer:</label><br/>
                <span>
                    <select class="input-selection">
                        <option>Mika Mikic</option>
                        <option>Jova Jovic</option>
                    </select>
                    <button class="add-manager">+</button>
                </span>
            </div>

            <div class="col-lg-6" style="margin-left: 560px; margin-top: -295px;">
                <input type="text" class="input-fields" placeholder="Ulica i broj"><br/><br/>
                <input type="text" class="input-fields" placeholder="Grad"><br/><br/>
                <input type="text" class="input-fields" placeholder="Država"><br/><br/>
                <input type="text" class="input-fields" placeholder="Geografska širina"><br/><br/>
                <input type="text" class="input-fields" placeholder="Geografska dužina"><br/><br/>
            </div>                
        </div>  
        
        <button class="accept-cancel" style="background-color: lightblue;">POTVRDI</button>
        <button v-on:click="goBack" class="accept-cancel" style="background-color: cornsilk;">ODUSTANI</button><br/>

    </div>
  
    <div class="registracija">
        <div class="modal-content-reg">
          <div class="login-title">
            <h3 style="color: rgb(161, 89, 21); font-weight: bolder;"> NOVI RESTORAJ </h3>
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
		goBack : function() {
			window.location.href = "#/admin";
		}
		
	},
	mounted () {
     /*   axios
          .get('rest/proizvodi/getJustProducts')
          .then(response => (this.products = response.data))*/
    }
});