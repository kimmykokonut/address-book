// Business Logic for AddressBook ----
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}
AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};
AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};
AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};
AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};
//Business Logic for Contacts ------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}
// let testContact = new Contact("Ada", "Lovelace", "808-555-1111");
Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};
// Contact.prototype.update = function() {
//   return this.contact.update();
// } PAUSE ON THIS FUNCTION> CONFUSED>

// let addressBook = new AddressBook();
// let contact = new Contact("Ada", "Lovelace", "503-555-0100");
// let contact2 = new Contact("Grace", "Hopper", "503-555-0199");
// addressBook.addContact(contact);
// addressBook.addContact(contact2);
// addressBook.findContact(2);
// > Object.keys(addressBook.contacts)[0];
// "1"
// > typeof Object.keys(addressBook.contacts)[0];
// "string"

//User Interface Logic
//global variable-exception to mimic database
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText = null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}
function handleDelete(event) {
  addressBook.deleteContact(event.target.id); //deletes contact obj.
  document.querySelector("button.delete").removeAttribute("id"); //resets button by removing id# optional code.
  document.querySelector("div#contact-details").setAttribute("class", "hidden"); //hiding contactdetails div again
  listContacts(addressBook); //call listContact f() to refresh list contacts
}

function displayContactDetails(event) {
  // console.log("The id of this <li> is " + event.target.id + ".");
  const contact = addressBook.findContact(event.target.id);
  document.querySelector("#first-name").innerText = contact.firstName;
  document.querySelector("#last-name").innerText = contact.lastName;
  document.querySelector("#phone-number").innerText = contact.phoneNumber;
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
  addressBook.addContact(newContact);
  // console.log(addressBook.contacts);
  listContacts(addressBook); //ea time add new contact, page will update and contacts info updated to page
}

window.addEventListener("load", function() {
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  this.document.querySelector("button.delete").addEventListener("click", handleDelete);
}); 