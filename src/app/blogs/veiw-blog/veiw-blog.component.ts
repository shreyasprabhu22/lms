import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { blog } from 'src/app/interfaces/blog';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
@Component({
  selector: 'app-veiw-blog',
  templateUrl: './veiw-blog.component.html',
  styleUrls: ['./veiw-blog.component.css']
})
export class VeiwBlogComponent {
  blog_data! : blog 
  blog_id: string  |null=null


  constructor(private route:ActivatedRoute, private router:Router, private blogservice:BlogService){
    this.blog_id = this.route.snapshot.paramMap.get('id');
    console.log(this.blog_id)
    this.load_blog()
  }
  load_blog(){
    if(this.blog_id){
    this.blogservice.getOne(this.blog_id).subscribe(
      (data: any) => {
        this.blog_data= data; 
        console.log(this.blog_data)
      }, 
      (err) => {
        console.error(err);
      }
    );
  }
  }
}
