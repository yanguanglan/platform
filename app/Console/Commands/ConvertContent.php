<?php namespace App\Console\Commands;

use Illuminate\Console\Command;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Input\InputArgument;
use App\Repositories\Recipe\RecipeInterface as Recipe;
use App\Repositories\LEsson\LessonInterface as LEsson;
use App\Repositories\Exercise\ExerciseInterface as Exercise;

class ConvertContent extends Command {

	protected $name = 'recipes:content';
	protected $recipe;
	protected $lesson;
	protected $exercise;
	protected $description = 'Convert recipes / lessons / exercises markdown content to html';

	public function __construct(Recipe $recipe, Lesson $lesson, Exercise $exercise)
	{
		parent::__construct();
		$this->recipe = $recipe;
		$this->lesson = $lesson;
		$this->exercise = $exercise;
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
	}

}
