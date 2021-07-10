Vue.component("admin-profile-page", {
	data: function () {
		    return {
		      user: null,
		      errorMessage: ''
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
            <li class="active"><a href="#/admin"><span class="glyphicon glyphicon-home"></span> Početna</a></li>
            <li><a href="#/adminProfile"><span class="glyphicon glyphicon-user"></span> Moj Profil</a></li>
            <li><a href="#/userProfilesView"><span class="glyphicon glyphicon-folder-open"></span> Korisnici</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li> <a href="#/"><span class="glyphicon glyphicon-log-out"></span> Odjavite se</a> </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="forma-profile">

        <h1 style="position: absolute; margin-top: 20px; margin-left: 650px; font-weight: bolder; color: rgb(30, 31, 104);">MOJ PROFIL</h1>
  
        <div  class="col-lg-12"> 
        
            <div class="col-lg-6" style="margin-left: 120px; margin-top: 150px;">
            
                <label style="color: rgb(30, 31, 104);">Ime:</label><br/>
                <input type="text" v-model="user.name" class="input-fields"><br/><br/>
                <label style="color: rgb(30, 31, 104);">Prezime:</label><br/>
                <input type="text" v-model="user.surname" class="input-fields"><br/><br/>
                <label style="color: rgb(30, 31, 104);">Korisničko ime:</label><br/>
                <input type="text" v-model="user.username" class="input-fields" disabled><br/><br/>                
            </div>


            <div class="col-lg-6" style="margin-left: 560px; margin-top: -290px;">        
                <label style="color: rgb(30, 31, 104);">Datum rođenja:</label><br/>
                <input id="date-of-birth" type="date" v-model="user.dateOfBirth" class="input-fields" style="margin-left: 0px;"><br/><br/>
                <label style="color: rgb(30, 31, 104);">Pol:</label><br/>
                <select id="gender" v-model="user.gender" class="input-fields" style="margin-top: 0px;">
                  <option>MALE</option>
                  <option>FEMALE</option>
              	</select><br/><br/> 
                <label style="color: rgb(30, 31, 104);">Lozinka:</label><br/>
                <input type="text" v-model="user.password" class="input-fields"><br/><br/> 
            </div>             
        </div>  
        <p style="color:red; position: absolute; top: 430px; left: 630px;">{{errorMessage}}</p>
        <button v-on:click="acceptChanges" class="edit-profile" style="position: absolute; top: 450px; left: 630px; width: 250px;">Izmeni podatke</button>
    </div>

      <footer class="container-fluid text-center">
        <p>Online Food Delivery Copyright</p>  
      </footer>
  </div>
`
	, 
	mounted () {
     axios
          .get('/user/')
          .then(response => (this.user = response.data))
    },
	methods : {
		acceptChanges : function (event) {
				
				event.preventDefault();
				
				var dates = document.getElementById("date-of-birth").value;
       			var d=new Date(dates).toISOString().substr(0, 10);
       			
       			var valid = true;
       			     		      			
			    if(!this.user.password){
			       this.errorMessage="Zaboravili ste da unesete lozinku!";
				   valid = false;
			    }
			    else if(this.user.name[0] < 'A' || this.user.name[0] > 'Z' || !this.user.name){
			        this.errorMessage="Morate uneti ime koje pocinje velikim slovom!";
					valid = false;
			    }
			    else if(this.user.surname[0] < 'A' || this.user.surname[0] > 'Z' || !this.user.surname){
			        this.errorMessage="Morate uneti prezime koje pocinje velikim slovom!";
					valid = false;
			    }
			    
			    if(valid == true){
			    	let newUser = {
						username : this.user.username,
						password : this.user.password,
	    				name : this.user.name,
	    				surname : this.user.surname,
	    				gender : this.user.gender,
	    				dateOfBirth : d,
	    				role : 'ADMIN'				
    				}
					axios 
		    			.put('/users/edit', JSON.stringify(newUser))
		    			.then(response => {
								this.user = response.data;
		    			})
		    			.catch(error => {
						    console.log(error.response)
						});
				}
			
		},		
		logout : function (event) {
			axios 
		    	.get('/users/logout')
		    	.then(response => {
					window.location.href = "#/";
		    	})
		    	.catch(error => {
					console.log(error.response)
				});
		}
	}
});