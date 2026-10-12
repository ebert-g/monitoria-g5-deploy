import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { map } from 'rxjs';
import { AuthService, ROTULO_PERFIL } from '../../pessoas-acesso/services/auth.service';
import { itensDoPerfil } from '../menu';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly movel = toSignal(
    inject(BreakpointObserver)
      .observe('(max-width: 767.98px)')
      .pipe(map(estado => estado.matches)),
    { initialValue: false }
  );

  protected readonly recolhido = signal(false);
  protected readonly menuMovelAberto = signal(false);

  protected readonly rail = computed(() => this.recolhido() && !this.movel());
  protected readonly menuAberto = computed(() => !this.movel() || this.menuMovelAberto());
  protected readonly itens = computed(() => itensDoPerfil(this.auth.perfil()));
  protected readonly email = this.auth.email;
  protected readonly iniciais = computed(() => (this.auth.email() ?? '').slice(0, 2).toUpperCase());
  protected readonly rotuloPerfil = computed(() => {
    const perfil = this.auth.perfil();
    return perfil ? ROTULO_PERFIL[perfil] : '';
  });

  protected alternarMenu() {
    if (this.movel()) {
      this.menuMovelAberto.update(aberto => !aberto);
    } else {
      this.recolhido.update(recolhido => !recolhido);
    }
  }

  protected fecharMenuMovel() {
    this.menuMovelAberto.set(false);
  }

  protected sair() {
    this.auth.sair();
    this.router.navigate(['/login']);
  }
}
