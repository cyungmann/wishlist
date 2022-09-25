import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, RegisterComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AppModule {}
