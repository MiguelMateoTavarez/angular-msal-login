import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalInterceptor, MsalService } from '@azure/msal-angular';
import { MSALGuardConfigFactory, MSALInstanceFactory, MSALInterceptorConfigFactory } from './auth-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true},
    {provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory},
    {provide: MSAL_GUARD_CONFIG, useFactory: MSALGuardConfigFactory},
    {provide: MSAL_INTERCEPTOR_CONFIG, useFactory: MSALInterceptorConfigFactory},
    MsalService, MsalGuard, MsalBroadcastService
  ]
};
