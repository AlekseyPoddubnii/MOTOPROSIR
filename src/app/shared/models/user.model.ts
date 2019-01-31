import { Url } from 'url';

export class User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    brandOgBike: string;
    modelOfBike: string;
    gender: string;
    country: string;
    sity: string;
    password: string;
    avatar?: Url;
    token?: string;

    constructor(
        username: string,
        email: string,
        firstName: string,
        lastName: string,
        brandOgBike: string,
        modelOfBike: string,
        gender: string,
        country: string,
        sity: string,
        password: string,
        avatar?: Url,
        token?: string,
        ) {
            this.username = username;
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.brandOgBike = brandOgBike;
            this.modelOfBike = modelOfBike;
            this.gender = gender;
            this.country = country;
            this.sity = sity;
            this.password = password;
            this.avatar = avatar;
            this.token = token;
        }
}
