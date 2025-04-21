import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, JsonpInterceptor, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptorInterceptor } from './core/interceptors/auth-interceptor.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BsModalService } from 'ngx-bootstrap/modal';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
               provideRouter(routes),
              importProvidersFrom(HttpClient),  //this is to allow the usage of HttpClient in the project.
              provideHttpClient(withInterceptors([authInterceptorInterceptor])), // this is for the token interceptor.
              BsModalService,
              provideAnimations(),
              provideToastr({
                timeOut: 5000,
                positionClass: 'toast-top-right',
                preventDuplicates: true,
                progressBar: true,
                closeButton: true,
                tapToDismiss: false
              }),
              ]
};


