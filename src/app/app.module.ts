import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './ar/header/header.component';
import { FooterComponent } from './ar/footer/footer.component';
import { HomeComponent } from './ar/home/home.component';
import { ShowServiceComponent } from './ar/show-service/show-service.component';
import {MatrialsModule } from './Modules/Matrials.Module'
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap/';
import { DoctorsComponent } from './ar/doctors/doctors.component';
import { ContactusComponent } from './ar/contactus/contactus.component';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { LoginComponent } from './ar/login/login.component';
import { UserComponent } from './admin/user/user.component';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './services/auth-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArticalsComponent } from './admin/articals/articals.component';
import { AddArticleComponent } from './admin/add-article/add-article.component';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule} from '@angular/forms';
import {NgPipesModule} from 'ngx-pipes';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { DoctorsCPComponent } from './admin/doctorsCP/doctorsCP.component';
import { ServicesComponent } from './admin/services/services.component';
import { AddServiceComponent } from './admin/add-service/add-service.component';
import { OurServicesComponent } from './ar/our-services/our-services.component';
import { SummryPipe } from './pipes/summry.pipe';
import { ArticleCardComponent } from './ar/article-card/article-card.component';
import { ShowArticleComponent } from './ar/show-article/show-article.component';
import { OurArticlesComponent } from './ar/our-articles/our-articles.component';
import { AboutComponent } from './ar/about/about.component';
import { AboutUsComponent } from './admin/about-us/about-us.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ShowServiceComponent,
    DoctorsComponent,
    ContactusComponent,
    LoginComponent,
    UserComponent,
    ArticalsComponent,
    AddArticleComponent,
    AddDoctorComponent,
    DoctorsCPComponent,
    ServicesComponent,
    AddServiceComponent,
    OurServicesComponent,
    SummryPipe,
    ArticleCardComponent,
    ShowArticleComponent,
    OurArticlesComponent,
    AboutComponent,
    AboutUsComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatrialsModule,
    FormsModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule,
    HttpModule,
    ReactiveFormsModule,
    NgPipesModule,
    
    
    
  ],
  exports:[
    BrowserAnimationsModule
  ],
  providers: [AngularFireAuth,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }

