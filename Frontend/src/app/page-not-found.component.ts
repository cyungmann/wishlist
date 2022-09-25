import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<h1>Page Not Found!</h1>'
})
export class PageNotFoundComponent { }
