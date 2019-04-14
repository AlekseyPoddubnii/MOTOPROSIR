import { Url } from 'url';

export class User {
    id: number;
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    country: string;
    сity: string;

    constructor(
        email: string,
        password: string,
        username: string,
        firstName: string,
        lastName: string,
        gender: string,
        country: string,
        сity: string,
        ) {
            this.email = email;
            this.password = password;
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.gender = gender;
            this.country = country;
            this.сity = сity;
        }
}
