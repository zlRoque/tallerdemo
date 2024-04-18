import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.page.html',
  styleUrls: ['./acercade.page.scss'],
})
export class AcercadePage implements OnInit {

  constructor(private LocalStorageService: LocalStorageService) { }

  ngOnInit() {this.LocalStorageService.hasItem();
  }

}
