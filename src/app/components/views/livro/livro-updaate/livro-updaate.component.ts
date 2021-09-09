import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { Livro } from './../livro-read-all/livro.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-livro-updaate',
  templateUrl: './livro-updaate.component.html',
  styleUrls: ['./livro-updaate.component.css']
})
export class LivroUpdaateComponent implements OnInit {

  
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
