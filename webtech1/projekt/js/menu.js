(function($){
  ('use strict');

  $(document).ready( function(event) {
    buildMenu('js/menu.json');
  });

  function buildMenu(url){
    $.get(url,function(data){
      //data = JSON.parse(data);
      $('#main_navbar').prepend(walkMenu(typeof(data) === 'string'?JSON.parse(data):data,0));
    });
  }

  function walkMenu(data,level){
    var uls=[
      'nav navbar-nav',
      'dropdown-menu',
      'dropdown-menu',
    ]
    var lis=[
      'dropdown',
      'dropdown-submenu',
      '',
    ]
    var as=[
      'dropdown-toggle',
      '',
      '',
    ]

    var ul = $('<ul>',{class:uls[ level ]});
    for(i in data){
      if(!data.hasOwnProperty(i)) continue;
      var li = $('<li>').appendTo(ul);
      if( data[i].items ){
        li.addClass(lis[level]);
        $('<a href="#" class="'+as[level]+'" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">' + data[i].text + '<span class="caret"></span></a>').appendTo(li);
        li.append(walkMenu( data[i].items, level + 1) ) ;
      }else{
        $('<a>',{href:data[i].url,text:data[i].text}).appendTo(li);
      }
    }
    return ul;
  }
}(jQuery))
