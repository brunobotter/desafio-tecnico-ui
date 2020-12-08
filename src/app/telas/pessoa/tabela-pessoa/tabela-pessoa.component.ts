import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { DialogService } from 'src/app/shared/service/dialog.service';
import { Pessoa } from 'src/app/shared/model/Pessoa';
import { Filtro, PessoaService } from 'src/app/shared/service/pessoa.service';
import { ModalAdicionarComponent } from '../modal-adicionar/modal-adicionar.component';
import { ModalAtualizarComponent } from '../modal-atualizar/modal-atualizar.component';
import { TabelaPessoaDataSource } from './tabela-pessoa-datasource';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-tabela-pessoa',
  templateUrl: './tabela-pessoa.component.html',
  styleUrls: ['./tabela-pessoa.component.css']
})
export class TabelaPessoaComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Pessoa>;
  ELEMENT_DATA : Pessoa[] = [];
  dataSource = new TabelaPessoaDataSource(this.ELEMENT_DATA);
  filtro = new Filtro();
  dados: any;
  queryField = new FormControl();
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'nome', 'atualizar', 'deletar'];
 

constructor(
  private pessoaService: PessoaService,
  public dialog: MatDialog,
  private confirmDialog: DialogService,
  private snackbar: SnackbarService
  ){}

  ngOnInit() {
    this.pesquisar();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  pesquisar(pagina = 0, limite = 5, nome = ''){
    this.filtro.page = pagina;
    this.filtro.limite = limite;
    this.filtro.nome = nome;
    this.pessoaService.listaTodos(this.filtro) 
    .subscribe(resultado =>{ 
      this.dataSource.data = resultado.cliente;
      this.dados = resultado.total;
    });
  } 

  onPaginateChange(event) {
    const pagina = event.pageIndex;
    const limite = event.pageSize;
    const nome = '';
    this.pesquisar(pagina, limite, nome);
  }

  filtrando(event){
    const pagina = this.paginator.pageIndex;
    const limite = this.paginator.pageSize;
    let nome = event;
    this.pesquisar(pagina, limite, nome);
  }

  deletar(event){
    this.confirmDialog.openConfirmModal("Desaja Excluir?", (answer: boolean) =>{
      if(answer){
    this.pessoaService.deletar(event).subscribe(data =>{
      this.snackbar.barraError("Deletado com sucesso!");
      setTimeout(()=>{
        location.reload();
      },1000) 
    });
    
  }
});
}

  atualizar(event){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "30%";
    dialogConfig.data = {event};
    this.dialog.open(ModalAtualizarComponent, dialogConfig).afterClosed().subscribe(res => {   
    });
  }

  novo(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = false;
    dialogConfig.width = "30%";
    this.dialog.open(ModalAdicionarComponent, dialogConfig).afterClosed().subscribe(res => {    
    });
  }


  onSearch(){
    let value = this.queryField.value;
    if(value && (value = value.trim()) !== ''){   
     this.pesquisar(0, 5, value);
  }else{
    this.pesquisar(0, 5, '');
  }
}
}
