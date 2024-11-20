export interface instructor{
  instructorId:string,
  name: string,
  email: string,
  bio: string,
  reviewIns: Number,
  image: string,
  specialization: string,
  experience:string,
  socialLinks: {
    linkedin: string,
    twitter: string
  },
  location: string,
  username: string,
  password: string,
  role:String,
  isFirstLogin:boolean,
  ownRegistered:boolean
}