import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ArticlesService } from 'src/app/services/articles.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-articals',
  templateUrl: './articals.component.html',
  styleUrls: ['./articals.component.css']
})
export class ArticalsComponent implements OnDestroy {

  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  displayedColumns: string[] = ['Title', 'ImageURL', 'DateTime', 'id', 'Delete'];
  articles;
  dataSource;
  unsubArticles: Subscription;

  deleteMsg = false;
  loadData = true;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private getArticles: ArticlesService, private modalService: BsModalService) {
    this.unsubArticles = this.getArticles.getAll().subscribe(article => {
      this.articles = article;
      this.dataSource = new MatTableDataSource(article);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadData = false;
    })
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  decline() { this.modalRef.hide(); }
  deleteArticle(id) {

    this.deleteMsg = true;
    this.getArticles.DeleteArticle(id);
    this.modalRef.hide();

    setTimeout(() => {
      this.deleteMsg = true
    }, 2000);

    //Scroll to top
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
    //-------------------
  }

  ngOnDestroy() {
    this.unsubArticles.unsubscribe();
  }

}
