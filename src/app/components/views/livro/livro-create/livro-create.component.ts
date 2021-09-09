import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { Livro } from './../livro-read-all/livro.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = ""

  livro: Livro = {
    id:"",
    autor: "",
    titulo: "",
    texto:""
  };

  titulo = new FormControl("", [Validators.minLength(3)]);
  autor = new FormControl("", [Validators.minLength(3)]);
  texto = new FormControl("", [Validators.minLength(10)]);

  constructor(private service: LivroService, private ativatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.id_cat = this.ativatedRoute.snapshot.paramMap.get('id_cat')!;
  }

  create():void{
    this.service.create(this.livro,this.id_cat).subscribe(response =>{
      this.route.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Livro criado com sucesso!");
    }, err =>{
      this.route.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem("Erro ao tentar criar Livro! Tenta mais tarde!");
    });
  }

getMessage(){
  if(this.titulo.invalid){
    return "O campo TITULO deve conter entre 3 e 100 caracteres";
  }

  if(this.autor.invalid){
    return "O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres";
  }
  
  if(this.texto.invalid){
    return "O campo TEXTO deve conter entre 10 e 2.000.000 caracteres";
  }
  return false;
}

cancelar():void{
  this.route.navigate([`categorias/${this.id_cat}/livros`]);
  
}

}
