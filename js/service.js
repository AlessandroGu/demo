(function (angular) {
  'use strict';

  // 将数据操作放到 服务模块 中

  angular
    .module('todoApp.service', [])
    .service('TodoSrv', ['$window', function ($window) {
      // var todoList = [
      //   { id: 1, name: '抽烟', isCompleted: false },
      //   { id: 2, name: '喝酒', isCompleted: true },
      //   { id: 3, name: '烫头发', isCompleted: false }
      // ];

      // 从 localStorage 中获取数据
      var localStorage = $window.localStorage;
      var todoList = JSON.parse(localStorage.getItem('todo')) || [];

      // 保存数据
      this.save = function () {
        localStorage.setItem('todo', JSON.stringify(todoList));
      };

      var that = this;

      // 获取数据的方法
      this.getData = function () {
        return todoList;
      };

      // 添加数据
      this.add = function (taskName) {
        var id,
          length = todoList.length;
        if (length === 0) {
          id = 1;
        } else {
          id = todoList[todoList.length - 1].id + 1;
        }

        todoList.push({ id: id, name: taskName, isCompleted: false });

        this.save();
      };

      // 删除数据
      this.del = function (id) {
        for (var i = 0; i < todoList.length; i++) {
          if (todoList[i].id === id) {
            todoList.splice(i, 1);
            break;
          }
        }

        that.save();
      };

      // 全选
      this.checkAll = function (isCheckedAll) {
        for (var i = 0; i < todoList.length; i++) {
          todoList[i].isCompleted = isCheckedAll;
        }

        that.save();
      };
    }]);

})(angular);