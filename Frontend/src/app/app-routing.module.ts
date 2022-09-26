import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';
import { RegisterComponent } from './register.component';

// Sets up routes constant where you define your routes
const routes: Routes = [
  { component: RegisterComponent, path: 'register', title: 'Register' },
  { component: PageNotFoundComponent, path: '**', title: 'Page Not Found' },
];

// Configures NgModule imports and exports
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
