import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {PersistanceType, StorageService} from 'src/app/services/storage.service';
@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent {
    
    selected = 0;
    constructor(
      private auth: AuthService,
    ) { }
  
    ngOnInit(): void {
      this.selected = this.auth.getPersistanceType() ?? 0;
    }
    
    setPersistanceType(target: any) {
      const persistanceType: Number = Number((target as HTMLSelectElement).value);
      this.auth.setPersistanceType(persistanceType as PersistanceType);
    }
}
