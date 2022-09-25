import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, Validators } from "@angular/forms";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(
    private readonly fb: FormBuilder,
    private readonly http: HttpClient
  ) { }

  protected readonly registerForm = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
    verifyPassword: ['', Validators.required]
  });

  get email(): FormControl<string> {
    return this.registerForm.get('email') as FormControl<string>;
  }

  get password(): FormControl<string> {
    return this.registerForm.get('password') as FormControl<string>;
  }

  get verifyPassword(): FormControl<string> {
    return this.registerForm.get('verifyPassword') as FormControl<string>;
  }

  protected onSubmit(): void {
    this.http.post('/api/account', this.registerForm.value).subscribe();
  }
}
