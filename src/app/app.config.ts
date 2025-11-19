import { ApplicationConfig, InjectionToken } from '@angular/core';
import { PreloadAllModules, provideRouter, RouteReuseStrategy, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { Drivers } from '@ionic/storage';

export const STORAGE = new InjectionToken<Storage>('Storage');

export const appConfig: ApplicationConfig = {
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        provideIonicAngular(),
        provideRouter(routes, withPreloading(PreloadAllModules)),
        provideHttpClient(),
        {
            provide: STORAGE,
            useFactory: () => {
                const storage = new Storage({
                    name: '__mydb',
                    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
                });
                storage.create(); // Initialize the storage
                return storage;
            },
        },
    ],
};
