const fs = require('fs');
class AddressBook {
    constructor() {
        this.filePath = 'contacts.json';
        this.contacts = this.loadContacts();
    }

    // Load contacts from a file (instead of localStorage)
    loadContacts() {
        try {
            if (fs.existsSync(this.filePath)) {
                const data = fs.readFileSync(this.filePath, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error("Error loading contacts:", error);
        }
        return [];
    }

    // Save contacts to a file (instead of localStorage)
    saveContacts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.contacts, null, 2), 'utf8');
    } 

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

    addContact(firstName, lastName, address, city, state, zip, phone, email) { 
        try{  
         // Validation of contact details   
        this.validateContact(firstName, lastName, address, city, state, zip, phone, email); 

        // Creating a new contact object
        const contact = { firstName, lastName, address, city, state, zip, phone, email };
        this.contacts.push(contact); 

        //Saving the contacts to a file
        this.saveContacts();  
        console.log("Contact added successfully.");
        }catch(error){
            console.error("Error adding contact:", error.message);
        }
    }

    getContacts() {
        return this.contacts;
    }

    deleteContact(index) {
        if (index < 0 || index >= this.contacts.length) {
            throw new Error("Invalid index.");
        }
        this.contacts.splice(index, 1);
        this.saveContacts();
    }
}

// Example Usage to create an address book and add a contact
const addressBook = new AddressBook();
addressBook.addContact('Ankit', 'Rajput', '121 Awadhpuri', 'India', 'IN', '2712003', '97706543210', 'ankit@example.com');

console.log("Contacts:", addressBook.getContacts());