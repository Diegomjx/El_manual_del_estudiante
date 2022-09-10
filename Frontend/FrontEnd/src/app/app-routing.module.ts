import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreteListComponent } from './components/crete-list/crete-list.component';
import { LoginComponent } from './components/login/login.component';
import { LookListComponent } from './components/look-list/look-list.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { MisListasComponent } from './components/mis-listas/mis-listas.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { LookPDFComponent } from './look-pdf/look-pdf.component';
import { MiNotesComponent } from './mi-notes/mi-notes.component';

const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' },
                        { path: 'home', component: MainNavigationComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'register', component: RegisterComponent},
                        {path: 'upload', component: UploadFileComponent},
                        {path: 'textEditor', component: TextEditorComponent},
                        {path: 'MiNotes', component: MiNotesComponent},
                        {path: 'LookPDF', component: LookPDFComponent},
                        {path: 'search', component: SearchComponent}
                        {path: 'addList', component: CreteListComponent},
                        {path: 'LookList', component: LookListComponent},
                        {path: 'MisListas', component:MisListasComponent}

                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
