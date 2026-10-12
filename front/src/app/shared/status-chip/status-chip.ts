import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-status-chip',
  imports: [MatIconModule],
  template: `
    <span class="status" [class.status--inativo]="!ativo()">
      <mat-icon>{{ ativo() ? 'check_circle' : 'cancel' }}</mat-icon>
      {{ ativo() ? 'Ativo' : 'Inativo' }}
    </span>
  `,
  styles: `
    .status {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 24px;
      padding: 0 12px 0 8px;
      border-radius: 24px;
      background: var(--app-success-container);
      color: var(--app-success);
      font-size: 12px;
      line-height: 16px;
      font-weight: 500;
    }

    .status--inativo {
      background: var(--mat-sys-error-container);
      color: var(--mat-sys-on-error-container);
    }

    mat-icon {
      width: 16px;
      height: 16px;
      font-size: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusChip {
  readonly ativo = input.required<boolean>();
}
