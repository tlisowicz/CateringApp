import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {

  constructor() { }

  loadPreview(event: any): any[] {

    const readers: any = [];

    function readFile(file: any) {
      return new Promise((resolve, reject) => {
        if (!event.target.files || event.target.files.length === 0) {
          return null;
        }
  
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader);
      });
    }
  
    for(let file of event.target.files){
      readers.push(readFile(file));
    }
    
    return readers;
  }

}
