<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use App\Repositories\Recipe\RecipeInterface as Recipe;
use App\Repositories\Serie\SerieInterface as Serie;
use App\Repositories\Post\PostInterface as Post;

class CreateSlugs extends Command {

	protected $name = 'recipes:slugs';
	protected $recipe;
	protected $serie;
	protected $post;
	protected $description = 'Create recipes / series / posts slugs';

	public function __construct(Recipe $recipe, Serie $serie, Post $post)
	{
		parent::__construct();
		$this->recipe = $recipe;
		$this->serie = $serie;
		$this->post = $post;
	}

	/**
	 * Execute the console command.
	 *
	 * @return mixed
	 */
	public function fire()
	{
		// Recipes
		$this->recipe->createSlugs();
		$this->recipe->createContent();
		$this->info('Recipes slugs created successfully!');

		// Series
		$this->serie->createSlugs();
		$this->info('Series slugs created successfully!');

		// Posts
		$this->post->createSlugs();
		$this->info('Posts slugs created successfully!');
	}

}
