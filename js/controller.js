(function (angular) {
  'use strict';

  // 控制器模块

  angular
    .module('todoApp.ctrl', [])
    .controller('TodoController', ['$scope', '$location', 'TodoSrv', TodoController]);

  // 控制器中应该值保留简单的业务逻辑处理

  // 因为现在这个控制器中，即包含了业务处理，也包含了数据操作
  // 为了代码结构更加合理，现在需要将 数据操作封装到一个 数据服务 中
  // 控制器将来只需要调用 数据服务 中操作数据的方法，具体的数据操作交给 数据服务 来完成

  function TodoController($scope, $location, TodoSrv) {
    // Your starting point. Enjoy the ride!

    // vm ---> viewmodel 视图模型
    var vm = $scope;

    // 1 展示任务列表
    var todoList = TodoSrv.getData();

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
    vm.del = function (id) {
      // console.log(id);
      for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].id === id) {
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
    vm.edit = function (id) {
      vm.editingId = id;
    };
    // 编辑文本框通过 todo.name 与数据双向绑定，当我们在视图中修改了任务名称以后
    // 然后，数据会自动发生变化。
    // 敲回车，执行 vm.editingId = -1 ，数据发生变化，重新计算 editingId === todo.id
    // 此时，所有任务项的id 与 editingId 都不相同，所以，元素都移除这个类
    vm.editSave = function () {
      vm.editingId = -1;
    };

    // 5 切换任务选中状态(单个或批量)
    // 单个选中：通过双向数据绑定来实现的（ng-model）
    vm.isCheckedAll = false;
    vm.checkAll = function () {
      // 根据全选按钮的选中状态，来控制所有任务项的选中状态
      for (var i = 0; i < todoList.length; i++) {
        todoList[i].isCompleted = vm.isCheckedAll;
      }
    };

    // 6 清除已完成任务
    vm.delCompleted = function () {
      // 删除已完成，就是保留未完成
      var tempArr = [];
      for (var i = 0; i < todoList.length; i++) {
        if (!todoList[i].isCompleted) {
          tempArr.push(todoList[i]);
        }
      }

      // 清空数组（没有改变指向）
      todoList.length = 0;
      [].push.apply(todoList, tempArr);

      // 连等赋值：（改变指向）
      // vm.todoList = todoList = tempArr;

			/* for(var i = 0; i < todoList.length; i++) {
				if(todoList[i].isCompleted) {
					todoList.splice(i, 1);
					i--;
				}
			} */
    };
    // 6.1 控制清除任务按钮的展示和隐藏
    vm.isShow = function () {
      var ret = false;
      for (var i = 0; i < todoList.length; i++) {
        if (todoList[i].isCompleted) {
          ret = true;
          break;
        }
      }

      return ret;
    };

    // 7 显示未完成任务数
    vm.getCount = function () {
      var count = 0;
      for (var i = 0; i < todoList.length; i++) {
        if (!todoList[i].isCompleted) {
          count++;
        }
      }

      return count;
    };

    // 8 显示不同状态的任务 以及当前任务高亮处理
    vm.status = undefined;
		/* vm.selectAll = function () {
			vm.status = undefined;
		};
		vm.selectActive = function () {
			vm.status = false;
		};
		vm.selectCompleted = function () {
			vm.status = true;
		}; */

    // 9 根据URL变化显示相应任务
    // var url = $location.url()
    // console.log(url);
    vm.location = $location;
    // vm.location = $location.url();
    vm.$watch('location.url()', function (newVal, oldVal) {
      console.log(newVal);
      switch (newVal) {
        case '/active':
          vm.status = false;
          break;
        case '/completed':
          vm.status = true;
          break;
        default:
          vm.status = undefined;
          break;
      }
    });
  }


})(angular);