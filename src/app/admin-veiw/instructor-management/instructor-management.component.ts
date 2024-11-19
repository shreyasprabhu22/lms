import { Component, ViewChild } from '@angular/core';
import { instructor } from 'src/app/interfaces/instructor';
import { InstructorService } from 'src/app/services/instructor.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-instructor-management',
  templateUrl: './instructor-management.component.html',
  styleUrls: ['./instructor-management.component.css']
})
export class InstructorManagementComponent {
  instructors: instructor[] = [];
  paginatedInstructors: instructor[] = [];
  pageSize = 5;
  pageIndex = 0;
  displayedColumns: string[] = ['select', 'instructorId', 'name', 'username', 'email'];  
  selection = new SelectionModel<instructor>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private instructorService: InstructorService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchInstructors();
  }

  fetchInstructors() {
    this.instructorService.getData().subscribe((data: instructor[]) => {
      this.instructors = data;
      this.updatePagination();
    });
  }

  updatePagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedInstructors = this.instructors.slice(startIndex, endIndex);
  }

  onAddUser() {
    this.router.navigate(['/create-instructor']);
  }
 
  onDeleteSelected() {
    const selectedInstructors = this.selection.selected;

    if (selectedInstructors.length > 0) {
      selectedInstructors.forEach(instructor => {
        this.instructorService.deleteData(instructor.instructorId).subscribe(() => {
          this.instructors = this.instructors.filter(inst => inst.instructorId !== instructor.instructorId);
          this.updatePagination();
          this.selection.deselect(instructor);
        });
      });
    } else { 
      console.log("No instructors selected for deletion.");
    }
  }

  onUpdateSelected(){
    const selectedInstructor = this.selection.selected
    this.router.navigate([`/update-instructor/${selectedInstructor[0].instructorId}`]); 
  }

  onSelectUser(id: string, checked: boolean) {
    const instructor = this.instructors.find(instructor => instructor.instructorId === id);
    if (instructor) {
      if (checked) {
        this.selection.select(instructor);
      } else {
        this.selection.deselect(instructor);
      }
    }
  }
  

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagination();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.paginatedInstructors.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.paginatedInstructors.forEach(row => {
        this.selection.select(row);
      });
    }
  }
  
}
