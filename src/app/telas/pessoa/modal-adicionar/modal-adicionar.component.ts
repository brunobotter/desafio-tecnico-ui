import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialogRef } from '@angular/material/dialog';
import { PessoaService } from 'src/app/shared/service/pessoa.service';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-modal-adicionar',
  templateUrl: './modal-adicionar.component.html',
  styleUrls: ['./modal-adicionar.component.css']
})
export class ModalAdicionarComponent implements OnInit {

  pessoaFormulario: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalAdicionarComponent>,
    private snackbar: SnackbarService
    ) { }

  ngOnInit(): void {
    this.iniciaFormulario();
  }

  iniciaFormulario(){
    this.pessoaFormulario = this.fb.group({
      nome: [null, Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])],
    });
  }

  salvar(){
    this.pessoaService.adicionar(this.pessoaFormulario.value).subscribe(data =>{
      this.snackbar.barraSucesso("Salvo com sucesso!");
      setTimeout(()=>{
        this.fecharModal();
      },1000)
    }); 
  }

  fecharModal(){
    this.dialogRef.close();
    location.reload();
  }

  
  hasErrors(campo: string) {
    return this.pessoaFormulario.get(campo).errors;
  }


}
