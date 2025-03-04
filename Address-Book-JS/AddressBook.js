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

    addContact(firstName, lastName, address, city, state, zip, phone, email) {
        const contact = { firstName, lastName, address, city, state, zip, phone, email };
        this.contacts.push(contact);
        this.saveContacts();
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