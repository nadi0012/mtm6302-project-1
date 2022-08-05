// Start of styling form

const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);

});

// finish styling

const $contacts = document.getElementById('contacts');

const $modal = document.getElementById('modal');
const $closeBtn = document.getElementById('closeBtn');

const $fnamelbl = document.getElementById('fnamelbl');
const $lnamelbl = document.getElementById('lnamelbl');
const $emaillbl = document.getElementById('emaillbl');
const $citylbl = document.getElementById('citylbl');
const $provincelbl = document.getElementById('provincelbl');
const $form = document.getElementById('form');

const contactsArray = [
   {
      'first name': 'Golden',
      'last name': 'nadimi',
      'email':'nadi0012@algonquinlive.com',
      'city': 'Ottawa',
      'province':'Ontario'
   },
   {
      'first name': 'Melanie',
      'last name': 'Cortez',
      'email':'Melanie.Cortez@gmail.com',
      'city': 'Red Deer',
      'province':'Alberta'
   },
   {
      'first name': 'Carl' ,
      'last name': 'Fricke',
      'email':'Carl_Fricke@gmail.com',
      'city': 'Fraserwood',
      'province':'Manitoba'
   },

];
//  if there are items in the local storage then get thpse items else,render the original contactsarray

if (getFromLocalStorage('contactsArray')){
   console.log('localStorage contains contactsArray');
   renderContactsfromStorage();

} else {
   renderContacts();
}



function renderContacts(){
   // create an empty array which will later contain the HTML markup
   const contactsDisplayArray = [];

   for (const contact of contactsArray){
      contactsDisplayArray.push(`
         <div class="contact-item">
            <a href="#" class="contact-name"
               data-fname="${contact['first name']}"
               data-lname="${contact['last name']}"
               data-email="${contact['email']}"
               data-city="${contact['city']}"
               data-province="${contact['province']}">
               <h2>${contact['first name']} ${contact['last name']}</h2>
            </a>
         </div>
      `);
   }
   // add the elements inside the gallery array into the divgallery using the innerHTML prop
   $contacts.innerHTML = '<h3 class="title">Contact List</h3>';
   $contacts.innerHTML += contactsDisplayArray.join('');
}



function renderContactsfromStorage(){
   let contactsArrayfromStorage = getFromLocalStorage('contactsArray');
   console.log(contactsArrayfromStorage);

   const contactsDisplayArray = [];

   if (contactsArrayfromStorage){
      for (const contact of contactsArrayfromStorage){
         contactsDisplayArray.push(`
         <div class="contact-item">
            <a href="#" class="contact-name"
               data-fname="${contact['first name']}"
               data-lname="${contact['last name']}"
               data-email="${contact['email']}"
               data-city="${contact['city']}"
               data-province="${contact['province']}">
               <h2>${contact['first name']} ${contact['last name']}</h2>
            </a>
         </div>
         
         
         `);
      }
         // add the elements inside the gallery array into the divgallery using the innerHTML prop
   $contacts.innerHTML = '<h3 class="title" >Contact List</h3>';
   $contacts.innerHTML += contactsDisplayArray.join('');

   }

}
function addContact(){
   // Read from form,take values and add them into the contacts array
   const $fname = document.getElementById('fname');
   const $lname = document.getElementById('lname');
   const $email = document.getElementById('email');
   const $city = document.getElementById('city');
   const $province = document.getElementById('province');

   let newContact = {
      'first name': $fname.value,
      'last name': $lname.value,
      'email': $email.value,
      'city': $city.value,
      'province': $province.value,
   };
   console.log(newContact);
   // add the new contact into the contactsArray display it
   contactsArray.push(newContact);
   console.log(contactsArray);

   addToLocalStorage('contactsArray', contactsArray);
}

function addToLocalStorage(itemName, item){
   // setItem
   localStorage.setItem(itemName,JSON.stringify(item));

   console.log(itemName, 'has been added to localStorage');
   console.log(item);
}
function getFromLocalStorage(itemName){
   // Return
   let localStorageItem = localStorage.getItem(itemName);

   if (localStorageItem){
      console.log('localStorage includes:'+ localStorageItem);
      return JSON.parse(localStorageItem);
   }
}
// ----Event Listener----
$contacts.addEventListener('click', function(e){
   const element = e.target.closest('.contact-name');
   
   if(element){
      $fnamelbl.innerHTML = element.dataset.fname;
      $lnamelbl.innerHTML = element.dataset.lname;
      $emaillbl.innerHTML = element.dataset.email;
      $citylbl.innerHTML = element.dataset.city;
      $provincelbl.innerHTML =element.dataset.province;
   }
   $modal.classList.toggle('show');

});
// add an event listener on the close button of the modal to close

$closeBtn.addEventListener('click', function(){
   console.log('close button clicked');

   $modal.classList.toggle('show');
});
let form = document.getElementById("form");
// add an eventlistener on the form submit
$form.addEventListener('submit', function(e){
   
   e.preventDefault(); // stop page from refreshing

   addContact();
   renderContacts();


   form.reset();
 
});

localStorage.clear();