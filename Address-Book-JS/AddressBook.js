const fs = require("fs");
class AddressBook {
  constructor() {
    this.filePath = "addressBooks.json";
    this.addressBooks = this.loadAddressBooks();
  }

  // Load contacts from a file (instead of localStorage)
  loadAddressBooks() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, "utf8");
        return JSON.parse(data);
      }
    } catch (error) {
      console.error("Error loading addressBooks:", error);
    }
    return {};
  }

  // Save address books to a file
  saveAddressBooks() {
    try {
      fs.writeFileSync(
        this.filePath,
        JSON.stringify(this.addressBooks, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.error("Error saving address books:", error);
    }
  }

  // validateContact method to validate the fields (fields must follow the rules)
  validateContact(
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    phone,
    email
  ) {
    // Starts with a capital, min 3 chars
    const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;

    // At least 4 characters
    const addressRegex = /^.{4,}$/;

    // Zip should be 5 or 6 digits
    const zipRegex = /^[0-9]{5,6}$/;

    // Valid Indian mobile number
    const phoneRegex = /^[6-9][0-9]{9}$/;

    // Standard email pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nameRegex.test(firstName))
      throw new Error(
        "First Name must start with a capital letter and have at least 3 characters."
      );
    if (!nameRegex.test(lastName))
      throw new Error(
        "Last Name must start with a capital letter and have at least 3 characters."
      );
    if (!addressRegex.test(address))
      throw new Error("Address must have at least 4 characters.");
    if (!addressRegex.test(city))
      throw new Error("City must have at least 4 characters.");
    if (!addressRegex.test(state))
      throw new Error("State must have at least 4 characters.");
    if (!zipRegex.test(zip)) throw new Error("Invalid Zip Code.");
    if (!phoneRegex.test(phone)) throw new Error("Invalid Phone Number.");
    if (!emailRegex.test(email)) throw new Error("Invalid Email Address.");
  }

  // addContact method to create contact in AddressBook
  addContact(
    bookName,
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    phone,
    email
  ) {
    if (!this.addressBooks[bookName]) {
      console.log(`Address Book '${bookName}' does not exist.`);
       this.addressBooks[bookName] = [];
    }  

      // Check for duplicate using `some`
      const isDuplicate = this.addressBooks[bookName].some(
        (c) => c.firstName === firstName && c.lastName === lastName
      );
      

      if (isDuplicate) {
          console.log(`Duplicate entry! Contact '${contact.name}' already exists in '${bookName}'.`);
          return;
      }

    try {
      // Validation of contact details
      this.validateContact(
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        email
      );

      // Creating a new contact object
      const contact = {
        firstName,
        lastName,
        address,
        city,
        state,
        zip,
        phone,
        email,
      };
      this.addressBooks[bookName].push(contact);

      //Saving the contacts to a file
      this.saveAddressBooks();
      console.log("Contact added successfully.");
    } catch (error) {
      console.error("Error adding contact:", error.message);
    }
  }

  // viewConatacts to see the contacts details
  viewContacts(bookName) {
    if (!this.addressBooks[bookName]) {
      console.log(`Address Book '${bookName}' does'nt exist.`);
      return;
    }
    console.log(`Contacts in '${bookName}':`, this.addressBooks[bookName]);
  }

  // deleteAddressBook to delete the Address Book if exists
  deleteAddressBook(bookName) {
    if (!this.addressBooks[bookName]) {
      console.log(`Address Book '${bookName}' does not exist.`);
      return;
    }
    delete this.addressBooks[bookName];
    this.saveAddressBooks();
    console.log(`Address Book '${bookName}' deleted successfully.`);
  }

  // CreateAddressBook Method to create addressBook using name (if exists provide message already exists)
  createAddressBook(name) {
    if (this.addressBooks[name]) {
      console.log(`Address Book '${name}' already exists.`);
      return;
    }
    this.addressBooks[name] = [];
    this.saveAddressBooks();
    console.log(`New Address Book '${name}' created successfully.`);
  }

  // editContact method to edit the contact details
  editContact(bookName, firstName, lastName, newDetails) {
    if (!this.addressBooks[bookName]) {
      console.log(`Address Book '${bookName}' does not exist.`);
      return;
    }

    let contacts = this.addressBooks[bookName];
    let contactIndex = contacts.findIndex(
      (c) => c.firstName === firstName && c.lastName === lastName
    );

    if (contactIndex === -1) {
      console.log(
        `Contact '${firstName} ${lastName}' not found in '${bookName}'.`
      );
      return;
    }

    // Debugging - Log before update
    console.log("Before update:", contacts[contactIndex]);

    // Update the contact fields
    Object.keys(newDetails).forEach((key) => {
      if (
        contacts[contactIndex][key] !== undefined &&
        newDetails[key] !== undefined
      ) {
        contacts[contactIndex][key] = newDetails[key];
      }
    });

    // Debugging - Log after update
    console.log("After update:", contacts[contactIndex]);

    // Save changes to file
    this.saveAddressBooks();
    console.log(`Contact '${firstName} ${lastName}' updated successfully!`);
  }

  deleteContact(bookName, firstName, lastName) {
    if (!this.addressBooks[bookName]) {
      console.log(`Address Book '${bookName}' does not exist.`);
      return;
    }

    let contacts = this.addressBooks[bookName];
    const initialLength = contacts.length;

    // Filter out the contact to be deleted
    this.addressBooks[bookName] = contacts.filter(
      (c) => !(c.firstName === firstName && c.lastName === lastName)
    );

    if (this.addressBooks[bookName].length === initialLength) {
      console.log(
        `Contact '${firstName} ${lastName}' not found in '${bookName}'.`
      );
    } else {
      this.saveAddressBooks();
      console.log(`Contact '${firstName} ${lastName}' deleted successfully!`);
    }
  } 
  // countContacts method to count the contacts in the address book
  countContacts(bookName) {
    if (!this.addressBooks[bookName]) {
        console.log(`Address Book '${bookName}' does not exist.`);
        return 0;
    }

    // Use reduce function to count the contacts
    const contactCount = this.addressBooks[bookName].reduce((count) => count + 1, 0);
    console.log(`Total contacts in '${bookName}': ${contactCount}`);
    return contactCount;
}
}

// Example Usage to create an address book and add a contact
const addressBookApp = new AddressBook();
addressBookApp.createAddressBook("Ankit-Personal");
addressBookApp.addContact(
  "Ankit-Personal",
  "Ankit",
  "Rajput",
  "121 Sec-A Bhopal",
  "Bhopal",
  "Madhyapradesh",
  "271203",
  "9770543210",
  "ankit.rajput@example.com"
);
addressBookApp.viewContacts("Ankit-Personal");

addressBookApp.createAddressBook("Ankit-Work");
addressBookApp.addContact(
  "Ankit-Work",
  "Abhishek",
  "Jat",
  "121 Sec-B Bhopal",
  "Bhopal-DDX",
  "Bihar",
  "78001",
  "9123456789",
  "abhishek.jat@example.com"
);
addressBookApp.viewContacts("Ankit-Work");

addressBookApp.editContact("Ankit-Personal", "Ankit", "Rajput", {
  phone: "9234567890",
});
 

addressBookApp.deleteContact("Ankit-Personal", "Ankit", "Rajput"); 
addressBookApp.countContacts("Ankit-Work");