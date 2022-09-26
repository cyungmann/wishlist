import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-page-not-found',
  template: '<h1>Page Not Found!</h1>',
})
export class PageNotFoundComponent {}
