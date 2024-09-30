import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatOptionModule } from '@angular/material/core'; 
import { MatButtonModule } from '@angular/material/button'; 
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

import { Habit } from './models/habits';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, CommonModule,
    MatToolbarModule, MatIconModule, MatCardModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public adding = false;
  public editing = false;
  public editingIndex!: number;

  public habitForm = new FormGroup({
    name: new FormControl(''),
    frequency: new FormControl(''),
    description: new FormControl(''),
  })

  public habits: Habit[] = [
    <Habit> {
      name: "15 Minute Walk",
      frequency: "Weekly",
      description: 'This habit makes my kitchen look nice and makes my day better the next morning.',
    },
    <Habit> {
      name: "Weed the Garden",
      frequency: "Weekly",
      description: 'The weeds get so out of hand if they wait any longer, and I like how nice our home looks with a clean lawn.',
    }
  ]

  public onSubmit() {
    const habit = this.habitForm.value as Habit;

    if(this.editing) {
      this.habits.splice(this.editingIndex, 1, habit);
    }
    else {
      this.habits.push(habit);
    }

    this.exitForm();
  }

  public setEditForm(habit: Habit, index: number) {
    this.habitForm.patchValue({
      name: habit.name,
      frequency: habit.frequency,
      description: habit.description,
    });
    this.editing = true;
    this.editingIndex = index;
  }

  public onDelete(index: number) {
    this.habits.splice(index, 1);
  }

  public exitForm() {
    this.adding = false;
    this.editing = false;
    this.habitForm.reset();
  }
}
