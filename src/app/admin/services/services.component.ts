import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit,OnDestroy {

 
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }



  
  displayedColumns: string[] = ['Title', 'ImageURL', 'id', 'Delete'];
  services;
  dataSource;
  unsubscribe;

deleteMsg= false;
  loadData = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private getservices: ServicesService,private modalService: BsModalService) {
    this.unsubscribe = this.getservices.getAll().subscribe(service => {
      this.services = service;
      this.dataSource = new MatTableDataSource(service);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadData = false;
    })
  }
  ngOnInit() {
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  decline(){this.modalRef.hide();}
  deleteService(id) {
   
    this.deleteMsg= true;
      this.getservices.Delete(id);
      this.modalRef.hide();
     
 
 
    setTimeout(() => {
      this.deleteMsg= true
    }, 2000);
    
        //Scroll to top
  let scrollToTop = window.setInterval(() => {
    let pos = window.pageYOffset;
    if (pos > 0) {
      window.scrollTo(0, pos - 20); // how far to scroll on each step
    } else {
      window.clearInterval(scrollToTop);
    }
  }, 16);
  //-------------------
  }

  ngOnDestroy() {
    this.unsubscribe.unsubscribe();
  }

}
