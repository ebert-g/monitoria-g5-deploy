import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-busca-por-id',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './busca-por-id.html',
  styleUrl: './busca-por-id.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuscaPorId {
  readonly rotulo = input.required<string>();
  readonly buscar = output<number>();

  protected readonly formulario = new FormGroup({
    id: new FormControl<number | null>(null, [Validators.required, Validators.min(1)])
  });

  protected enviar() {
    const { id } = this.formulario.getRawValue();
    if (this.formulario.invalid || id === null) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.buscar.emit(id);
  }
}
