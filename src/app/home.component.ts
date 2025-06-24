import { Component, inject, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MsalService } from '@azure/msal-angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  template: `
    <mat-toolbar>
      <span>Bienvenido, {{ user() }}</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/profile">Perfil</a>
      <button mat-button (click)="logout()">Cerrar sesión</button>
    </mat-toolbar>
    <div class="content">
      <p>Has iniciado sesión exitosamente.</p>
    </div>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .content { padding: 24px; }
  `]
})

export default class HomeComponent implements OnInit{
  private msalService = inject(MsalService);
  private router = inject(Router);

  user = signal<string | undefined>('');

  ngOnInit(): void {
    this.user.set(this.msalService.instance.getActiveAccount()?.name);
  }

  logout(): void {
    this.msalService.instance.setActiveAccount(null);
    this.router.navigate(['/']);
  }
}
