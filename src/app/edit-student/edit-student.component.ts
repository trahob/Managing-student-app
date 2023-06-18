import { HeroService } from '../service/hero.service';
import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  @Input() studentId = 0;
  @Output() callbackEvent = new EventEmitter<string>();
  closeModal = true
  detailStudent:any = {}
  ngOnInit(): void {
    this.getDetailStudent()
  }
  getDetailStudent() {
    this.heroService.getDetailStudent(this.studentId).subscribe(data => {
      this.detailStudent = data
    })
  }
  updateStudent() {
    
    this.heroService.updateStudent(this.detailStudent.id, this.detailStudent).subscribe(data => {
      window.location.href = '/';
    })
  }
  toggleModal(value: any) {
    this.callbackEvent.emit(value);
  }

  constructor(private heroService: HeroService) {
    
  }
}
