import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public forecasts?: WeatherForecast[];

  public readonly title = 'Wishlist';

  protected readonly links = [{ fragment: 'register', title: 'Register' }];

  public constructor(
    http: HttpClient,
    cdr: ChangeDetectorRef,
    protected readonly route: ActivatedRoute,
  ) {
    http.get<WeatherForecast[]>('/api/weatherforecast').subscribe(
      result => {
        this.forecasts = result;
        cdr.detectChanges();
      },
      error => {
        console.error(error);
      },
    );
  }

  protected getForecastDate(_index: number, forecast: WeatherForecast): string {
    return forecast.date;
  }
}
