import  { instructor} from './instructor'

export interface Course {
    course_id:  string,
    name: string,
    category: string,
    duration:  Number,
    description:  string,
    instructor_id:string,
    img:  string,
    courseContent: [
      {
        week:number,
        title: string,
        description: string,
      } 
    ],
    prerequisites: string [],
    reviews: [
      {
        reviewer:  string,
        rating: number,
        comment:  string
      }
    ],
    level: string,
    price:Number
    faq: [
      {
        question:  string,
        answer:  string
      }
    ]
  };