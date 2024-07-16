import { DropdownModule } from 'primeng/dropdown';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { InputComponent } from '../input/input.component';
@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownModule, InputComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  @Input() formControlName!: any;
  @Input() formGroup!: FormGroup;
  @Input() selector!: any[] | undefined;
  @Input() placeholder!: string;
  @Input() label!: string;
  @Input() value!: string;
}
