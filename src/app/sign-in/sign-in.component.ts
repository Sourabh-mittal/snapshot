import { UserService } from '../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  userForm: any;
  submitted: boolean = false;
  invalid: boolean = false;
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
    console.log(this.users);
  }

  onSubmit(): void {
    this.submitted = true;
    if (!this.userForm.valid) {
      this.invalid = true;
      return;
    } else {
      if (this.userService.loginUser(this.userForm.getRawValue())) {
        this.invalid = false;
        this.router.navigate(['/home']);
      } else {
        console.log('invalid credentials');
        this.invalid = true;
      }
    }
  }
}
