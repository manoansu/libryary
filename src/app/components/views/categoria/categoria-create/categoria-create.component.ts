import { Router } from '@angular/router';
import { CategoriaService } from './../categoria.service';
import { Categoria } from './../categoria.model';
import { Component, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-categoria-create',
  templateUrl: './categoria-create.component.html',
  styleUrls: ['./categoria-create.component.css']
})
export class CategoriaCreateComponent implements OnInit {

  categoria: Categoria = {
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private route: Router) { }

  ngOnInit(): void {
  }

  create(): void{
    this.service.create(this.categoria).subscribe((response) =>{
      this.route.navigate(['categorias'])
      this.service.mensagem('Categoria criada com sucesso!')
    }, erro => {
      for(let i = 0; i < erro.error.errors.length; i++){
        this.service.mensagem(erro.error.errors[i].message);
      }
    })
  }

  cancelar(): void{
    this.route.navigate(['categorias'])
  }

}
