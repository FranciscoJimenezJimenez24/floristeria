import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddFloresComponent } from './add-flores/add-flores.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    AddFloresComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule 
  ],
})
export class FloresModule { }
