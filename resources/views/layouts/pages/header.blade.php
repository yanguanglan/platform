<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
	@include('partials.favicons')
	<link type="text/css" rel="stylesheet" href="{{asset('css/materialize.min.css')}}" media="screen,projection"/>
	@section('headerAssets')
	<link type="text/css" rel="stylesheet" href="{{asset('css/style.css')}}" media="screen,projection"/>
	@show
</head>

<body ng-app="recipesApp">
<div class="navbar-fixed">
	<nav class="grey darken-4" role="navigation">
		<div class="nav-wrapper container"><a id="logo-container" href="{{route('home')}}"
											  class="brand-logo waves-effect waves-light">Angular<span class="text-red">JS</span>
				Recipes</a>
			<ul class="right hide-on-med-and-down">
				<li><a href="{{route('recipes.index')}}" class="waves-effect waves-light">Recipes</a></li>
				<li><a href="{{route('blog.index')}}" class="waves-effect waves-light">News</a></li>
				<li><a href="#faq" class="waves-effect waves-light" scroller>FAQ</a></li>
				<li><a href="#contactModal" class="waves-effect waves-light modal-trigger">Contact</a></li>
			</ul>

			<ul id="nav-mobile" class="side-nav">
				<li><a href="{{route('recipes.index')}}" class="waves-effect waves-light">Recipes</a></li>
				<li><a href="{{route('blog.index')}}" class="waves-effect waves-light">News</a></li>
				<li><a href="#faq" class="waves-effect waves-light" scroller>FAQ</a></li>
				<li><a href="#contactModal" class="waves-effect waves-light modal-trigger">Contact</a></li>
			</ul>
			<a href="#" data-activates="nav-mobile" class="button-collapse"><i class="mdi-navigation-menu"></i></a>
		</div>
	</nav>
</div>