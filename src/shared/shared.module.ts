import { PipesModule } from '../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  imports: [CommonModule , PipesModule],
  declarations: [],
  exports: [CommonModule, FormsModule, PipesModule]
})
export class SharedModule { }
