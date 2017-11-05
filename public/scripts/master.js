var header = document.getElementsByTagName('header')[0];
var menuItems = document.querySelectorAll('#menuList a');
var paths = document.getElementsByTagName('path');
var brand = document.getElementById('brand');

zenscroll.setup(350, 71);

window.addEventListener('scroll', function() {
  if (window.scrollY > 0) {
    header.id = "headerScrolled";
    for (var path of paths) {
      path.classList.add('fillBlue');
    }
  }else {
    header.id = "";
    for (var path of paths) {
      path.classList.remove('fillBlue');
    }
  }
});

for (var item of menuItems) {
  item.addEventListener('click', function(e) {
    zenscroll.toY(zenscroll.getTopOf(document.getElementById(e.srcElement.innerHTML.toLowerCase())) - 71);
  });
}

brand.addEventListener('click', function() {
  zenscroll.toY(zenscroll.getTopOf(document.getElementById('top')) - 71);
});

document.getElementById('getStarted').addEventListener('click', function() {
  zenscroll.toY(zenscroll.getTopOf(document.getElementById('contact')) -71);
});

var dropDownMenu = document.getElementById('dropDownMenu');
var dropDownIcon = document.querySelector('#dropDownButton i');
var dropDownItems = document.querySelectorAll('#dropDownList a');
var dropDownOpen = false;

function toggleDropDown(on) {
  if (on) {
    dropDownMenu.style.height = '300px';
    dropDownIcon.className = 'icon-close'
    dropDownOpen = true;
  }else {
    dropDownMenu.style.height = '0px';
    dropDownIcon.className = 'icon-menu'
    dropDownOpen = false;
  }
}

for (var item of dropDownItems) {
  item.addEventListener('click', function(e) {
    toggleDropDown(false);
    zenscroll.toY(zenscroll.getTopOf(document.getElementById(e.srcElement.innerHTML.toLowerCase())) - 71);
  });
}

document.getElementById('dropDownGetStarted').addEventListener('click', function() {
  toggleDropDown(false);
  zenscroll.toY(zenscroll.getTopOf(document.getElementById('contact')) - 71);
});

document.getElementById('dropDownButton').addEventListener('click', function() {
  if (!dropDownOpen) {
    toggleDropDown(true);
  }else {
    toggleDropDown(false);
  }
});

if (!!window.location.hash) {
  var section = window.location.hash.slice(1);
  document.body.scrollIntoView(true);
  zenscroll.toY(zenscroll.getTopOf(document.getElementById(section)) - 71);
}

var ribbon = document.getElementById('successRibbon') || document.getElementById('errorRibbon');

if (!!ribbon) {
  setTimeout(function(){
    ribbon.style.maxHeight = 0;
    ribbon.style.padding = 0;
  }, 1500)
}
