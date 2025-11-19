import { bootstrapApplication } from '@angular/platform-browser';


import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { addIcons } from 'ionicons';
import { logOutOutline, trendingUpOutline } from 'ionicons/icons';

addIcons({ logOutOutline, trendingUpOutline });


// enableProdMode();

bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));

