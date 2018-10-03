import { Component, OnInit } from '@angular/core';
import { Convidado, ConvidadoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  convidados: Convidado[];

  constructor(private convidadoService: ConvidadoService) { }

    ngOnInit() {
        this.convidadoService.getConvidados().subscribe(res => {
          this.convidados = res;
        })
    }
    remove(item) {
      this.convidadoService.removeConvidado(item.id);
    }
  
  
}
