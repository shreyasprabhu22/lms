import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BlogService } from 'src/app/services/blog.service';
import { blog } from 'src/app/interfaces/blog';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {
  blogs: blog[] = [];
  paginatedBlogs: blog[] = [];
  length = 0;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 7, 10];

  constructor(private blogservice: BlogService) {}

  ngOnInit() {
    this.load_blogs();
  }

  load_blogs() {
    this.blogservice.getData().subscribe(
      (data: blog[]) => {
        this.blogs = data;
        this.length = this.blogs.length;
        this.paginateBlogs()
        console.log(this.blogs);
        console.log(this.paginatedBlogs)
      },
      (err) => {
        console.error(err);
      }
    );
  }

  paginateBlogs() {
    this.paginatedBlogs = this.blogs.slice(0, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedBlogs = this.blogs.slice(startIndex, endIndex);
  }
  
}
