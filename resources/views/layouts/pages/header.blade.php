<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	@include('partials.favicons')
	@if(env('APP_ENV') == 'local')
	<link type="text/css" rel="stylesheet" href="{{asset('bower_components/materialize/dist/css/materialize.min.css')}}" media="screen,projection" />
	<link type="text/css" rel="stylesheet" href="{{asset('bower_components/font-awesome/css/font-awesome.min.css')}}" media="screen,projection" />
	<link type="text/css" rel="stylesheet" href="{{asset('bower_components/angular-loading-bar/build/loading-bar.min.css')}}" media="screen,projection" />
	<link type="text/css" rel="stylesheet" href="{{asset('bower_components/prism/themes/prism.css')}}" media="screen,projection" />
	<link type="text/css" rel="stylesheet" href="{{asset('bower_components/prism/plugins/show-language/prism-show-language.css')}}" media="screen,projection" />
	<link type="text/css" rel="stylesheet" href="{{asset('bower_components/angular-chart.js/dist/angular-chart.min.css')}}" media="screen,projection" />
	<link type="text/css" rel="stylesheet" href="{{asset('css/style.css')}}" media="screen,projection" />
	@else

	@endif
	<title>AngularJS Recipes</title>
	<base href="{{url('/')}}" />

	<!-- start Mixpanel -->
	<script type="text/javascript">(function(e,b){if(!b.__SV){var a,f,i,g;window.mixpanel=b;b._i=[];b.init=function(a,e,d){function f(b,h){var a=h.split(".");2==a.length&&(b=b[a[0]],h=a[1]);b[h]=function(){b.push([h].concat(Array.prototype.slice.call(arguments,0)))}}var c=b;"undefined"!==typeof d?c=b[d]=[]:d="mixpanel";c.people=c.people||[];c.toString=function(b){var a="mixpanel";"mixpanel"!==d&&(a+="."+d);b||(a+=" (stub)");return a};c.people.toString=function(){return c.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
	for(g=0;g<i.length;g++)f(c,i[g]);b._i.push([a,e,d])};b.__SV=1.2;a=e.createElement("script");a.type="text/javascript";a.async=!0;a.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";f=e.getElementsByTagName("script")[0];f.parentNode.insertBefore(a,f)}})(document,window.mixpanel||[]);
	mixpanel.init("b01ac29ea28e1bf5be81beb83fb4cef9");
	</script>
	<!-- end Mixpanel -->
</head>

<body ng-app="recipesApp" master-color ng-cloak>
	<div class="navbar-fixed">
		<nav class="grey darken-4" role="navigation" ng-controller="NavigationController as navCtl">
			<div class="nav-wrapper container">
				<a id="logo-container" href="#!/" class="brand-logo beta">Angular<span class="text-red">JS</span>
				Recipes</a>
				<ul class="right hide-on-med-and-down" active-menu>
					<li><a href="#!/recipes" class="waves-effect waves-light waves-fix">Recipes</a></li>
					<li><a href="#!/series" class="waves-effect waves-light waves-fix">Series</a></li>
					<li><a href="#!/requests" class="waves-effect waves-light waves-fix">Requests</a></li>
					<li ng-class="{'ng-hide': navCtl.isAuthenticated()}" class="no-btn"><a href="#!/register" class="btn waves-effect waves-light waves-fix">Register</a></li>
					<li ng-class="{'ng-hide': navCtl.isAuthenticated()}"><a href="#!/login" class="waves-effect waves-light waves-fix">Login</a></li>
					<li ng-class="{'ng-hide': !navCtl.isAuthenticated()}"><a href="#" class="waves-effect waves-light waves-fix dropdown-button" data-activates='dropdown3' dropdown><img ng-src="@{{navCtl.gravatar}}" class="avatar-img"> @{{navCtl.user.name}}</a></li>

					<ul id='dropdown3' class='dropdown-content' ng-class="{'ng-hide': !navCtl.isAuthenticated()}">
						<li><a href="#!/dashboard">Dashboard</a></li>
						<!-- <li><a href="#!/my-recipes">My Recipes</a></li> -->
						<li><a href="#!/account">Account</a></li>
						<li><a href="#!/" ng-click="navCtl.logout()">Logout</a></li>
					</ul>
				</ul>

				<ul id="nav-mobile" class="side-nav" active-menu>
					<li><a href="#!/" class="waves-effect waves-light">Home</a></li>
					<li><a href="#!/recipes" class="waves-effect waves-light">Recipes</a></li>
					<li><a href="#!/series" class="waves-effect waves-light">Series</a></li>
					<li><a href="#!/requests" class="waves-effect waves-light">Requests</a></li>
					<li ng-if="!navCtl.isAuthenticated()"><a href="#!/register" class="waves-effect waves-light">Register</a></li>
					<li ng-if="!navCtl.isAuthenticated()"><a href="#!/login" class="waves-effect waves-light">Login</a></li>
					<li ng-if="navCtl.isAuthenticated()"><a href="#!/dashboard" class="waves-effect waves-light">Dashboard</a></li>
					<!-- <li ng-if="navCtl.isAuthenticated()"><a href="#!/my-recipes" class="waves-effect waves-light">My Recipes</a></li> -->
					<li ng-if="navCtl.isAuthenticated()"><a href="#!/account" class="waves-effect waves-light">Account</a></li>
					<li class="divider" ng-if="navCtl.isAuthenticated()"></li>
					<li ng-if="navCtl.isAuthenticated()"><a href="#!/" class="waves-effect waves-light" ng-click="navCtl.logout()">Logout</a></li>
				</ul>
				<a href="#" class="button-collapse" data-activates="nav-mobile" data-sidenav="left" data-closeonclick="true"><i class="mdi-navigation-menu"></i></a>
			</div>
		</nav>
	</div>
