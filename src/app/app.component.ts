import { Component, OnInit } from '@angular/core';
import { HeroService } from './service/hero.service';
import { Student } from './model/student.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  students: Student[]  = [];
  showPopup:boolean = false;
  studentId:number = 0;
  searchText:string = '';

  constructor(private heroService: HeroService) {
    
  }
  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.heroService.getData().subscribe((res) => {
      this.students = res;
    })
  }
  toggleModal() {
    this.showPopup = !this.showPopup;
    
  }
  addItem(newItem: any) {
    this.showPopup = newItem;
  }
  deleteStudent(id:number) {
    // this.students = this.students.filter(x => x.id != id)
    this.heroService.deleteStudent(id).subscribe(data => {
      this.students = this.students.filter(item => item.id != id)
    })
  }
  sortGpaLowToHigh() {
    this.heroService.getData().subscribe((res) => {
      this.students = res;
      this.students.sort((a,b) => {
        return a.GPA - b.GPA;
      })
    });
  }
  sortGpaHighTolow() {
    this.heroService.getData().subscribe((res) => {
      this.students = res;
      this.students.sort((a,b) => {
        return b.GPA - a.GPA;
      })
    });
  }
  sortNameLowToHigh() {
    this.heroService.getData().subscribe((res) => {
      this.students = res;
      this.students.sort((a,b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    });
  }
  sortNameHighTolow() {
    this.heroService.getData().subscribe((res) => {
      this.students = res;
      this.students.sort((a,b) => {
        if (a.name < b.name) {
          return 1;
        }
        if (a.name > b.name) {
          return -1;
        }
        return 0;
      })
    });
  }
  getStudentId(id:number) {
    this.studentId = id;
  }
  closeModal(newItem:any) {
    this.studentId = newItem;
  }
  handleSearchInput(event: any, value: string) {
    if(!value) return;
    this.searchText = value;
    value = value.trim();
    if(event.keyCode == '13') {
      this.heroService.getData().subscribe(result => {
        this.students = (result || []).filter(x => {
          return x.name?.includes(value) || x.class?.includes(value);
        });
      });
    }
  }
  filterbyGPA(value?: any, $event?: any) {
    this.heroService.getData().subscribe(result => {
      this.students = result || [];
      if(value === 'low') {
        this.students = this.students.filter(x => {
          return x.GPA <= 8;
        });
      } else {
        this.students = this.students.filter(x => {
          return x.GPA > 8;
        });
      }
    })
  }
}
