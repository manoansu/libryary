import { Categoria } from './../categoria.model';
import { CategoriaService } from './../categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = {
    id:'',
    nome: '',
    descricao:''
  }

  constructor(private service: CategoriaService, private routeActivare: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.categoria.id = this.routeActivare.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById():void{
    this.service.findById(this.categoria.id!).subscribe((response) =>{
      this.categoria.nome = response.nome;
      this.categoria.descricao = response.descricao;
      console.log(response);

    })
  }

  delete():void{
    this.service.delete(this.categoria.id!).subscribe((response) =>{
    this.cancelar();
    this.service.mensagem("categoria removido com sucesso!");
    },err =>{
      this.service.mensagem(err.error.errorMessage);
    });
  }

  cancelar():void{
    this.route.navigate(['categorias']);
  }

}
