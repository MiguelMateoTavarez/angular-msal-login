import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

interface Profile {
  displayName: string;
  jobTitle: string;
  email: string;
  userPrincipalName?: string;
  officeLocation?: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule, MatCardModule],
  template: `
    @if (profile()) {
      <mat-card>
        <mat-card-title>{{ profile().displayName }}</mat-card-title>
        <mat-card-subtitle>{{ profile().jobTitle }}</mat-card-subtitle>
        <p><strong>Correo:</strong>{{ profile().email}}</p>
        <p><strong>Lenguage preferido:</strong>{{ profile().preferredLanguage}}</p>
        @if (profile().officeLocation) {
          <p><strong>Ubicación: </strong>profile().officeLocation</p>
        }
      </mat-card>
    }
  `
})

export default class ProfileComponent implements OnInit {
  http = inject(HttpClient);

  profile = signal<any>([]);

  ngOnInit(): void {
    this.http.get('https://graph.microsoft.com/v1.0/me')
      .subscribe(p => this.profile.set(p))
  }
}
