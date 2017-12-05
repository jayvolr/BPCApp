zenscroll.setup(350, 194.719);

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
  });
}

document.getElementById('dropDownGetStarted').addEventListener('click', function() {
  toggleDropDown(false);
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
  zenscroll.toY(zenscroll.getTopOf(document.getElementById(section)) - 194.719);
}

if (window.location.pathname === '/faq') {
  if (document.referrer === 'http://localhost:3000/' || document.referrer === 'https://beta.bigpicture.life/' || document.referrer === 'https://bigpicture.life/') {
    zenscroll.toY(zenscroll.getTopOf(document.getElementById('third')) - 88);
  }
}
