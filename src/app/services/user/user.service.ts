import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = [
    {
      fullName: 'shubam',
      email: 'shubham@email.com',
      password: '12345678',
    },
    {
      fullName: 'mohit',
      email: 'mohit@email.com',
      password: '12345678',
    },
  ];

  constructor() {}

  registerUser(user: any) {
    localStorage.setItem('name', user.fullName);
    this.users.push(user);
  }

  loginUser(user: any) {
    for (let User of this.users) {
      if (
        (User.email == user.email && User.password == user.password) ||
        (localStorage.getItem('token') == user.email &&
          this.decryptData(localStorage.getItem('pass')) == user.password)
      ) {
        if (User.email == user.email) {
          localStorage.setItem('name', User.fullName);
        }
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', user.email);
        localStorage.setItem('pass', this.encryptData(user.password));
        return true;
      }
    }
    return false;
  }

  encryptData(data: string) {
    return CryptoJS.AES.encrypt(data, 'sec').toString();
  }

  decryptData(data: any): any {
    try {
      return CryptoJS.AES.decrypt(data, 'sec').toString(CryptoJS.enc.Utf8);
    } catch (e) {
      console.log(e);
    }
  }
  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
  }
}
