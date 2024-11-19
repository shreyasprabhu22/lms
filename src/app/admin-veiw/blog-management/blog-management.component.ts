import { Component, ViewChild } from '@angular/core';
import { blog } from 'src/app/interfaces/blog';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.css']
})
export class BlogManagementComponent {
  blogs: blog[] = [];
  paginatedBlogs: blog[] = [];
  pageSize = 5;
  pageIndex = 0;
  displayedColumns: string[] = ['select', 'blog_id', 'title', 'author', 'date', 'category'];  
  selection = new SelectionModel<blog>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private blogService: BlogService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.blogService.getData().subscribe((data: blog[]) => {
      this.blogs = data;
      this.updatePagination();
    });
  }

  updatePagination() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBlogs = this.blogs.slice(startIndex, endIndex);
  }

  onAddBlog() {
    this.router.navigate(['/create-blog']);
  }

  onDeleteSelected() {
    const selectedBlogs = this.selection.selected;
    if (selectedBlogs.length > 0) {
      selectedBlogs.forEach(blog => {
        this.blogService.deleteData(blog.blog_id).subscribe(() => {
          this.blogs = this.blogs.filter(b => b.blog_id!== blog.blog_id);
          this.updatePagination();
          this.selection.deselect(blog);
        });
      });
    } else {
      console.log("No blogs selected for deletion.");
    }
  }
  
  onUpdateSelected(){
    const selectedBlog = this.selection.selected
    this.router.navigate([`/update-blog/${selectedBlog[0].blog_id}`]); 
  }
  onSelectBlog(id: string, checked: boolean) {
    const blog = this.blogs.find(blog => blog.blog_id === id);
    if (blog) {
      if (checked) {
        this.selection.select(blog);
      } else {
        this.selection.deselect(blog);
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
    const numRows = this.paginatedBlogs.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.paginatedBlogs.forEach(row => {
        this.selection.select(row);
      });
    }
  }
}
