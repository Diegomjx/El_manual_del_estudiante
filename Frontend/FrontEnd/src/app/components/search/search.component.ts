import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  UserName: string;
  DocumentName: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {DocumentName: 'Doc',     UserName: 'Julio', weight: 1.0079, symbol: 'H'},
  {DocumentName: 'Doc-123', UserName: 'Diego', weight: 4.0026, symbol: 'He'},
  {DocumentName: 'Docssss', UserName: 'Mario', weight: 6.941, symbol: 'Li'},
  {DocumentName: 'PDF- mate - Algebra', UserName: 'Elias', weight: 9.0122, symbol: 'Be'},
  {DocumentName: 'SS- Conquista', UserName: 'Baron', weight: 10.811, symbol: 'B'},
  {DocumentName: 'sadfsadfsadf', UserName: 'Donald', weight: 12.0107, symbol: 'C'},
  {DocumentName: 'Quimica Organica', UserName: 'Donald', weight: 14.0067, symbol: 'N'},
  {DocumentName: 'doc(1)(1)', UserName: 'Elias', weight: 15.9994, symbol: 'O'},
  {DocumentName: 'default', UserName: 'Flu', weight: 18.9984, symbol: 'F'},
  {DocumentName: 'Doc1', UserName: 'Neon', weight: 20.1797, symbol: 'Ne'},
];



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  displayedColumns: string[] = ['DocumentName', 'UserName', 'weight', 'symbol'];
  dataSource = new MatTableDataSource( ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  Search(){

  }

  applyFilter(filterValue: string){
    this.dataSource.filter =filterValue.trim().toLowerCase();

  }

  
}
