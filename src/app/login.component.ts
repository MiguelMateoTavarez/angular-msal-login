import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MsalService } from '@azure/msal-angular';
import { scopes } from './auth-config';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatButtonModule],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <div class="logo-wrapper">
          <img width="240px" src="imgs/logo.jpg" alt="" />
        </div>
        <h2 class="title">Welcome back</h2>
        <p class="subtitle">
          Sign in to your account using your organization's SSO
        </p>

        <div class="button-group">
          <button (click)="login()" [disabled]="isLoading()" mat-stroked-button class="auth-button">
            <div class="button-scope">
              <img width="20px" src="imgs/microsoft.png" alt="" />
              <span>Continue with Microsoft</span>
            </div>
          </button>
        </div>

        <div class="footer-text">
          <p><strong>Secure SSO Authentication</strong></p>
          <p>Your organization manages access through single sign-on.</p>
          <p class="help-text">
            Contact your IT administrator if you need assistance.
          </p>
        </div>
      </mat-card>
    </div>
  `,
  styles: [
    `
      @use '@angular/material' as mat;
      .login-container {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f5f6fa;
        color: #3e3e3e !important;
      }

      .login-card {
        padding: 2rem;
        width: 100%;
        max-width: 400px;
        text-align: center;
        background-color: #fefefe;
      }

      .logo-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
        img {
          border-radius: 20px;
        }
      }

      .icon-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
      }

      .app-icon {
        font-size: 48px;
        color: #3f51b5;
      }

      .title {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
      }

      .subtitle {
        margin: 0.5rem 0 1.5rem;
      }

      .button-group {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1.5rem;
      }

      .auth-button {
        @include mat.fab-overrides(
          (
            container-color: orange,
            container-elevation-shadow: red,
          )
        );
      }

      .button-scope {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }

      .footer-text {
        font-size: 0.875rem;
      }

      .help-text {
        margin-top: 0.5rem;
        color: #0077cc;
      }
    `,
  ],
})
export default class LoginComponent {
  private msalService = inject(MsalService);

  isLoading = signal<boolean>(false);

  login() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    this.msalService
      .loginPopup({ scopes, prompt: 'select_account' })
      .subscribe({
        next: (res) => {
          this.msalService.instance.setActiveAccount(res.account);
          window.location.href = '/home';
        },
        error: (err) => {
          this.isLoading.set(false);
        },
      });
  }
}
