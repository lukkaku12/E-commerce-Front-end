import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Response } from '../../interfaces/login-response.interface';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-vendor',
  standalone: false,
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.css',
})
export class VendorComponent {
  signInForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signInForm.valid) {
      this.userService.loginUser(this.signInForm.value).subscribe({
        next: (res: Response) => {

          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('user', JSON.stringify(res.user));

          if (res.user.role === 'buyer') {
            this.router.navigate(['/dashboard/customer']);
            this.notificationService.notifySuccess('Autenticado correctamente');
          } else if (res.user.role === 'seller') {
            this.router.navigate(['/dashboard/vendor']);
            this.notificationService.notifySuccess('Autenticado correctamente');
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
