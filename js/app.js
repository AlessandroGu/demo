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

		// 4 修改任务
		// 思路：双击任务元素，给当前项添加 editing 类

		// 给 $scope 添加一个 editingId ，用来记录当前正在修改项的id值，默认值：-1
		// 双击某一个任务，将当前项的id 赋值为 editingId，此时引起了数据的变化，
		// 页面中与 editingId 相关的指令都会被重新计算，那么 editingId === todo.id
		// 当前双击的这一项id就与 editingId 相同了，那么当前项就会添加类
		vm.editingId = -1;
		vm.edit = function(id) {
			vm.editingId = id;
		};
		// 编辑文本框通过 todo.name 与数据双向绑定，当我们在视图中修改了任务名称以后
		// 然后，数据会自动发生变化。
		// 敲回车，执行 vm.editingId = -1 ，数据发生变化，重新计算 editingId === todo.id
		// 此时，所有任务项的id 与 editingId 都不相同，所以，元素都移除这个类
		vm.editSave = function() {
			vm.editingId = -1;
		};


	}
})(angular);
