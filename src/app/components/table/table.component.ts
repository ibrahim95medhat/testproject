import { CommonModule } from '@angular/common';
import { Component, Input, effect } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  @Input() customers: any[] | undefined = [];

  constructor(){
    
  }
}