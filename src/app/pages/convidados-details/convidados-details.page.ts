import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Convidado, ConvidadoService } from '../../services/todo.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-convidados-details',
  templateUrl: './convidados-details.page.html',
  styleUrls: ['./convidados-details.page.scss'],
})
export class ConvidadosDetailsPage implements OnInit {

  convidado: Convidado = {
    name: 'Eric Soares',
    answer: 'Sim',
    text: 'Pode confirmar minha presença...',
    createdAt: new Date().getTime(),
  }

  convidadoId = null;

  constructor(private convidadoService: ConvidadoService, private route: ActivatedRoute,
     private loadingController: LoadingController, private nav: NavController) { }

  ngOnInit() {
    this.convidadoId = this.route.snapshot.params['id'];
    if (this.convidadoId) {
      this.loadConvidado();
    }
  }

  async loadConvidado(){
    const loading = await this.loadingController.create({
      message: 'Loading Convidado..'
    });
    await loading.present();

    this.convidadoService.getConvidado(this.convidadoId).subscribe( res => {
      loading.dismiss();
      this.convidado = res;
    });
  }

  async saveConvidado(){
    const loading = await this.loadingController.create({
      message: 'Saving Convidado..'
    });
    await loading.present();

    if (this.convidadoId) {
      this.convidadoService.updateConvidado(this.convidado, this.convidadoId).then(() => {
        loading.dismiss();
        this.nav.goBack();
      })
    } else {
      this.convidadoService.addConvidado(this.convidado).then(() => {
        loading.dismiss();
        this.nav.goBack();
      })
    }
  }

}
