import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { LoginComponent } from './components/login/login.component';

//QUILL
import{QuillModule} from 'ngx-quill';

//material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { NgxToastNotifierModule } from 'ngx-toast-notifier';
import {MatTableModule} from '@angular/material/table';

import {MatRadioModule} from '@angular/material/radio';

import {MatGridListModule} from '@angular/material/grid-list';
import { MiNotesComponent } from './mi-notes/mi-notes.component';
import { LookPDFComponent } from './look-pdf/look-pdf.component';
import { SearchComponent } from './components/search/search.component';
import { CreteListComponent } from './components/crete-list/crete-list.component';
import { LookListComponent } from './components/look-list/look-list.component';
import { MisListasComponent } from './components/mis-listas/mis-listas.component';
import { HistorialComponent } from './components/historial/historial.component';
import { MegustaComponent } from './components/megusta/megusta.component';
import {MatMenuModule} from '@angular/material/menu';
import { EditNotesComponent } from './components/edit-notes/edit-notes.component';



@NgModule({
  declarations: [
    AppComponent,
    MainNavigationComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    UploadFileComponent,
    TextEditorComponent,
    MiNotesComponent,
    LookPDFComponent,
    SearchComponent,
    CreteListComponent,
    LookListComponent,
    MisListasComponent,
    HistorialComponent,
    MegustaComponent,
    EditNotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    NgxToastNotifierModule.forRoot(),
    QuillModule,
    //-----
    MatTableModule,
    MatRadioModule ,
    MatGridListModule,
    MatMenuModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
