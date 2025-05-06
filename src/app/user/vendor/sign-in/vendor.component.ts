import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-vendor',
  standalone: false,
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css'
})
export class VendorComponent {
  signInForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.userService.createUser(this.signInForm.value).subscribe({
        next: (res) => console.log('Usuario creado:', res),
        error: (err) => console.error('Error al crear usuario:', err)
      });
    }
  }
}
