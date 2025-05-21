import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Response } from '../../interfaces/login-response.interface';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css',
})
export class CustomerComponent {
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.userService.loginUser(this.signInForm.value).subscribe({
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

  goToSignUp() {
    this.router.navigate(['/user/signup-client']);
  }
}
