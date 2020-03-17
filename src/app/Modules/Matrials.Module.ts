
import { NgModule } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ModalModule } from 'ngx-bootstrap';



@NgModule({
    declarations: [
     
    ],
    imports: [
      MatTableModule,
      MatFormFieldModule,
      MatPaginatorModule,
      MatSortModule,
      MatInputModule,
      MatSelectModule,
      ModalModule.forRoot()
    ],
    exports: [
      MatTableModule,
      MatFormFieldModule,
      MatPaginatorModule,
      MatSortModule,
      MatInputModule,
      MatSelectModule,
      CKEditorModule,
      NgxFileDropModule,
      ModalModule
    ],
    providers: [
      MatTableModule,
      MatFormFieldModule,
      MatPaginatorModule,
      MatSortModule,
      MatInputModule,
      ModalModule
    ]
  })
  export class MatrialsModule { }