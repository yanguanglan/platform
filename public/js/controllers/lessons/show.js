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
		lessonCtl.previous = null;
		lessonCtl.next = null;
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
					lessonCtl.previous = lesson.uuid;
				}
			}

			if (lessonCtl.nextPageExists()) {
				if (lesson.order == lessonCtl.lesson.order + 1) {
					lessonCtl.next = lesson.uuid;
				}
			}
		});
    }
})();
