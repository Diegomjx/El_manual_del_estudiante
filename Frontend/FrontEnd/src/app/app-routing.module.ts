import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreteListComponent } from './components/crete-list/crete-list.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { EditNotesComponent } from './components/edit-notes/edit-notes.component';
import { ElectronicaComponent } from './components/electronica/electronica.component';
import { HistorialComponent } from './components/historial/historial.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { LoginComponent } from './components/login/login.component';
import { LookListComponent } from './components/look-list/look-list.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { MegustaComponent } from './components/megusta/megusta.component';
import { MisListasComponent } from './components/mis-listas/mis-listas.component';
import { PaginadeAdministradorComponent } from './components/paginade-administrador/paginade-administrador.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { VisitanteComponent } from './components/visitante/visitante.component';
import { LookPDFComponent } from './look-pdf/look-pdf.component';
import { MiNotesComponent } from './mi-notes/mi-notes.component';
import { MindmapComponent } from './components/mindmap/mindmap.component';
import { MapsEditorComponent } from './components/maps-editor/maps-editor.component';
import { StateMapComponent } from './components/state-map/state-map.component';
import { DrawComponent } from './components/draw/draw.component';
import { SequenceComponent } from './components/sequence/sequence.component';
import { RecordsComponent } from './components/records/records.component';

const routes: Routes = [{ path: '', redirectTo: '/home', pathMatch: 'full' },
                        { path: 'home', component: MainNavigationComponent },
                        { path: 'login', component: LoginComponent },
                        { path: 'register', component: RegisterComponent},
                        {path: 'upload', component: UploadFileComponent},
                        {path: 'textEditor', component: TextEditorComponent},
                        {path: 'MiNotes', component: MiNotesComponent},
                        {path: 'LookPDF', component: LookPDFComponent},
                        {path: 'search', component: SearchComponent},
                        {path: 'addList', component: CreteListComponent},
                        {path: 'LookList', component: LookListComponent},
                        {path: 'MisListas', component:MisListasComponent},
                        {path: 'historial', component: HistorialComponent},
                        {path: 'Megusta', component:MegustaComponent},
                        {path: 'EditarNotas', component:EditNotesComponent},
                        {path:'Admins', component:PaginadeAdministradorComponent},
                        {path: 'EditarLista', component:EditListComponent},
                        {path:'Siguiendo', component:VisitanteComponent},
                        {path:'Electronica', component:ElectronicaComponent},
                        {path: 'graphEditor', component:GraphsComponent},
                        {path: 'mindmap', component:MindmapComponent},
                        {path: 'MapEditor', component:MapsEditorComponent},
                        {path: 'statemap', component:StateMapComponent},
                        {path: 'draw', component:DrawComponent},
                        {path: 'sequence', component:SequenceComponent},
                        {path: 'records', component:RecordsComponent}

                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
