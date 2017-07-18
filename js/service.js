(function (angular) {
  'use strict';

  // 将数据操作放到 服务模块 中

  angular
    .module('todoApp.service', [])
    .service('TodoSrv', ['$window', function ($window) {
      var todoList = [
        { id: 1, name: '抽烟', isCompleted: false },
        { id: 2, name: '喝酒', isCompleted: true },
        { id: 3, name: '烫头发', isCompleted: false }
      ];

      // 获取数据的方法
      this.getData = function() {
        return todoList;
      };
    }]);

})(angular);