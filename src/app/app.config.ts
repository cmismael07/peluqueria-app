import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig = {
  providers: [
    // Proporciona el cliente HTTP sin argumentos
    provideHttpClient(),
    // Registra el interceptor de forma independiente
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    provideAnimations(), 
    // Proporciona el router
    provideRouter(routes),
    // Agrega otros providers globales si es necesario
  ]
};
