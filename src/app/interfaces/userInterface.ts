export interface User {
userId:string,
name: string, 
email:string,
username:string,
password:string
profilePhoto:string,
phoneNumber:string ,
currentInstitution:string,
gender:string ,
role:'Admin'| 'User', 
dateOfBirth: Date ,
enrollmentDate: Date ,
bio: string ,
interests:string[],
location:string ,
subscription:string
purchasedCourses: string[]
}