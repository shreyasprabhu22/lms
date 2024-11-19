import { Component, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/userInterface';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  users: User[] = [];
  paginatedUsers: User[] = [];
  pageSize = 5;
  pageIndex = 0;
  displayedColumns: string[] = ['select', 'userId', 'name', 'username', 'email'];  
  selection = new SelectionModel<User>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.getData().subscribe((data: User[]) => {
      this.users = data;
      this.updatePagination();
    });
  }

  updatePagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

 

  onDeleteSelected() {
    const selectedUsers = this.selection.selected;

    if (selectedUsers.length > 0) {
      selectedUsers.forEach(user => {
        this.userService.deleteData(user.userId).subscribe(() => {
          this.users = this.users.filter(u => u.userId !== user.userId);
          this.updatePagination();
          this.selection.deselect(user);
        }); 
      });
    } else {
      console.log("No users selected for deletion.");
    }
  }

  

  onSelectUser(id: string, checked: boolean) {
    const user = this.users.find(user => user.userId === id);
    if (user) {
      if (checked) {
        this.selection.select(user);
      } else {
        this.selection.deselect(user);
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
    const numRows = this.paginatedUsers.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.paginatedUsers.forEach(row => {
        this.selection.select(row);
      });
    }
  }
}
