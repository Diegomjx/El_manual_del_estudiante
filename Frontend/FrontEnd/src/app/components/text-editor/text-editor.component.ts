import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})

export class TextEditorComponent implements OnInit {

  editorForm: FormGroup;
  maxLenghtNumber:number = 100;
  editorText = '';
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
    })

  }

  onSubmit(){
    console.log(this.editorForm.get('editor')?.value);

  }

  maxLenght(e:any){


    console.log(e);
    this.editorText = e['editor']['root']['innerHTML'];
    console.log(this.editorText);
    console.log(this.editorForm.get('editor')?.value);

/*      if(e.editor.getLength()>this.maxLenghtNumber){
       e.editor.deleteText(this.maxLenghtNumber, e.editor.getLength());
    }  */
  }
}
