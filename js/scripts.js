//business logic for addressbook
function AddressBook(){
  this.contacts = [];
  this.currentId = 0;
}
AddressBook.prototype.addContact = function(contact){
  contact.id = this.assignId();
  this.contacts.push(contact);
}
AddressBook.prototype.assignId = function(){
  this.currentId += 1;
  return this.currentId;
}
AddressBook.prototype.findContact = function(id){
  for (var i = 0; i<this.contacts.length; i++){
    if(this.contacts[i]){
      if(this.contacts[i].id == id){
        return this.contacts[i];
      }
    }
  };
  return false;
}
AddressBook.prototype.deleteContact = function(id){
  for (var i = 0; i<this.contacts.length; i++){
    if(this.contacts[i]){
      if (this.contacts[i].id == id){
        delete this.contacts[i];
        return true; // has to be returned true because the operation was completed
      }
    }
  };
  return false;
}

//business logic for contacts
function Contact(firstName, lastName, phoneNumber){
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}
Contact.prototype.fullName = function(){
  return this.firstName + " " + this.lastName;
}


var addressBook = new AddressBook();
var contact = new Contact("Ada", "Lovelace", "503-555-0100");
var contact2 = new Contact("Grace", "Hopper", "503-555-0199");
addressBook.addContact(contact);
addressBook.addContact(contact2);

function displayContactDetails(addressBookToDisplay){
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact){
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>"
  })
  contactsList.html(htmlForContactInfo);
};

function attachContactListeners(){
  $("ul#contacts").on("click","li", function(){
    showContact(this.id);
  });
  $("#buttons").on("click",".deleteButton", function(){
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  })
}

function showContact(contactId){
  console.log(contactId)
  var contact = addressBook.findContact(contactId);
  console.log(contact)
  $("#show-contact").show();
  $(".first-name").html(contact.firstName)
  $(".last-name").html(contact.lastName)
  $(".phone-number").html(contact.phoneNumber)
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>")
}

$(document).ready(function(){
  attachContactListeners();
  $("form#new-contact").submit(function(event){
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber)
    addressBook.addContact(newContact);
    // console.log(addressBook.contacts)
    displayContactDetails(addressBook);
  });
});
// var contact1 = {
//   firstName: "Ada",
//   lastName: "Lovelace",
//   delete contact function(){

//   }
// }
// var contact = {
//   firstName: "Ada",
//   lastName: "Lovelace",
//   delete contact function(){
    
//   }
// }