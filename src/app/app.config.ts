import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStorage } from '@ionic/storage-angular';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { Drivers } from '@ionic/storage';

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideRouter(routes, withPreloading(PreloadAllModules)),
        provideHttpClient(),
        ...provideStorage({
            name: '__mydb',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
        }),

    ],
};
