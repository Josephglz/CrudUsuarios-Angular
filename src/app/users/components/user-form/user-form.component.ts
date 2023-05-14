import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private _fBuilder: FormBuilder,
    private _userService: UsersService,
    private _dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this._fBuilder.group({
      name: '',
      lastName: '',
      email: '',
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onFormSubmit() {
    if(!this.userForm.valid) {
      alert('Formulario inválido');
    } else {
      if(this.data) {
        this._userService.updateUser(this.data.id, this.userForm.value).subscribe({
          next: (val: any) => {
            alert('Usuario actualizado');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            alert('Error al actualizar usuario');
            console.log(err);
          }
        })
      } else {
        this._userService.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            alert('Usuario guardado');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            alert('Error al guardar usuario');
            console.log(err);
          }
        })
      }
    }
  }
}
