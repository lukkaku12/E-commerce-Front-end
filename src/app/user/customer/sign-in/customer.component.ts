import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Response } from '../../interfaces/login-response.interface';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.userService.loginUser(this.signInForm.value).subscribe({
              next: (res: Response) => {
                console.log('Usuario creado:', res);
                
                
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('user', JSON.stringify(res.user));
        
                
                if (res.user.role === 'buyer') {
                  this.router.navigate(['/dashboard/customer']);
                } else if (res.user.role === 'vendor') {
                  this.router.navigate(['/dashboard/vendor']);
                }
              },
              error: (err) => console.error('Error al crear usuario:', err)
            });
    }
  }
  

  goToSignUp() {
    this.router.navigate(['/user/signup-client']);
  }
}
