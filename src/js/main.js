let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let emailField = document.getElementById('email');
let password = document.getElementById('password');

let form = document.getElementById('form');

let errorMsg = document.querySelectorAll('.errorMsg');

let errorMsgFirstName = 'First Name cannot be empty';
let errorMsgLastName = 'Last Name cannot be empty';
let errorMsgEmail = 'Email cannot be empty';
let errorMsgPassword = 'Password cannot be empty';

let failureIcon = document.querySelectorAll('.failure-icon');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    engine(firstName, 0, errorMsgFirstName);
    engine(lastName, 1, errorMsgLastName);
    engine(emailField, 2, errorMsgEmail);
    engine(password, 3, errorMsgPassword);
});

let engine = (id, serial, message) => {
    if (id.value.trim() === "") {
        errorMsg[serial].innerHTML = message;
        id.style.border = "2px solid hsl(0, 100%, 74%)";
        failureIcon[serial].style.display = "block"; 
        
    } else {
        errorMsg[serial].innerHTML = "";
        id.style.border = "2px solid hsl(246, 25%, 77%)";
        failureIcon[serial].style.display = "none";
        if (validateEmail(emailField.value) === false) {
          errorMsg[2].innerHTML = 'Looks like this is not an email';
          emailField.style.border = "2px solid hsl(0, 100%, 74%)";
          failureIcon[2].style.display = "block";
        }
    }
}

//Looks like this is not an email

let validateEmail = (email) => {
  let mailformat = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  if (email.match(mailformat))
  {
    return (true)
  }
    return (false)
}