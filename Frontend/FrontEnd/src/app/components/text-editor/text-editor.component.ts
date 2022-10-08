import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


import { pdfExporter } from 'quill-to-pdf';
import { QuillModule } from 'ngx-quill';
import Quill, { Delta } from 'quill';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})

export class TextEditorComponent implements OnInit {

  editorForm: FormGroup;
  modules = {};
  maxLenghtNumber:number = 100;
  editorText:any;
  editorStyle={
    height: '600px',
    flex: 1,
    width: '1106px'
  }

  

  constructor() {
    //this.editorForm=;
   }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    });
   

  }
  
  
  async  onSubmit(){
    console.log(this.editorForm.get('editor')?.value);
    console.log(this.modules);
/*     var container = document.getElementById('editor') ||'';
    var editor = new Quill(container); */
      /*  var editorId = "editor";
       var container = document.getElementById(editorId)||'';
       const editor = new Quill( container );
       console.log(editor); */

    //  var quillDelta : Delta = editor.getContents(); 
      const e = this.editorForm.get('editor')?.value;
      const pdfAsBlob = await pdfExporter.generatePdf(e); 
      



  }

  maxLenght(e:any){


    console.log(e);
   // this.editor = new Quill();
    this.editorText = e;
    console.log(this.editorText);
    //console.log(this.editorForm.get('editor')?.value);

/*      if(e.editor.getLength()>this.maxLenghtNumber){
       e.editor.deleteText(this.maxLenghtNumber, e.editor.getLength());
    }  */
  }
}
