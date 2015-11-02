<!DOCTYPE html>
<html>

<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /> @include('partials.favicons')
	<link type="text/css" rel="stylesheet" href="{{asset('bower_components/materialize/dist/css/materialize.min.css')}}" media="screen,projection" />
	<link type="text/css" rel="stylesheet" href="{{asset('bower_components/font-awesome/css/font-awesome.min.css')}}" media="screen,projection" />
	<link type="text/css" rel="stylesheet" href="{{asset('bower_components/github-markdown-css/github-markdown.css')}}" media="screen,projection" />
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/8.9.1/styles/default.min.css">
	<link type="text/css" rel="stylesheet" href="{{asset('css/style.css')}}" media="screen,projection" />
	<title>AngularJS Recipes</title>
	<base href="{{url('/')}}" </head>

	<body ng-app="recipesApp" ng-cloak>
		<div class="navbar-fixed">
			<nav class="grey darken-4" role="navigation" ng-controller="NavigationController as navigationCtl">
				<div class="nav-wrapper container">
					<a id="logo-container" href="#!/" class="brand-logo waves-effect waves-light">Angular<span class="text-red">JS</span>
				Recipes</a>
					<ul class="right hide-on-med-and-down">
						<li ng-class="{ active: navigationCtl.isCurrentPath('/recipes') }"><a href="#!/recipes" class="waves-effect waves-light">Recipes</a></li>
						<li ng-class="{ active: navigationCtl.isCurrentPath('/blog') }"><a href="#!/blog" class="waves-effect waves-light">News</a></li>
						<li><a href="#contactModal" class="waves-effect waves-light" modal>Contact</a></li>
					</ul>

					<ul id="nav-mobile" class="side-nav">
						<li ng-class="{ active: navigationCtl.isCurrentPath('/') }"><a href="#!/" class="waves-effect waves-light">Home</a></li>
						<li ng-class="{ active: navigationCtl.isCurrentPath('/recipes') }"><a href="#!/recipes" class="waves-effect waves-light">Recipes</a></li>
						<li ng-class="{ active: navigationCtl.isCurrentPath('/blog') }"><a href="#!/blog" class="waves-effect waves-light">News</a></li>
						<li><a href="#contactModal" class="waves-effect waves-light" modal>Contact</a></li>
					</ul>
					<a href="#" class="button-collapse" data-activates="nav-mobile" data-sidenav="left" data-closeonclick="true"><i class="mdi-navigation-menu"></i></a>
				</div>
			</nav>
		</div>
