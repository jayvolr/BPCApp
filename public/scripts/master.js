var header = document.getElementsByTagName('header')[0];
var menuItems = document.querySelectorAll('#menuList a');
var paths = document.getElementsByTagName('path');
// var learnMore = document.getElementById('learnMore');
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

// learnMore.addEventListener('click', function() {
//   zenscroll.toY(zenscroll.getTopOf(document.getElementById('about')) - 71);
// });

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

// var contactForm = document.forms.contactForm;
//
// contactForm.addEventListener('submit', function(e) {
//   e.preventDefault();
//   var data = {
//     email: contactForm.email.value,
//     _subject: contactForm.subject.value,
//     message: contactForm.message.value + `\n\n name: ${contactForm.name.value}\n email: ${contactForm.email.value}\n phone: ${contactForm.phone.value || 'Not provided'}`
//   };
//
//   console.log(data);
//
//   var xhr = new XMLHttpRequest();
//   xhr.open('POST', 'https://formspree.io/glenn@bigpicture.life');
//   xhr.setRequestHeader('Accept', 'application/json');
//
//   xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4) {
//       if (xhr.status === 200) {
//         console.log(xhr.responseText); // 'This is the returned text.'
//       }else {
//         console.log('Error: ' + xhr.status); // An error occurred during the request.
//       }
//     }
//   }
//
//   xhr.send({message: 'come on'});
//
// });
