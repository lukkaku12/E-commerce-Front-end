import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-sign-up-customer',
  standalone: false,
  templateUrl: './sign-up-customer.component.html',
  styleUrl: './sign-up-customer.component.css'
})
export class SignUpCustomerComponent {
  signUpForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['buyer']
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.userService.createUser(this.signUpForm.value).subscribe({
        next: (res) => console.log('Usuario creado:', res),
        error: (err) => console.error('Error al crear usuario:', err)
      });
    }
  }

}
