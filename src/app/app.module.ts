import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MatButtonModule, MatCardModule, MatListModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatInputModule, MatGridListModule, MatSnackBarModule } from '@angular/material';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ImageComponent } from './components/image/image.component';
import { DogsService } from './services/dogs.service';
import { ListComponent } from './components/list/list.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { NotificationsService } from './services/notifications.service';

@NgModule({
  declarations: [
    AppComponent,
    ImageComponent,
    ListComponent,
    SidenavComponent
  ],
  imports: [
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatInputModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  providers: [
    DogsService, 
    NotificationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
