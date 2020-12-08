import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TabelaPessoaComponent } from './telas/pessoa/tabela-pessoa/tabela-pessoa.component';
import { ModalAdicionarComponent } from './telas/pessoa/modal-adicionar/modal-adicionar.component';
import { ModalAtualizarComponent } from './telas/pessoa/modal-atualizar/modal-atualizar.component';
import { DialogModalComponent } from './shared/dialog-modal/dialog-modal.component';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { AngularMaterialModule } from './shared/module/angular-material.module';


@NgModule({
  declarations: [
    AppComponent,
    TabelaPessoaComponent,
    ModalAdicionarComponent,
    ModalAtualizarComponent,
    DialogModalComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
