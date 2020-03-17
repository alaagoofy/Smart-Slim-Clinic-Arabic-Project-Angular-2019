import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-our-services',
  templateUrl: './our-services.component.html',
  styleUrls: ['./our-services.component.css']
})
export class OurServicesComponent implements OnInit, OnDestroy {

  
  Getservices;
  unsubscribe
  loadDataa = true;

  constructor( private services: ServicesService) {
    this.unsubscribe = this.services.getAll().subscribe(service => {
      this.Getservices = service;
      this.loadDataa = false;
    })

  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
