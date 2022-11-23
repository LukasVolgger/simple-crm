export class User {
    firstName: string;
    lastName: string;
    dateOfBirth: number; // Unix timestamp
    phoneNumber: string;
    email: string;
    website: string;
    street: string;
    zipCode: string;
    city: string;
    country: string;

    constructor(obj?: any) { // Makes creating an object with a parameter optional
        // When an instance is created with an object, assign its values to it. Otherwise : '';
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.dateOfBirth = obj ? obj.dateOfBirth : '';
        this.phoneNumber = obj ? obj.phoneNumber : '';
        this.email = obj ? obj.email : '';
        this.website = obj ? obj.website : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.country = obj ? obj.country : '';
    }

}