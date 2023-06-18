import { Component,OnInit } from '@angular/core';
import { HeroService } from '../service/hero.service';
import { Student } from '../model/student.model';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent  {
  @Input() showPopup = false;
  @Output() newItemEvent = new EventEmitter<string>();

  students: Student[]  = [];
  
  student = {
    id: '',
    name: '',
    type: '',
    class: '',
    GPA:''
  }

  constructor(private heroService: HeroService,
    private Router: Router) {
    
  }

  addStudent() {
    this.heroService.addStudent(this.student).subscribe((data) => {
      window.location.href = '/';
    })
  }
  toggleModal(value: any) {
    this.newItemEvent.emit(value);
  }
}
