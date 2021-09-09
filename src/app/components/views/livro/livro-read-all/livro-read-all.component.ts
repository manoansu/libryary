import { Livro } from './livro.model';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroService } from './../livro.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', "livros", 'acoes'];

  id_cat: String = ''

  livros: Livro[] =[]

  constructor(private service: LivroService, private activatedRoute: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.id_cat = this.activatedRoute.snapshot.paramMap.get('id_cat')!;
    this.findAll();
  }

  findAll():void{
    this.service.findAll(this.id_cat).subscribe((response) =>{
      this.livros = response;
      console.log(this.livros);
    })
  }

  navegarParaCriarLivro():void{
    this.route.navigate([`categorias/${this.id_cat}/livros/create`]);

  }

}
