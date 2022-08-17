import { Component } from '@angular/core';
import {TodoModel} from "../models/todo.model";
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public mode: string = 'list';

  public todos: TodoModel[] = [];
  public title: String = 'Lista de Tarefas'
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.LoadLocalStorage();
  }

  alteraTexto() {
    this.title = "teste"
  }

  Concluir(todo: TodoModel) {
    const index = this.todos.indexOf(todo);

    if(index !== -1) {
      this.todos[index].done = true
    }

    this.SaveLocalStorage()
  }

  Refazer(todo: TodoModel) {
    const index = this.todos.indexOf(todo)

    if(index !== -1) {
      this.todos[index].done = false
    }

    this.SaveLocalStorage()
  }

  Remover(todo: TodoModel) {
    const index = this.todos.indexOf(todo)

    if (index !== -1) {
      this.todos.splice(index, 1)
    }

    this.SaveLocalStorage()
  }

  Add() {
    const title = this.form.controls['title'].value;

    const id  = this.todos.length + 1

    this.todos.push(new TodoModel(title, false, id))
    this.SaveLocalStorage()
    this.changeMode('list')
    this.Clear();
  }

  Clear() {
    this.form.reset()
  }

  SaveLocalStorage() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('todos', data);
  }

  LoadLocalStorage() {
    const data = localStorage.getItem('todos');
    if(data) this.todos = JSON.parse(data);
  }

  changeMode(state: string) {
    this.mode = state
  }
}
