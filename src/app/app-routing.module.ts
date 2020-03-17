import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowServiceComponent } from './ar/show-service/show-service.component';
import { HomeComponent } from './ar/home/home.component';
import { DoctorsComponent } from './ar/doctors/doctors.component';
import { ContactusComponent } from './ar/contactus/contactus.component';
import { LoginComponent } from './ar/login/login.component';
import { UserComponent } from './admin/user/user.component';
import { AuthGuard } from './services/auth-guard.service';
import { ArticalsComponent } from './admin/articals/articals.component';
import { AddArticleComponent } from './admin/add-article/add-article.component';
import { AddDoctorComponent } from './admin/add-doctor/add-doctor.component';
import { DoctorsCPComponent } from './admin/doctorsCP/doctorsCP.component';
import { ServicesComponent } from './admin/services/services.component';
import { AddServiceComponent } from './admin/add-service/add-service.component';
import { OurServicesComponent } from './ar/our-services/our-services.component';
import { ShowArticleComponent } from './ar/show-article/show-article.component';
import { OurArticlesComponent } from './ar/our-articles/our-articles.component';
import { AboutComponent } from './ar/about/about.component';
import { AboutUsComponent } from './admin/about-us/about-us.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: "ar/home",
    pathMatch: 'full'
  },
  {path:'Home/Index', redirectTo: 'ar/home', pathMatch: 'full'},
  {path:'ar/home', component : HomeComponent},
  {path:'ar/about', component : AboutComponent},
  {path:'ar/ShowService', component : ShowServiceComponent},
  {path:'ar/ourServices', component : OurServicesComponent},
  {path:'ar/ShowService/:id', component : ShowServiceComponent},
  {path:'ar/ourArticles', component : OurArticlesComponent},
  {path:'ar/ShowArticle/:id', component : ShowArticleComponent},
  {path:'ar/doctors', component : DoctorsComponent},
  {path:'ar/contactus', component : ContactusComponent},
  {path:'ar/login', component : LoginComponent},


  {path:'admin/addUser', component : UserComponent,canActivate : [AuthGuard]},
  {path:'admin/articlas', component : ArticalsComponent,canActivate : [AuthGuard] },
  {path:'admin/addArticle', component : AddArticleComponent,canActivate : [AuthGuard] },
  {path:'admin/addArticle/:id', component : AddArticleComponent,canActivate : [AuthGuard] },
  {path:'admin/doctorsCP', component : DoctorsCPComponent ,canActivate : [AuthGuard] },
  {path:'admin/addDoctor', component : AddDoctorComponent,canActivate : [AuthGuard] },
  {path:'admin/addDoctor/:id', component : AddDoctorComponent,canActivate : [AuthGuard] },
  {path:'admin/services', component : ServicesComponent ,canActivate : [AuthGuard] },
  {path:'admin/addService', component : AddServiceComponent,canActivate : [AuthGuard] },
  {path:'admin/addService/:id', component : AddServiceComponent,canActivate : [AuthGuard] },
  {path:'admin/AboutUs', component : AboutUsComponent,canActivate : [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
