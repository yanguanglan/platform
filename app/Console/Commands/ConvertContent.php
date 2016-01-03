<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use App\Repositories\Recipe\RecipeInterface as Recipe;
use App\Repositories\Lesson\LessonInterface as Lesson;
use App\Repositories\Exercise\ExerciseInterface as Exercise;
use App\Repositories\Post\PostInterface as Post;

class ConvertContent extends Command {

	protected $name = 'recipes:content';
	protected $recipe;
	protected $lesson;
	protected $exercise;
	protected $post;
	protected $description = 'Convert recipes / lessons / exercises / posts markdown content to html';

	public function __construct(Recipe $recipe, Lesson $lesson, Exercise $exercise, Post $post)
	{
		parent::__construct();
		$this->recipe = $recipe;
		$this->lesson = $lesson;
		$this->exercise = $exercise;
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
		$this->recipe->createContent();
		$this->info('Recipes content created successfully!');

		// Series
		$this->lesson->createContent();
		$this->info('Lessons slugs content successfully!');

		// Exercises
		$this->exercise->createContent();
		$this->info('Exercises content created successfully!');

		// Posts
		$this->post->createContent();
		$this->info('Posts content created successfully!');
	}

}
