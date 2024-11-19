import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { blog } from 'src/app/interfaces/blog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent {
  blogFormGroup!: FormGroup;
  msg = '';
  isEditMode: boolean = false;
  BlogId: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private route :ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.blogFormGroup = this._formBuilder.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      author: ['', [Validators.required]],
      date: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      images: ['', []]
    });

    this.route.paramMap.subscribe(params => {
      this.BlogId = params.get('id')!;
      console.log(this.BlogId)
      if (this.BlogId) {
        this.isEditMode = true;
        this.loadData();
        console.log(this.isEditMode)
      }
    });
    
  }

  loadData(): void {
    if (this.BlogId) {
      this.blogService.getOne(this.BlogId).subscribe((blogData: blog) => {
        console.log(blogData);
        this.blogFormGroup.patchValue({
          title: blogData.title,
          content: blogData.content,
          author: blogData.author,
          date: blogData.date,
          description: blogData.description,
          category: blogData.category,
          images: blogData.images.join(', ')  
        });
      }, (error) => {
        this.msg = 'Blog data not found!';
        console.error('Error fetching blog:', error);
      });
    }
  }
  submitForm(): void {
    if (this.blogFormGroup.valid) {
      const newBlog: blog = {
        blog_id: this.isEditMode ? this.BlogId : '',  
        title: this.blogFormGroup.value.title,
        content: this.blogFormGroup.value.content,
        author: this.blogFormGroup.value.author,
        date: this.blogFormGroup.value.date,
        authorImage: 'assets/auth_photo.jpeg',  
        description: this.blogFormGroup.value.description,
        category: this.blogFormGroup.value.category,
        images: this.blogFormGroup.value.images.split(',').map((img: string) => img.trim()) 
      };

      if (this.isEditMode) {
        console.log('Updating blog...');
        this.blogService.updateData(this.BlogId, newBlog).subscribe({
          next: () => {
            alert('Blog updated successfully!');
            this.router.navigate(['/admin-dashboard']);
          },
          error: (err) => {
            this.msg = 'There was an error updating the blog. Please try again later.';
            console.error('Error updating blog:', err);
          }
        });
      } else {
        console.log('Creating new blog...');
        this.blogService.postData(newBlog).subscribe({
          next: (response) => {
            alert('Blog created successfully!');
            this.router.navigate(['/admin-dashboard']);
          },
          error: (err) => {
            this.msg = 'There was an error creating the blog. Please try again later.';
            console.error('Error creating blog:', err);
          }
        });
      }
    } else {
      this.msg = 'Please fill out all fields correctly.';
    }
  }

}
