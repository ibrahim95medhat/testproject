import { Component, Input } from '@angular/core';
import {
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label!: string;
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() inputFormControlName!: string;
  @Input() formGroup!: FormGroup;
  @Input() width!: string;
  @Input() type = 'text';
  @Input() border!: string;
  @Input() borderRadius!: string;
  @Input() placeholder!: string;
  @Input() textAlign = 'center';
  @Input() disable: string = 'none';
  @Input() margin!: string;
}
