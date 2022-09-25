import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public forecasts?: WeatherForecast[];

  protected readonly title = 'Wishlist';

  public constructor(http: HttpClient, cdr: ChangeDetectorRef) {
    http.get<WeatherForecast[]>('/weatherforecast').subscribe(
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

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
