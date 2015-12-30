<footer class="page-footer">
	<div class="container">
		<div class="row">
			<div class="col l6 m6 s12">
				<h5 class="white-text fbeta">Angular<span class="text-red">JS</span> Recipes</h5>
				<p class="grey-text text-lighten-4">AngularJS Recipes is created for web developers who simply want to sharpen their knowledge. This service aims to become your right hand no matter if you are a novice or a well established developer.</p>
			</div>
			<div class="col l2 m2 s4">
				<ul>
					<li><a class="grey-text text-lighten-3" href="#!/about">About</a></li>
					<li><a class="grey-text text-lighten-3" href="#!/blog">News</a></li>
					<li><a class="grey-text text-lighten-3" href="#!/faq">FAQ</a></li>
					<li><a class="grey-text text-lighten-3" href="#contactModal" modal>Contact</a></li>
				</ul>
			</div>
			<div class="col l2 m2 s4">
				<ul>
					<li><a class="grey-text text-lighten-3" href="#!/recipes">Recipes</a></li>
					<li><a class="grey-text text-lighten-3" href="#!/series">Series</a></li>
					<li><a class="grey-text text-lighten-3" href="#!/statistics">Statistics</a></li>
				</ul>
			</div>
			<div class="col l2 m2 s4">
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
			<span class="ibeta">
			Angular<span class="text-red">JS</span> Recipes
			{{--<a class="grey-text text-lighten-4 right" href="#!">More Links</a>--}}
			</span>
			<div class="right">
				<ul class="social-icons">
					<li><a href="https://twitter.com/angular_recipes" target="_blank" title="Twitter" class="social tw"></a></li>
					<li><a href="https://github.com/angularjs-recipes" target="_blank" title="Github" class="social gt"></a></li>
					<li><a href="http://codepen.io/angularjs-recipes/" target="_blank" title="Codepen" class="social cp"></a></li>
				</ul>
			</div>
		</div>

	</div>
</footer>

<div id="unsignedModal" class="modal small-modal">
	<div class="modal-content">
		<div class="modal-header">
			<h2 class="left-align decoration">Join Us!</h2>
			<a class="pull-right modal-action modal-close" href="javascript:void(0)" aria-label="Close">
				<i class="mdi-navigation-cancel"></i>
			</a>
		</div>

		<div class="modal-form-padding center">
			<h4>You can participate in our learning community but first you must create an account or sign in and have fun!</h4>
			<a href="#!/login" class="btn modal-action modal-close">Login</a>
		</div>
	</div>
</div>

<div id="contactModal" class="modal" ng-controller="ContactController as contactCtl">
	<div class="modal-content">
		<div class="modal-header">
			<h2 class="left-align decoration">Contact Us</h2>
			<a class="pull-right modal-action modal-close" href="javascript:void(0)" aria-label="Close">
				<i class="mdi-navigation-cancel"></i>
			</a>
		</div>

		<form class="col s12 modal-form-padding" name="contactForm" ng-submit="contactCtl.submit(contactForm.$valid)" novalidate>
			<div class="row">
				<div class="input-field col s12 m6">
					<i class="mdi-action-account-circle prefix"></i>
					<input id="icon_prefix" type="text" class="validate" name="name" ng-model="contactCtl.contact.name"
						   required>
					<label for="icon_prefix">Name</label>

					<div ng-messages="contactForm.name.$error" ng-if="contactForm.name.$dirty">
						<div ng-message="required">
							<p class="help-block text-red"><i class="mdi-action-highlight-remove"></i> Please enter
								your name</p>
						</div>
					</div>
				</div>
				<div class="input-field col s12 m6">
					<i class="mdi-communication-email prefix"></i>
					<input id="icon_email" type="email" class="validate" name="email" ng-model="contactCtl.contact.email"
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
							  ng-model="contactCtl.contact.message" required></textarea>
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
					<button type="submit" class="waves-effect waves-light btn">Submit <i
								class="mdi-content-send right"></i></button>
				</div>
			</div>
		</form>
	</div>
</div>

<div id="requestModal" class="modal" ng-controller="RequestController as requestCtl">
	<div class="modal-content">
		<div class="modal-header">
			<h2 class="left-align decoration">Request a Recipe</h2>
			<a class="pull-right modal-action modal-close" href="javascript:void(0)" aria-label="Close">
				<i class="mdi-navigation-cancel"></i>
			</a>
		</div>


		<form class="col s12 modal-form-padding" name="requestForm" ng-submit="requestCtl.submit(requestForm.$valid)" novalidate>
			<div class="row">
				<div class="input-field col s12 m6">
					<i class="mdi-action-account-circle prefix"></i>
					<input id="icon_prefix" type="text" class="validate" name="name" ng-model="requestCtl.request.name"
						   required>
					<label for="icon_prefix">Name</label>

					<div ng-messages="requestForm.name.$error" ng-if="requestForm.name.$dirty">
						<div ng-message="required">
							<p class="help-block text-red"><i class="mdi-action-highlight-remove"></i> Please enter
								your name</p>
						</div>
					</div>
				</div>
				<div class="input-field col s12 m6">
					<i class="mdi-communication-email prefix"></i>
					<input id="icon_email" type="email" class="validate" name="email" ng-model="requestCtl.request.email"
						   required>
					<label for="icon_email">Email</label>

					<div ng-messages="requestForm.email.$error" ng-if="requestForm.email.$dirty">
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
							  ng-model="requestCtl.request.message" required></textarea>
					<label for="icon_prefix2">Request</label>

					<div ng-messages="requestForm.message.$error" ng-if="requestForm.message.$dirty">
						<div ng-message="required">
							<p class="help-block text-red"><i class="mdi-action-highlight-remove"></i> Please enter
								your request</p>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="input-field col s12 right-align">
					<button type="submit" class="waves-effect waves-light btn">Submit <i class="mdi-content-send right"></i></button>
				</div>
			</div>
		</form>
	</div>
</div>

@include('partials.js')

@if(env('APP_ENV') == 'local')
<script type="text/javascript" src="{{asset('bower_components/jquery/dist/jquery.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular/angular.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-route/angular-route.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-messages/angular-messages.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-animate/angular-animate.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-sanitize/angular-sanitize.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-aria/angular-aria.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-md5/angular-md5.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-loading-bar/build/loading-bar.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/satellizer/satellizer.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/materialize/dist/js/materialize.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angular-materialize/src/angular-materialize.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/angularUtils-disqus/dirDisqus.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/prism/prism.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/prism/components/prism-php.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/prism/plugins/show-language/prism-show-language.min.js')}}"></script>
<script type="text/javascript" src="{{asset('bower_components/hello/dist/hello.all.min.js')}}"></script>

<script type="text/javascript" src="{{asset('js/app.module.js')}}"></script>
<script type="text/javascript" src="{{asset('js/app.routes.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/public/home.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/public/navigation.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/public/about.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/public/faq.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/public/stats.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/public/error.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/public/request.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/public/requests.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/public/contact.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/recipes/index.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/recipes/show.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/series/index.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/series/show.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/lessons/show.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/topics/index.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/topics/show.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/posts/index.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/posts/show.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/users/login.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/users/register.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/users/forgot.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/users/reset.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/users/dashboard.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/users/account.js')}}"></script>
<script type="text/javascript" src="{{asset('js/controllers/users/recipes.js')}}"></script>
<script type="text/javascript" src="{{asset('js/services/auth.js')}}"></script>
<script type="text/javascript" src="{{asset('js/services/user.js')}}"></script>
<script type="text/javascript" src="{{asset('js/services/recipe.js')}}"></script>
<script type="text/javascript" src="{{asset('js/services/topic.js')}}"></script>
<script type="text/javascript" src="{{asset('js/services/serie.js')}}"></script>
<script type="text/javascript" src="{{asset('js/services/lesson.js')}}"></script>
<script type="text/javascript" src="{{asset('js/services/post.js')}}"></script>
<script type="text/javascript" src="{{asset('js/services/faq.js')}}"></script>
<script type="text/javascript" src="{{asset('js/services/theme.js')}}"></script>
<script type="text/javascript" src="{{asset('js/recipes.js')}}"></script>
@else
<script type="text/javascript" src="{{asset('js/assets.js')}}"></script>
<script type="text/javascript" src="{{asset('js/production.min.js')}}"></script>
@endif
</body>
</html>
