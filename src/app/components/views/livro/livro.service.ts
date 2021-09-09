import { MatSnackBar } from '@angular/material/snack-bar';
import { Livro } from './livro-read-all/livro.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  baseUrl: String = environment.baseUrl;

  constructor(private http: HttpClient, private snakbar: MatSnackBar) { }

  findAll(id_cat:String):Observable<Livro[]>{
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.get<Livro[]>(url);
  }

  findById(id: String):Observable<Livro>{
    const url = `${this.baseUrl}/livros/${id}`;
    return this.http.get<Livro>(url);
  }

  create(livro:Livro,id_cat:String):Observable<Livro>{
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`;
    return this.http.post<Livro>(url,livro);

  }

  update(livro:Livro):Observable<Livro>{
    const url = `${this.baseUrl}/livros/${livro.id}`;
    return this.http.put<Livro>(url,livro);
  }

  delete(id:String):Observable<Livro>{
    const url = `${this.baseUrl}/livros/${id}`;
    return this.http.delete<Livro>(url);
  }

  mensagem(str:String):void{
    this.snakbar.open(`${str}`,'ok', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
