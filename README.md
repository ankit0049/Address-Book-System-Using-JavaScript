## Address Book Development Using JavaScript Started ....   

This is a **Node.js** application for managing multiple **Address Books**. Each address book can contain multiple contacts with details like name, address, city, state, zip code, phone number, and email. The application stores data in a **JSON file** and provides functionality to add, edit, delete, search, and validate contacts.


## Use Cases

### **UC 1: Ability to Create a Contact in Address Book**
- Users can create and store contact details such as name, address, city, state, zip code, phone number, and email.

### **UC 2: Ability to Add Multiple Contacts**
- Supports adding multiple contacts, ensuring the address book can store more than one entry.

### **UC 3: Ability to Edit Existing Contact**
- Users can update existing contact details by searching for a person’s name and modifying the required fields.

### **UC 4: Ability to Delete a Contact**
- Allows users to remove a contact from the address book by searching for their name.

### **UC 5: Ability to Count Total Contacts in Address Book**
- Displays the total number of contacts stored in the address book.

### **UC 6: Ability to Search a Contact by City or State**
- Users can find a contact by searching for their city or state.

### **UC 7: Ability to Check for Duplicate Entries**
- Ensures that duplicate contact entries do not exist by checking names before adding a new contact.

### **UC 8: Ability to View Contacts by City or State**
- Displays all contacts filtered by a specific city or state.

### **UC 9: Ability to Count Contacts within a City or State**
- Provides the total count of contacts present in a particular city or state.

### **UC 10: Ability to Sort Contacts Alphabetically by Person’s Name**
- Sorts and displays all entries in the address book alphabetically by the person’s name using collection sorting.

### **UC 11: Ability to Sort Contacts by City, State, or Zip**
- Users can sort contacts based on city, state, or zip code using appropriate sorting methods.

### **UC 12: Ability to Sort Fields Lexicographically**
- Uses JavaScript array functions like filter, map, and reduce to sort contacts lexicographically by different fields.


### Features  

- **Create an Address Book**: Users can create multiple address books.  
- **Add Contacts**: Adds a contact to a specified address book after validating the input.  
- **View Contacts**: Displays all contacts in a given address book.  
- **Edit Contacts**: Updates contact details based on the first and last name.  
- **Delete Contacts**: Removes a contact from an address book.  
- **Count Contacts**: Counts the total contacts in an address book.  
- **Search by City or State**: Finds contacts based on city or state using array functions.  
- **Data Persistence**: Stores and retrieves contacts from a JSON file.  
- **Validation**: Ensures valid input data using **RegEx** for name, address, zip code, phone number, and email.  
- **Duplicate Prevention**: Prevents adding duplicate contacts in the same address book.  

## Installation  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-username/address-book.git
   cd address-book