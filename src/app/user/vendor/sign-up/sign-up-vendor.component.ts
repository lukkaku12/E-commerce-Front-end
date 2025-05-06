import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-sign-up-vendor',
  standalone: false,
  templateUrl: './sign-up-vendor.component.html',
  styleUrl: './sign-up-vendor.component.css'
})
export class SignUpVendorComponent {
  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['seller']
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
