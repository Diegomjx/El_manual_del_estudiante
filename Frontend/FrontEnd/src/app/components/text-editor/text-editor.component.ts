import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})

export class TextEditorComponent implements OnInit {

  editorForm: FormGroup;
  

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
}
