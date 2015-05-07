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
			'App\Repositories\Blog\BlogInterface',
			'App\Repositories\Blog\BlogRepository'
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
			'App\Repositories\Recipe\RecipeInterface',
			'App\Repositories\Recipe\RecipeRepository'
		);
	}

}
