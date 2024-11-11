import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import {MatPaginatorModule} from '@angular/material/paginator';




@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    MatStepperModule,
    MatPaginatorModule

  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTooltipModule,
    BrowserAnimationsModule, 
    MatExpansionModule,
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    MatStepperModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {}
