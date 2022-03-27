import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  userForm: any;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
          ),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (!this.userForm.valid) {
      return;
    } else {
      console.log(this.userForm.getRawValue());
      this.userService.registerUser(this.userForm.getRawValue());
      this.router.navigate(['/sign-in']);
    }
  }
}
