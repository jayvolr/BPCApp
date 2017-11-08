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

var ribbon = document.getElementById('infoRibbon') || document.getElementById('errorRibbon');

if (!!ribbon) {
  setTimeout(function(){
    ribbon.style.top = 0;
  }, 4000)
}

const formInputs = document.getElementById('contactForm').getElementsByTagName('input');

let validityStatus = {
  firstName: false,
  lastName: false,
  email: false,
  email2: false,
  phone: true,
  orgZIP: true,
  subject: false,
  message: false
}

function checkValidity(element) {
  if (element.required && element.value === '') {
    document.getElementById(element.name + 'Error').innerHTML = 'Please fill out this field';
    document.getElementById(element.name + 'Error').style.display = 'block';
    validityStatus[element.name] = false;
  }else if (element.required && element.value.length > 0) {
    document.getElementById(element.name + 'Error').style.display = 'none';
    validityStatus[element.name] = true;
  }

  switch (element.name) {
    case 'firstName':
      console.log('checking validity of firstName');
      if (element.value.length > 0) {
        document.getElementById(element.name + 'Error').style.display = 'none';
        validityStatus[element.name] = true;
      }
      break;
    case 'lastName':
      console.log('checking validity of lastName');
      if (element.value.length > 0) {
        document.getElementById(element.name + 'Error').style.display = 'none';
        validityStatus[element.name] = true;
      }
      break;
    case 'email':
      console.log('checking validity of email');
      if (validator.isEmail(element.value)) {
        document.getElementById(element.name + 'Error').style.display = 'none';
        validityStatus[element.name] = true;
      }else if (element.value.length > 0) {
        document.getElementById(element.name + 'Error').innerHTML = 'Please enter a valid email address';
        document.getElementById(element.name + 'Error').style.display = 'block';
        validityStatus[element.name] = false;
      }
      break;
    case 'email2':
      console.log('checking validity of email2');
      if (element.value === document.forms.contactForm.email.value) {
        document.getElementById(element.name + 'Error').style.display = 'none';
        validityStatus[element.name] = true;
      }else if (element.value.length > 0) {
        document.getElementById(element.name + 'Error').innerHTML = 'Email address does not match';
        document.getElementById(element.name + 'Error').style.display = 'block';
        validityStatus[element.name] = false;
      }
      break;
    case 'phone':
      console.log('checking validity of phone');
      if (validator.isMobilePhone(element.value, 'en-US')) {
        document.getElementById(element.name + 'Error').style.display = 'none';
        validityStatus[element.name] = true;
      }else if (element.value.length > 0) {
        document.getElementById(element.name + 'Error').innerHTML = 'Please enter a valid US phone number';
        document.getElementById(element.name + 'Error').style.display = 'block';
        validityStatus[element.name] = false;
      }else {
        document.getElementById(element.name + 'Error').style.display = 'none';
        validityStatus[element.name] = true;
      }
      break;
    case 'orgZIP':
      console.log('checking validity of orgZIP');
      if (validator.isPostalCode(element.value, 'US')) {
        document.getElementById(element.name + 'Error').style.display = 'none';
        validityStatus[element.name] = true;
      }else if (element.value.length > 0) {
        document.getElementById(element.name + 'Error').innerHTML = 'Please enter a valid US ZIP code';
        document.getElementById(element.name + 'Error').style.display = 'block';
        validityStatus[element.name] = false;
      }else {
        document.getElementById(element.name + 'Error').style.display = 'none';
        validityStatus[element.name] = true;
      }
      break;
    default:
      console.log('input not recognized');
  }

  if (!Object.values(validityStatus).includes(false)) {
    console.log('ALL VALID');
  }
}

for (var input of formInputs) {
  input.addEventListener('blur', function(e) {
    checkValidity(e.srcElement);
  });
}
document.forms.contactForm.message.addEventListener('blur', function(e) {
  checkValidity(e.srcElement);
});

document.getElementById('formSubmit').addEventListener('click', function(e) {
  if (Object.values(validityStatus).includes(false)) {
    e.preventDefault();
    zenscroll.toY(zenscroll.getTopOf(document.getElementById('contact')) - 71)
  }
})

function onSubmit(g) {
  console.log('submitted');
  console.log(g);
}
