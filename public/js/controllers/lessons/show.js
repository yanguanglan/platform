(function() {
	'use strict';

	angular
		.module('recipesApp')
		.controller('LessonController', LessonController);

	LessonController.$inject = ['lesson', 'serie'];

	function LessonController(lesson, serie) {
		var lessonCtl = this;
		lessonCtl.lesson = lesson;
		lessonCtl.serie = serie;
		lessonCtl.previous = {
			uuid: null,
			title: null
		};
		lessonCtl.next = {
			uuid: null,
			title: null
		};
		lessonCtl.previousPageExists = function() {
			return lessonCtl.lesson.order != 1;
		};
		lessonCtl.nextPageExists = function() {
			return lessonCtl.lesson.order != lessonCtl.serie.lessons.length;
		};
		lessonCtl.activeLesson = function(current, loop) {
			return current == loop ? 'active-text' : 'black-text';
		};
		angular.forEach(lessonCtl.serie.lessons, function(lesson) {
			if (lessonCtl.previousPageExists()) {
				if (lesson.order == lessonCtl.lesson.order - 1) {
					lessonCtl.previous = {
						uuid: lesson.uuid,
						title: lesson.title
					};
                    console.log(lessonCtl.previous);
				}
			}

			if (lessonCtl.nextPageExists()) {
				if (lesson.order == lessonCtl.lesson.order + 1) {
					lessonCtl.next = {
						uuid: lesson.uuid,
						title: lesson.title
					};
                    console.log(lessonCtl.next);
				}
			}
		});
	}
})();
