import { CategoriaService } from './../categoria.service';
import { Categoria } from './../categoria.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.css']
})
export class CategoriaReadComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nome', 'descricao', "livros", 'acoes'];

  categorias: Categoria[] = [];

  constructor(private service: CategoriaService, private route: Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(response =>{
      this.categorias = response;
      console.log(response);
    })
  }

  navegarParaCategoriaCreate(){
    this.route.navigate(['categorias/create']);
  }
 
}
