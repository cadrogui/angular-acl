## Angular ACL

Angular ACL is a provider that handle your menu's allowing dynamic menu's and sub menus, based on the user rol given by a rest service.

This provider is part of the MambaJS-Framework project.

## Include the provider

`````
<script src="app/providers/menu.js"></script>
`````

## Inject the MambaJSMenu module

`````
(function () {
  angular.module('app', [
    'MambaJSMenu'
  ])
})();
`````

## Registring menus and submenus

To register menu and submenus you must inject the _MenuProvider_ on the config function in your route, then register all items, here is an example.

`````
MenuProvider.register({
  header: {
    title: 'Administración',
    icon: 'fa-keyboard-o'
  },
  submenus: [
    { url: 'administracion.addCliente',
      title: 'Nuevo Cliente',
      icon: 'fa-plus-square-o',
      acl: [ 'God' ]
    },
    { url: 'administracion.addUsuario',
      title: 'Nuevo Usuario',
      icon: 'fa-plus-square-o',
      acl: [ 'God', 'Admin' ]
    },
    { url: 'administracion.buscarEmails',
      title: 'Emails Notificaciones',
      icon: 'fa-envelope',
      acl: [ 'God', 'Admin' ]
    },
    { url: 'administracion.dashboard',
      title: 'Kibana',
      icon: 'fa-plus-square-o',
      acl: [ 'God' ],
    }
  ]
})
`````

## Setting the view

here is an example that how can view or navigation can be configured, it use ng-if because if the condition is true the hatml is rendered on the DOM tree, that keep private all menus that are not allowed

`````
<li ng-class="{active: $state.includes(item.url)}"
      ng-repeat-start="item in app.menu" ng-if="!item.submenus">
<a ui-sref="{{ item.header.url }}">
  <i class="fa {{ item.header.icon }}"></i>
  <span class="nav-label"> {{ ::item.header.title }} </span>
</a>
</li>

<li ng-class="{active: $state.includes(item.url)}" ng-repeat-end ng-if="item.canView == true">
<a href="">
  <i class="fa {{ item.header.icon }}"></i>
  <span class="nav-label ng-binding"> {{ ::item.header.title }} </span>
  <span class="fa arrow"></span>
</a>
<ul class="nav nav-second-level in collapse">
  <li ui-sref-active="active" ng-repeat="submenu in item.submenus" ng-if="submenu.canView">
    <a ui-sref="{{ submenu.url }}" class="ng-binding" >
      <i class="fa {{ submenu.icon }}"></i>
      {{ ::submenu.title }}
    </a>
  </li>
</ul>
</li>
`````

## Make available the menu object

Here is an example of appController, it`s a good solution set a factory to handle the user data returned by the rest service, and in this object put the role name for the current user, on this way you pass this string as argument to the Menu.getItems function

`````
(function() {
  angular
    .module('app')
    .controller('AppController', AppController)

  AppController.$inject = [ 'Menu' ];

  function AppController(Menu){
  	var vm = this;

    angular.extend(vm, {
      menu: Menu.getItems(USER_ROLE),
    });
  }
})();
`````
