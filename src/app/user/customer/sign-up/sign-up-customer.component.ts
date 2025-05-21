import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Response } from '../../interfaces/login-response.interface';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-sign-up-customer',
  standalone: false,
  templateUrl: './sign-up-customer.component.html',
  styleUrl: './sign-up-customer.component.css',
})
export class SignUpCustomerComponent {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['buyer'],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.userService.createUser(this.signUpForm.value).subscribe({
        next: (res: Response) => {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('user', JSON.stringify(res.user));

          if (res.user.role === 'buyer') {
            this.router.navigate(['/dashboard/customer']);
          } else if (res.user.role === 'vendor') {
            this.router.navigate(['/dashboard/vendor']);
          }
        },
        error: (err) => {
          if (err.status === 403) {
            this.notificationService.notifyError('Contraseña incorrecta');
          } else if (err.status === 404) {
            this.notificationService.notifyError('Usuario no encontrado');
          } else if (err.status === 400) {
            this.notificationService.notifyError(
              'Faltan datos para iniciar sesión'
            );
          } else {
            this.notificationService.notifyError('Error inesperado');
          }
        },
      });
    }
  }
}
