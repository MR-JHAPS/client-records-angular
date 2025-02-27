import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, JsonpInterceptor, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './core/interceptors/auth-interceptor.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
               provideRouter(routes),
              importProvidersFrom(HttpClient),  //this is to allow the usage of HttpClient in the project.
              provideHttpClient(withInterceptors([authInterceptorInterceptor])) // this is for the token interceptor.
              ]
};
