@extends('layouts.pages.master')

@section('headerAssets')
	<link type="text/css" rel="stylesheet" href="{{asset('css/error.css')}}" media="screen,projection"/>
@endsection

@section('content')
	<section id="banner" class="section">
		<div class="container center">
			<div class="row">
				<div class="col s12">
					<img src="{{asset('img/error.png')}}" alt=""/>
				</div>
			</div>
			<div class="row">
				<div class="col s12">
					<h2>...oops, it seems you 've lost your way!</h2>
				</div>
			</div>
			<div class="row">
				<div class="col s12">
					<a href="{{route('home')}}" class="waves-effect waves-light btn-large custom-red">Go Back</a>
				</div>
			</div>
		</div>
	</section>

	<section id="faq" class="section">
		<div class="container center">
			<div class="row">
				<div class="col s12">
					<h1 class="decoration">FAQ</h1>
				</div>
			</div>
			<div class="row">
				<div class="col s12">
					<ul class="collapsible popout" data-collapsible="accordion">
						<li>
							<div class="collapsible-header"><i class="mdi-action-done"></i>Where can i find some recipes?
							</div>
							<div class="collapsible-body"><p>Our team works very hard to create an attractive platform where
									you can share your recipes, write articles or submit questions in our forum area.
									Unfortunately this is still under development but we are going to inform you quickly when
									new features are applied.</p></div>
						</li>
						<li>
							<div class="collapsible-header"><i class="mdi-action-done"></i>Who creates those recipes?</div>
							<div class="collapsible-body"><p>The recipes are created by developers for developers. Everyone
									can create an account and upload his/her recipes, articles etc</p></div>
						</li>
						<li>
							<div class="collapsible-header"><i class="mdi-action-done"></i>Can i follow a recipe creator?
							</div>
							<div class="collapsible-body"><p>Of course you can. When you follow a recipe creator everytime
									he/she creates a new recipe or article you are going to get notified. This is one of the
									biggest benefits for the people who create recipes and share those with us.</p></div>
						</li>
						<li>
							<div class="collapsible-header"><i class="mdi-action-done"></i>Why should i bother uploading
								recipes?
							</div>
							<div class="collapsible-body"><p>Everyone can gain a lot through this procedure. A strong
									developer can share his/her tricks and check others ideas. Furthermore instead of just
									writing articles on your webpage the same articles can be published here. The strongest
									developers here will pull some attention, gain followers and maybe find some potential
									clients. Who knows?</p></div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
@endsection