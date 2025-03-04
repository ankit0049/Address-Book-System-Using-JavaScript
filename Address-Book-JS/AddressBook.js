const fs = require('fs');
class AddressBook {
    constructor() {
        this.filePath = 'addressBooks.json';
        this.addressBooks = this.loadAddressBooks();
    }

    // Load contacts from a file (instead of localStorage)
    loadAddressBooks() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error("Error loading addressBooks:", error);
        }
        return [];
    }  

    // Save address books to a file
    saveAddressBooks() {
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.addressBooks, null, 2),'utf-8');
        } catch (error) {
            console.error("Error saving address books:", error);
        }
    }

    // validateContact method to validate the fields (fields must follow the rules)
    validateContact(firstName, lastName, address, city, state, zip, phone, email) { 
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

        if (!nameRegex.test(firstName)) throw new Error("First Name must start with a capital letter and have at least 3 characters.");
        if (!nameRegex.test(lastName)) throw new Error("Last Name must start with a capital letter and have at least 3 characters.");
        if (!addressRegex.test(address)) throw new Error("Address must have at least 4 characters.");
        if (!addressRegex.test(city)) throw new Error("City must have at least 4 characters.");
        if (!addressRegex.test(state)) throw new Error("State must have at least 4 characters.");
        if (!zipRegex.test(zip)) throw new Error("Invalid Zip Code.");
        if (!phoneRegex.test(phone)) throw new Error("Invalid Phone Number.");
        if (!emailRegex.test(email)) throw new Error("Invalid Email Address.");
    }

    // addContact method to create contact in AddressBook
    addContact(bookName, firstName, lastName, address, city, state, zip, phone, email) {   

        if (!this.addressBooks[bookName]) {
            console.log(`Address Book '${bookName}' does not exist.`);
            return;
        }
        try{  
         // Validation of contact details   
        this.validateContact(firstName, lastName, address, city, state, zip, phone, email); 

        // Creating a new contact object
        const contact = { firstName, lastName, address, city, state, zip, phone, email };
          this.addressBooks[bookName].push(contact);

        //Saving the contacts to a file
        this.saveAddressBooks();  
        console.log("Contact added successfully.");
        }catch(error){
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
}

// Example Usage to create an address book and add a contact
const addressBookApp = new AddressBook(); 
addressBookApp.createAddressBook("Ankit-Personal"); 
addressBookApp.addContact("Ankit-Personal", "Ankit", "Rajput", "121 Sec-A Bhopal", "Bhopal", "Madhyapradesh", "271203", "9770543210", "ankit.rajput@example.com");
addressBookApp.viewContacts("Ankit-Personal"); 

addressBookApp.createAddressBook("Ankit-Work");
addressBookApp.addContact("Ankit-Work", "Abhishek", "Jat", "121 Sec-B Bhopal", "Bhopal-DDX", "Bihar", "78001", "9123456789", "abhishek.jat@example.com");
addressBookApp.viewContacts("Ankit-Work");