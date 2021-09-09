import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from './../categoria.service';
import { Categoria } from './../categoria.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria ={
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(private service: CategoriaService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.categoria.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById():void{
    this.service.findById(this.categoria.id!).subscribe((response) =>{
      this.categoria.nome = response.nome;
      this.categoria.descricao = response.descricao;
    });
  }

  update():void{
    this.service.update(this.categoria).subscribe((response) =>{
      this.cancelar();
      this.service.mensagem("Categoria atualizado com sucesso");
    }, err =>{
         this.service.mensagem("Os campos são obrigatorio!");
    })
  }

  cancelar():void{
    this.route.navigate(['categorias']);
  }

}
