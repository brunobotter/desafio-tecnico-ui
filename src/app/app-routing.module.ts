import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaPessoaComponent } from './telas/pessoa/tabela-pessoa/tabela-pessoa.component';

const routes: Routes = [
  {path: '', component: TabelaPessoaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
