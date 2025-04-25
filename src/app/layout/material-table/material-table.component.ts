

import { SelectionModel } from '@angular/cdk/collections';
import { Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

/**
 * @title Table with sticky header
 */
@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrl: './material-table.component.css',
  imports: [MatTableModule, MatCheckboxModule, MatButtonModule, MatButton, MatSortModule],
})
export class TableStickyHeaderExample {
  displayedColumns = ['select','id', 'firstName', 'lastName', 'postalCode', 'dateOfBirth','update', 'delete'];
  // dataSource = CLIENTARRAY;
  dataSource = new MatTableDataSource<ClientResponse>(CLIENTLIST);

  //for checkbox
  selection = new SelectionModel<ClientResponse>(true, []);

  private _liveAnnouncer = inject(LiveAnnouncer);
  //For SORTING

   /* Sorting */
   @ViewChild(MatSort) sort: MatSort;

   ngAfterViewInit() {
     this.dataSource.sort = this.sort;
   }
    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort) {
     // This example uses English messages. If your application supports
     // multiple language, you would internationalize these strings.
     // Furthermore, you can customize the message to add additional
     // details about the values being sorted.
     if (sortState.direction) {
       this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
     } else {
       this._liveAnnouncer.announce('Sorting cleared');
     }
   }






  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }


  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: ClientResponse): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }


}

export interface ClientResponse {
  id: number;
  firstName: string;
  lastName: number;
  postalCode: string;
  dateOfBirth: string;
}

const CLIENTLIST: ClientResponse[] = [
  { id: 1,  firstName: 'Hydrogen', lastName: 1.0079, postalCode: 'H'   , dateOfBirth: 'a'},
  { id: 2,  firstName: 'Helium', lastName: 4.0026, postalCode: 'He'    , dateOfBirth: 'a'},
  { id: 3,  firstName: 'Lithium', lastName: 6.941, postalCode : 'Li'   , dateOfBirth: 'a'},
  { id: 4,  firstName: 'Beryllium', lastName: 9.0122, postalCode: 'Be' , dateOfBirth: 'a'},
  { id: 5,  firstName: 'Boron', lastName: 10.811, postalCode: 'B'      , dateOfBirth: 'a'},
  { id: 6,  firstName: 'Carbon', lastName: 12.0107, postalCode: 'C'   , dateOfBirth: 'a'},
  { id: 7,  firstName: 'Nitrogen', lastName: 14.0067, postalCode: 'N' , dateOfBirth: 'a'},
  { id: 8,  firstName: 'Oxygen', lastName: 15.9994, postalCode: 'O'   , dateOfBirth: 'a'},
  { id: 9,  firstName: 'Fluorine', lastName: 18.9984, postalCode: 'F' , dateOfBirth: 'a'},
  { id: 10, firstName: 'Neon', lastName: 20.2 , postalCode: 'Ne'       , dateOfBirth: 'a'},
];

/**  Copyright 2025 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
