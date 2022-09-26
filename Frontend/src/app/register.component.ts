import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  protected readonly registerForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    verifyPassword: ['', Validators.required],
  });

  public constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient,
  ) {}

  protected get email(): FormControl<string> {
    return this.registerForm.get('email') as FormControl<string>;
  }

  protected get password(): FormControl<string> {
    return this.registerForm.get('password') as FormControl<string>;
  }

  protected get verifyPassword(): FormControl<string> {
    return this.registerForm.get('verifyPassword') as FormControl<string>;
  }

  protected onSubmit(): void {
    this.http.post('/api/account', this.registerForm.value).subscribe();
  }
}
