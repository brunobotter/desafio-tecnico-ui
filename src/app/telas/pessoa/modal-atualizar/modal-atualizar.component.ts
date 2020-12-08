import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pessoa } from 'src/app/shared/model/Pessoa';
import { PessoaService } from 'src/app/shared/service/pessoa.service';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';


@Component({
  selector: 'app-modal-atualizar',
  templateUrl: './modal-atualizar.component.html',
  styleUrls: ['./modal-atualizar.component.css']
})
export class ModalAtualizarComponent implements OnInit {
pessoaFormulario: FormGroup;
pessoaBD: Pessoa;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private pessoaService: PessoaService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalAtualizarComponent>,
    private snackbar: SnackbarService
    ) { }


  ngOnInit(): void {
    this.iniciaFormulario();
    this.popularFormulario();
  }

  iniciaFormulario(){
    this.pessoaFormulario = this.fb.group({
    id: [null],
    nome: [null]
  });
  }

  popularFormulario(){
    this.pessoaService.buscarPorId(this.data.event).subscribe(data =>{
      this.pessoaBD = data;
      this.pessoaFormulario = this.fb.group({
        id: {value: this.pessoaBD.id, disabled: true},
        nome: [this.pessoaBD.nome, Validators.compose([ Validators.required, Validators.minLength(2), Validators.maxLength(100)])]
      });
    })
  }

  atualizar(){
    this.pessoaService.atualizar(this.data.event, this.pessoaFormulario.value).subscribe(data =>{
      this.snackbar.barraSucesso("Atualizado com sucesso!");
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
