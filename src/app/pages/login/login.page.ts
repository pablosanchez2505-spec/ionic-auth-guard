import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonInput, IonButton, IonText, IonNote, IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logInOutline, lockClosedOutline } from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonInput, IonButton, IonText, IonNote, IonIcon,
  ],
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Estado de la vista (ViewModel)
  public errorMessage = signal<string | null>(null);

  public form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  /** Si ya hay sesión al entrar en /login, se envía directamente a /admin */
  ionViewWillEnter(): void {
    this.errorMessage.set(null);
    if (this.auth.isAuthenticated()) {
      this.router.navigateByUrl('/admin', { replaceUrl: true });
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password } = this.form.getRawValue();

    if (this.auth.login(username, password)) {
      this.form.reset();
      this.router.navigateByUrl(this.getReturnUrl(), { replaceUrl: true });
    } else {
      this.errorMessage.set('Usuario o contraseña incorrectos.');
      this.form.controls.password.reset();
    }
  }

  /** Solo se aceptan rutas internas de la app para evitar redirecciones abiertas */
  private getReturnUrl(): string {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    return returnUrl && returnUrl.startsWith('/') && !returnUrl.startsWith('//')
      ? returnUrl
      : '/admin';
  }

  constructor() {
    addIcons({ logInOutline, lockClosedOutline });
  }
}
