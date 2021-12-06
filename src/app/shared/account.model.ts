import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
export class Account{
    
    constructor(public username: string, public password: string, public isAdmin: boolean,public fullname:string, public email: string, public phone: string,
        public gender?: string, public dob?: NgbDate, public ageGroup?: string){}
}   