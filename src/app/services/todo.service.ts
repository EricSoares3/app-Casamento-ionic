import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

export interface Convidado{
  id? : string;
  name: string;
  answer: string;
  text: string;
  createdAt: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConvidadoService {

  private convidadosCollection: AngularFirestoreCollection<Convidado>;

  private convidados: Observable<Convidado[]>;
    
  constructor(db: AngularFirestore) {
    this.convidadosCollection = db.collection<Convidado>('convidados');
   
    this.convidados = this.convidadosCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

getConvidados(){
  return this.convidados;
}

getConvidado(id){
  return this.convidadosCollection.doc<Convidado>(id).valueChanges();
}

updateConvidado(convidado: Convidado, id: string) {
  return this.convidadosCollection.doc(id).update(convidado);
}

addConvidado(convidado: Convidado){
  return this.convidadosCollection.add(convidado);
}

removeConvidado(id) {
  return this.convidadosCollection.doc(id).delete();
}


}
