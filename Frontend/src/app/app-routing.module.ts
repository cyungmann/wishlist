import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { PageNotFoundComponent } from './page-not-found.component';
import { RegisterComponent } from './register.component';

// sets up routes constant where you define your routes
const routes: Routes = [
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: '**', component: PageNotFoundComponent, title: 'Page Not Found' },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
