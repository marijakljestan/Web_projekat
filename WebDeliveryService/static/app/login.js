Vue.component("login-page", {
	data: function () {
		    return {
		      restaurants: null
		    }
	},
	template: ` 
	    <div class="login-wrap">
            <div class="login-html">
                <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Prijavite se</label>
                <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Kreirajte nalog</label>
                <div class="login-form">
                    <div class="sign-in-htm">
                        <div class="group">
                            <label for="user" class="label">Korisničko ime:</label>
                            <input id="user1" type="text" class="input">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Lozinka:</label>
                            <input id="pass1" type="password" class="input" data-type="password">
                        </div>
                        <div class="group">
                            <input id="check" type="checkbox" class="check" checked>
                            <label for="check"><span class="icon"></span> Ostanite ulogovani</label>
                        </div>
                        <div class="group">
                            <input type="submit" class="button" value="Prijavite se">
                        </div>
                        <div class="hr"></div>
                        <div class="foot-lnk">
                            <a href="#forgot">Zaboravili ste lozinku?</a>
                        </div>
                    </div>
                    <div class="sign-up-htm">
                        <div class="group">
                            <label for="user" class="label">Korisničko ime:</label>
                            <input id="user" type="text" class="input">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Lozinka:</label>
                            <input id="pass" type="password" class="input" data-type="password">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Ime:</label>
                            <input id="name" type="text" class="input">
                        </div>
                        <div class="group">
                            <label for="pass" class="label">Prezime:</label>
                            <input id="surname" type="text" class="input">
                        </div>
                        <div class="group">
                            <label  class="label">Pol:</label>
                            <select id="gender" class="input">
                                <option value="MUSKO">MUSKI</option>
                                <option value="ZENSKO">ZENSKI</option>
                            </select>
                        </div>


                        <div class="group">
                            <input type="submit" class="button" value="Sign Up">
                        </div>
                        <div class="hr"></div>
                        <div class="foot-lnk">
                            <label for="tab-1">Već imate nalog?</label>
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
	},
	mounted () {
     /*   axios
          .get('rest/proizvodi/getJustProducts')
          .then(response => (this.products = response.data))*/
    }
});