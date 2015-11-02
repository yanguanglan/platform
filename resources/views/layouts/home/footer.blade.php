<footer class="page-footer">
	<div class="container">
		<div class="row">
			<div class="col l6 s12">
				<h5 class="white-text">Angular<span class="text-red">JS</span> Recipes</h5>
				<p class="grey-text text-lighten-4">This is a non-profitable project created by developers who are tired
					of paying for knowledge, experiences, recipes and tricks. Share your recipes and help build a strong
					community. Because knowledge is power!</p>
			</div>
			<div class="col l2 offset-l2 s12">
				<h5 class="white-text">Links</h5>
				<ul>
					<li><a class="grey-text text-lighten-3" href="#/recipes">Recipes</a></li>
					<li><a class="grey-text text-lighten-3" href="#/blog">News</a></li>
					<li><a class="grey-text text-lighten-3" href="#contactModal" modal>Contact</a></li>
				</ul>
			</div>
			<div class="col l2 s12">
				<h5 class="white-text">AngularJS</h5>
				<ul>
					<li><a class="grey-text text-lighten-3" href="https://angularjs.org/" target="_blank">AngularJS
							1</a></li>
					<li><a class="grey-text text-lighten-3" href="https://angular.io/" target="_blank">AngularJS 2</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="footer-copyright">
		<div class="container">
			Angular<span class="text-red">JS</span> Recipes &copy; 2015
			{{--<a class="grey-text text-lighten-4 right" href="#!">More Links</a>--}}
		</div>
	</div>
</footer>

<div id="contactModal" class="modal" ng-controller="ContactController">
	<div class="modal-content">
		<h2 class="center-align decoration">Contact Us</h2>

		<div class="row">
			<form class="col s12" name="contactForm" ng-submit="submit(contactForm.$valid)" novalidate>
				<div class="row">
					<div class="input-field col s6">
						<i class="mdi-action-account-circle prefix"></i>
						<input id="icon_prefix" type="text" class="validate" name="name" ng-model="contact.name"
							   required>
						<label for="icon_prefix">Name</label>

						<div ng-messages="contactForm.name.$error" ng-if="contactForm.name.$dirty">
							<div ng-message="required">
								<p class="help-block text-red"><i class="mdi-action-highlight-remove"></i> Please enter
									your name</p>
							</div>
						</div>
					</div>
					<div class="input-field col s6">
						<i class="mdi-communication-email prefix"></i>
						<input id="icon_email" type="email" class="validate" name="email" ng-model="contact.email"
							   required>
						<label for="icon_email">Email</label>

						<div ng-messages="contactForm.email.$error" ng-if="contactForm.email.$dirty">
							<div ng-message="required">
								<p class="help-block text-red"><i class="mdi-action-highlight-remove"></i> Please enter
									your email</p>
							</div>
							<div ng-message="email">
								<p class="help-block text-red"><i class="mdi-action-highlight-remove"></i> Please enter
									a valid email</p>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<i class="mdi-editor-mode-edit prefix"></i>
						<textarea id="icon_prefix2" class="materialize-textarea validate" name="message"
								  ng-model="contact.message" required></textarea>
						<label for="icon_prefix2">Message</label>

						<div ng-messages="contactForm.message.$error" ng-if="contactForm.message.$dirty">
							<div ng-message="required">
								<p class="help-block text-red"><i class="mdi-action-highlight-remove"></i> Please enter
									your message</p>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 right-align">
						<button type="submit" class="waves-effect waves-light btn custom-red">Submit <i class="mdi-content-send right"></i></button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<div id="recipeModal" class="modal">
	<div class="modal-content">
		<h2 class="center-align decoration">Stay Tuned</h2>

		<div class="row">
			<form class="col s12" name="recipesForm" ng-submit="submit(recipesForm.$valid)" novalidate>
				<div class="row">
					<div class="input-field col s6">
						<i class="mdi-action-account-circle prefix"></i>
						<input id="icon_prefix" type="text" class="validate" name="name" ng-model="recipes.name"
							   required>
						<label for="icon_prefix">Name</label>

						<div ng-messages="recipesForm.name.$error" ng-if="recipesForm.name.$dirty">
							<div ng-message="required">
								<p class="help-block text-red"><i class="mdi-action-highlight-remove"></i> Please enter
									your name</p>
							</div>
						</div>
					</div>
					<div class="input-field col s6">
						<i class="mdi-communication-email prefix"></i>
						<input id="icon_email" type="email" class="validate" name="email" ng-model="recipes.email"
							   required>
						<label for="icon_email">Email</label>

						<div ng-messages="recipesForm.email.$error" ng-if="recipesForm.email.$dirty">
							<div ng-message="required">
								<p class="help-block text-red"><i class="mdi-action-highlight-remove"></i> Please enter
									your email</p>
							</div>
							<div ng-message="email">
								<p class="help-block text-red"><i class="mdi-action-highlight-remove"></i> Please enter
									a valid email</p>
							</div>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12 right-align">
						<button type="submit" class="waves-effect waves-light btn custom-red">Submit <i class="mdi-content-send right"></i></button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
<script type="text/javascript" src="{{asset('bower_components/jquery/dist/jquery.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-messages/angular-messages.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/materialize/dist/js/materialize.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-materialize/src/angular-materialize.js')}}"></script>
<script type="text/javascript" src="{{asset('js/recipes.js')}}"></script>
</body>
</html>
