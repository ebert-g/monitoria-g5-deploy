import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, ROTULO_PERFIL } from '../../pessoas-acesso/services/auth.service';
import { itensDoPerfil } from '../menu';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard {
  private readonly auth = inject(AuthService);

  protected readonly rotuloPerfil = computed(() => {
    const perfil = this.auth.perfil();
    return perfil ? ROTULO_PERFIL[perfil] : '';
  });

  protected readonly atalhos = computed(() =>
    itensDoPerfil(this.auth.perfil()).filter(item => item.rota !== '/')
  );
}
