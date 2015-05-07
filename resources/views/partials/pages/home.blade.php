@extends('layouts.home.master')

@section('content')
	<section id="banner" class="section">
		<div class="container center">
			<div class="row">
				<div class="col s12">
					<img src="{{asset('img/Big_Logo2.png')}}" alt=""/>
				</div>
			</div>
			<div class="row">
				<div class="col s12">
					<h2>...share your knowledge with others and help make learning fun again!</h2>
				</div>
			</div>
			<div class="row">
				<div class="col s12">
					<a href="#recipeModal" class="waves-effect waves-light btn-large custom-red modal-trigger">Submit your
						Recipes</a>
				</div>
			</div>
		</div>
	</section>

	<section id="about" class="section">
		<div class="container center">
			<div class="row">
				<div class="col s12">
					<h1 class="decoration">About</h1>
				</div>
			</div>
			<div class="row module">
				<div class="center-align">
					<img src="{{asset('img/Knowlegde.png')}}" alt=""/>
				</div>
				<div class="left-align">
					<h2>Learn</h2>

					<p>AngularJs Recipes is created to make you a better developer. Everyone can create an account and add
						his/her recipes just for the shake of participation. Learning procedure can become tough and quite
						expensive but we want to make it free and fun for you. Who said that knowledge is not fun
						anymore?</p>
				</div>
			</div>
			<div class="row module">
				<div class="center-align hide-on-med-and-up">
					<img src="{{asset('img/Contribute.png')}}" alt=""/>
				</div>
				<div class="right-align">
					<h2>Contribute</h2>
					<p>AngularJS Recipes is created and maintained by people who love web development and of course
						AngularJS. It is an open source and non-profitable project which aims to help developers become
						wiser and stronger. Becoming a vital member of this effort is important for us. Who doesn't want a
						stronger team
						anyway?</p>
				</div>
				<div class="center-align hide-on-small-only">
					<img src="{{asset('img/Contribute.png')}}" alt=""/>
				</div>
			</div>
			<div class="row module">
				<div class="center-align">
					<img src="{{asset('img/Share.png')}}" alt=""/>
				</div>
				<div class="left-align">
					<h2>Share</h2>

					<p>AngularJS Recipes wants to help you share your knowledge with others out there. There is nothing more
						important than sharing your ideas and experiences with other people. Instead of trying to pull
						interest through your webpage, try to shine among others here and gain some new followers. There are
						many benefits for every participant!</p>
				</div>
			</div>
		</div>
	</section>

	<section id="intermediate" class="section">
		<div class="class container center">
			<div class="row">
				<div class="col s12 left-align">
					<h2>Your knowledge is power...</h2>
				</div>
			</div>
			<div class="row">
				<div class="col s12">
					<a href="#recipeModal" class="waves-effect waves-light btn-large custom-red modal-trigger">Submit your
						Recipes</a>
				</div>
			</div>
			<div class="row">
				<div class="col s12 right-align">
					<h2>...and make learning fun again!</h2>
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