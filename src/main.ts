import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { JwtInterceptor } from './app/interceptor/interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([JwtInterceptor]))],
}).catch((err) => console.error(err));
