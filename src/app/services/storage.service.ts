import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';
import { getStorage, ref, deleteObject} from 'firebase/storage';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storageRef = firebase.app().storage().ref();
 
  constructor() { }

  //proceso asincrono da tiempo a realizar la operacion y después continuar con la linea siguiente.
  async subirImagen(nombre:string,imgBase64:any){

    try {
      let respuesta= await this.storageRef.child("experiencia/" + nombre).putString(imgBase64, 'data_url');
      console.log(respuesta);
      return await respuesta.ref.getDownloadURL();
    }catch(err){
      return null


    }
  }

 

 
}
