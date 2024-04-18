import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import {
  getFirestore,
  setDoc,
  doc,
  getDoc,
  addDoc,
  collection,
  collectionData,
  query,
  collectionChanges,
  where,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(public firestore: AngularFirestore) { }

  //path => es el nombre de la collecion, el ingresar el primer documento en automatico se crea la collecion (tener cuidado y crear una solo variable al princio para solo llamarla y evitar error)
  //data es el documento  que se va a guardar en la collecion
  // en cada .ts   donde llamamos a este servicio con estas lineas de codigo
  //import { FirebaseService } from "../services/firebase.service";
  //en el constructor private firebaseService: FirebaseService;
  // nota: el cosntructos firebaseService es el como se llamara y asi lo usaras en todo el documento para llamar cada metodo sera
  // this.firebaService.getcolleccion(path,data)
  //recomendacion usar la estrucutra de registro-login.page.ts de las lineas 85-91 para agregar los  datos
  // para la obtencion de los datos sar la estructura de login.page.ts de la lineas 92 en adelante
  // Asi se implenta para eliminar
  // this.firebaseService.deleteUser(path, userId)
  // .then(() => {
  //   console.log('Usuario eliminado correctamente');
  //   // Realizar cualquier acción adicional después de eliminar el usuario
  // })
  // .catch(error => {
  //   console.error('Error al eliminar usuario:', error);
  //   // Manejar el error adecuadamente
  // });




  setcollecion(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  getcolleccion(paht: string, collectionQuery?: any) {
    const ref = collection(getFirestore(), paht);
    return collectionData(query(ref, collectionQuery));
  }

  getcolleccionByEmail(path: string, email: string) {
    const db = getFirestore();
    const ref = collection(db, path);
    const queryRef = query(ref, where('correoElectronico', '==', email));
    return collectionData(queryRef);
  }

  update(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  getcolleccionByEmailandPassword(path: string, email: string, password: string) {
    const db = getFirestore();
    const ref = collection(db, path);
    const queryRef = query(ref, where('correoElectronico', '==', email), where('contraseña', '==', password));
    return collectionData(queryRef);
  }

  getcolleccionOneObject(path: string, key: string, atributoSearch: string) {
    const db = getFirestore();
    const ref = collection(db, path);
    const queryRef = query(ref, where(atributoSearch, '==', key));
    return collectionData(queryRef);
  }

  deleteUser(path: string, userId: string) {
    return deleteDoc(doc(getFirestore(), path, userId));
  }
  
}




  
  

  

