import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logOutOutline, shieldCheckmarkOutline } from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel,
  ],
})
export class AdminPage {
  private auth = inject(AuthService);
  private router = inject(Router);

  // La vista lee el estado directamente del Signal del servicio
  public user = this.auth.currentUser;

  public logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  constructor() {
    addIcons({ logOutOutline, shieldCheckmarkOutline });
  }
}
