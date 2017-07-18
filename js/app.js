(function (angular) {
	'use strict';

	angular
		.module('todoApp', [])
		.controller('TodoController', ['$scope', TodoController]);

	function TodoController($scope) {
		// Your starting point. Enjoy the ride!

		// vm ---> viewmodel 视图模型
		var vm = $scope;

		// 1 展示任务列表
		var todoList = [
			{ id: 1, name: '抽烟', isCompleted: false },
			{ id: 2, name: '喝酒', isCompleted: true },
			{ id: 3, name: '烫头发', isCompleted: false }
		];

		vm.todoList = todoList;


		// 2 添加任务
		vm.taskName = ''; // 用户输入的任务名称
		vm.add = function () {
			if (vm.taskName.trim() === '') {
				return;
			}

			var id,
				length = todoList.length;

			// 如果数组中没有值，那么添加项的id就是：1
			// 如果数组中右值，那么就取数组最后一项的id，再加1
			if (length === 0) {
				id = 1;
			} else {
				// 获取数组最后一项的id值，再加1，就是当前项的id值
				id = todoList[todoList.length - 1].id + 1;
			}

			todoList.push({ id: id, name: vm.taskName, isCompleted: false });
			vm.taskName = '';
		};

		// 3 删除一条任务
		vm.del = function(id) {
			// console.log(id);
			for(var i = 0; i < todoList.length; i++) {
				if(todoList[i].id === id) {
					todoList.splice(i, 1);
					break;
				}
			}
		};

	}
})(angular);
