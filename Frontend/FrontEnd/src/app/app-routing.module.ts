import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { RegisterComponent } from './components/register/register.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';

const routes: Routes = [//{ path: '', redirectTo: '/home', pathMatch: 'full' },
                        { path: 'home', component: MainNavigationComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'register', component: RegisterComponent},
                        {path: 'upload', component: UploadFileComponent},
                        {path: 'textEditor', component: TextEditorComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
