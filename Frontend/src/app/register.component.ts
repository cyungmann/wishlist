import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isIdentityResult } from './identity-result';
import { IdentityError } from './identity-error';

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
    private readonly cdr: ChangeDetectorRef,
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

  protected errors: IdentityError[] = [];

  protected onSubmit(): void {
    if (this.password.value !== this.verifyPassword.value) {
      this.errors = [{ code: 'PasswordMismatch', description: 'Password inputs must match.' }];
      this.cdr.detectChanges();
      return;
    }

    this.http.post('/api/account/register', this.registerForm.value).subscribe({
      next: () => {

      },
      error: (err: HttpErrorResponse) => {
        if (isIdentityResult(err.error)) {
          this.errors = Array.from(err.error.errors);
          this.cdr.detectChanges();
        }
      }
    });
  }
}
