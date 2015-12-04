<?php namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {

	/**
	 * Bootstrap any application services.
	 *
	 * @return void
	 */
	public function boot()
	{
		//
	}

	/**
	 * Register any application services.
	 *
	 * This service provider is a great spot to register your various container
	 * bindings with the application. As you can see, we are registering our
	 * "Registrar" implementation here. You can add your own bindings too!
	 *
	 * @return void
	 */
	public function register()
	{
		$this->app->bind(
			'Illuminate\Contracts\Auth\Registrar',
			'App\Services\Registrar'
		);

		$this->app->bind(
			'App\Repositories\Contact\ContactInterface',
			'App\Repositories\Contact\ContactRepository'
		);

		$this->app->bind(
			'App\Repositories\Newsletter\NewsletterInterface',
			'App\Repositories\Newsletter\NewsletterRepository'
		);

		$this->app->bind(
			'App\Repositories\Lesson\LessonInterface',
			'App\Repositories\Lesson\LessonRepository'
		);

		$this->app->bind(
			'App\Repositories\Post\PostInterface',
			'App\Repositories\Post\PostRepository'
		);

		$this->app->bind(
			'App\Repositories\Recipe\RecipeInterface',
			'App\Repositories\Recipe\RecipeRepository'
		);

		$this->app->bind(
			'App\Repositories\Serie\SerieInterface',
			'App\Repositories\Serie\SerieRepository'
		);

		$this->app->bind(
			'App\Repositories\Topic\TopicInterface',
			'App\Repositories\Topic\TopicRepository'
		);

		$this->app->bind(
			'App\Repositories\User\UserInterface',
			'App\Repositories\User\UserRepository'
		);
	}

}
