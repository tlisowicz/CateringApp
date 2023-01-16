import { Injectable } from '@angular/core';

export enum PersistanceType{
  LocalStorage,
  SessionStorage,
  None
}

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private persistanceType: PersistanceType = 4;
  private peristanceNoneUserState: any = null;

  constructor() {
    const persistanceType = localStorage.getItem('persistanceType');

    if(persistanceType != null)
    {
      this.persistanceType = Number(persistanceType);
    }
    else {
      localStorage.setItem('persistanceType', PersistanceType.LocalStorage.toString());
      this.persistanceType = PersistanceType.LocalStorage;
    }
  }
  setPersistanceType(type: PersistanceType) {
    const creds = this.get('userCredentials');
    this.persistanceType = type;
    localStorage.setItem('persistanceType', type.toString());
    this.set('userCredentials', creds);
  }

  set(key: string, value: string) {
    switch(this.persistanceType)
    {
        case PersistanceType.LocalStorage:
          localStorage.setItem(key, value);
          sessionStorage.removeItem(key);
          break;
          
          case PersistanceType.SessionStorage:
          sessionStorage.setItem(key, value);
          localStorage.removeItem(key);
          break;
          
          case PersistanceType.None:
            this.peristanceNoneUserState = value;
            localStorage.removeItem(key);
            sessionStorage.removeItem(key);
            break;
          }
          
        }

  get(key: string): any | null {
    switch(this.persistanceType)
      {
        case PersistanceType.LocalStorage:
          return localStorage.getItem(key);

        case PersistanceType.SessionStorage:
          return sessionStorage.getItem(key);

        case PersistanceType.None:
          return this.peristanceNoneUserState;
      }
  }

  remove(key: string) {
    switch(this.persistanceType)
      {
        case PersistanceType.LocalStorage:
          localStorage.removeItem(key);
          break;

        case PersistanceType.SessionStorage:
          sessionStorage.removeItem(key);
          break;

        case PersistanceType.None:
          this.peristanceNoneUserState = null;
          break;
      }
  }

}