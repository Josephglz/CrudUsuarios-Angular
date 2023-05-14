import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UserFormComponent } from './users/components/user-form/user-form.component';

import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { UsersService } from './users/services/users.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'email', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _userDialog: MatDialog,
    private _userService: UsersService
  ) { }

  /**
   * Open the user form dialog
   */
  openUserForm() {
    const dialogRef = this._userDialog.open(UserFormComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getUserList();
        }
      }
    });
  }

  /*
  * Open the user form dialog to edit
  * @param data of the user
  */
  openEditForm(data: any) {
    const dialogRef = this._userDialog.open(UserFormComponent, {
      data,
    })
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val) {
          this.getUserList();
        }
      }
    });
  }

  /**
   * Load list of users
   */
  getUserList() {
    this._userService.loadUsers().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator; 
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  /**
   * Delete user by id
   * @param id
  */
  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe({
      next: (res) => {
        this.getUserList();
        alert('Usuario eliminado correctamente');
      },
      error: (err) => {
        alert('Error al eliminar el usuario');
        console.log(err);
      }
    })
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.getUserList();
  }
}