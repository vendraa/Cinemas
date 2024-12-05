//Abstract Class
class AbstractUser {
    constructor(name, email) {
      if (this.constructor === AbstractUser) {
        throw new Error("AbstractUser is an abstract class and cannot be instantiated directly.");
      }
      this._name = name;
      this._email = email;
    }
  
    //Abstract Method
    getRole() {
      throw new Error("getRole method must be implemented in derived classes.");
    }
  
    //Getters and Setters (Encapsulation)
    get name() {
      return this._name;
    }
  
    set name(value) {
      if (!value.trim()) throw new Error("Name cannot be empty.");
      this._name = value;
    }
  
    get email() {
      return this._email;
    }
  
    set email(value) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error("Invalid email format.");
      }
      this._email = value;
    }
  }
  
  //User Class (Inheritance & Polymorphism)
class User extends AbstractUser {
    constructor(name, email, password, address, phoneNumber) {
      super(name, email);
      this._password = password; 
      this.address = address;
      this.phoneNumber = phoneNumber;
    }
  
    getRole() {
      return "User";
    }
  
    // Getter dan Setter
    get password() {
      return this._password;
    }
  
    set password(value) {
      if (value.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
      }
      this._password = value;
    }
  
    // Inner Class
    static Validator = class {
      static validateName(name) {
        if (!name || name.trim() === "") throw new Error("Name cannot be empty.");
      }
  
      static validateEmail(email) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new Error("Invalid email format.");
        }
      }
  
      static validatePassword(password) {
        if (password.length < 8) {
          throw new Error("Password must be at least 8 characters long.");
        }
      }
  
      static validatePhoneNumber(phoneNumber) {
        if (!/^\d{10,15}$/.test(phoneNumber)) {
          throw new Error("Phone number must be 10-15 digits.");
        }
      }
    };
  }
  
  export { User };
  
  