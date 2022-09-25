import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent),
      app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it(`should have as title 'Wishlist'`, () => {
    const fixture = TestBed.createComponent(AppComponent),
      app = fixture.componentInstance;

    expect(app.title).toEqual('Wishlist');
  });
});
