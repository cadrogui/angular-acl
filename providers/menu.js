/**
 * MambaJSFramework
 *
 * @description :: AngularJS provider as Immediatelly Invoked Function Expression (IIFE)
 *                 An IIFE removes variables from the global scope. This helps prevent variables
 *                 and function declarations from living longer than expected in the global scope,
 *                 which also helps avoid variable collisions.
 *
 *                 Mamba JS use angular.extend for bind data or functions to views instead of vm, this is
 *                 because using extend give more clean and Object oriented code, so you can keep things clear
 *                 about your private and public variables or methods.
 *
 * @help        :: See https://github.com/cadrogui/MambaJS-Framework#readme
 *
 */

(function(){

  angular
    .module('MambaJSMenu', [])
    .provider('Menu', function() {

    var vm = this;
    var _menu = [];
    var t = 0;

    angular.extend(vm, {
      _menu: [],
      $get: get,
      register: register
    })

    function get(){
      return {
        getItems: getItems
      };
    };

    function getItems(rol) {
      rol == undefined ? [] : rol = rol
      vm._menu = JSON.parse(JSON.stringify(_menu))
      angular.forEach(vm._menu, function(head, key){
        if(head.submenus){
          angular.forEach(head.submenus, function(sm, keySm){
            if(sm.acl.indexOf(rol) >= 0){
              head.canView = true
              sm.canView = true
            }else{
              t++
              sm.canView = false
              if(t == head.submenus.length){
                head.canView = false
                t = 0
              }
            }
          })
        }
      })
      return vm._menu;
    }

    function register(item){
      _menu.push(item);
    };
  })
})();
