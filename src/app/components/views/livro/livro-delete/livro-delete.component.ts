import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { Livro } from './../livro-read-all/livro.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

 
  id_cat: String = ""

  livro: Livro = {
    id:"",
    autor: "",
    titulo: "",
    texto:""
  };


  constructor(private service: LivroService, private ativatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.id_cat = this.ativatedRoute.snapshot.paramMap.get('id_cat')!;
    this.livro.id = this.ativatedRoute.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById():void{
    this.service.findById(this.livro.id!).subscribe((response) =>{
      this.livro = response;
    })
  }

  delete():void{
    this.service.delete(this.livro.id!).subscribe(() =>{
      this.route.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro removido com sucesso!');
    }, err =>{
      this.route.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Erro ao deletar livro! Tente mais tarde..');
    });
  }

  cancelar():void{
    this.route.navigate([`categorias/${this.id_cat}/livros`]);
  }
}
