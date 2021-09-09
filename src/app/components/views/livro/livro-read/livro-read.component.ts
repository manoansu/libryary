import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { Livro } from './../livro-read-all/livro.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {

   
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

  update():void{
    this.service.update(this.livro).subscribe((response) =>{
      this.route.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro atualizado com sucesso!');
    }, err =>{
      this.route.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Erro ao atualizar livro! Tente mais tarde..');
    });
  }
  
  cancelar():void{
    this.route.navigate([`categorias/${this.id_cat}/livros`]);
    
  }

}
