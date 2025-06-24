import { BrowserCacheLocation, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';

export const scopes = ['user.read'];

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: '<Client ID>',
    authority: 'https://login.microsoftonline.com/<Tenant ID>',
    redirectUri: window.location.origin
  },
  cache: { cacheLocation: BrowserCacheLocation.LocalStorage }
});

export function MSALInstanceFactory() {
  return msalInstance;
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Popup,
    authRequest: { scopes }
  };
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Popup,
    protectedResourceMap: new Map([
      ['https://graph.microsoft.com/v1.0/me', ['user.read']]
    ])
  };
}
