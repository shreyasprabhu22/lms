import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent {

  blogs = [
    {
      "id": 1,
      "title": "Introduction to Machine Learning",
      "content": "This blog post explains the fundamentals of machine learning, including supervised and unsupervised learning. It discusses key concepts like data training, model evaluation, and the algorithms that drive machine learning applications. With real-world examples, readers will understand how machine learning is used in fields such as finance, healthcare, and marketing.",
      "author": "John Doe",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "15 January 2024"
    },
    {
      "id": 2,
      "title": "The Future of Artificial Intelligence",
      "content": "An exploration of the potential impact of AI on various industries and how it will shape the future. From autonomous vehicles to advanced robotics, AI is poised to revolutionize how we live and work. The post also delves into ethical considerations, such as job displacement and AI governance, and what steps can be taken to ensure a positive future.",
      "author": "Jane Smith",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "20 January 2024"
    },
    {
      "id": 3,
      "title": "Effective Time Management Strategies for Students",
      "content": "A guide to mastering time management with tips and techniques for students to improve productivity. This post highlights essential strategies such as prioritizing tasks, using digital tools like calendars and task managers, and setting realistic goals. The blog also touches on how to avoid procrastination and the importance of balancing study time with self-care.",
      "author": "Emily Clarke",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "5 February 2024"
    },
    {
      "id": 4,
      "title": "Understanding Cloud Computing Basics",
      "content": "An introduction to cloud computing, its benefits, and different service models such as SaaS, PaaS, and IaaS. The post covers the advantages of cloud computing, like cost savings, scalability, and flexibility. It also explores common applications in businesses and education, from cloud storage to cloud-based software development.",
      "author": "Mark Taylor",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "10 February 2024"
    },
    {
      "id": 5,
      "title": "The Importance of Cybersecurity in the Digital Age",
      "content": "This post outlines the significance of cybersecurity and tips for staying safe online. It explores common online threats such as phishing, ransomware, and data breaches, and provides strategies to protect personal and organizational data. Best practices for password management, encryption, and multi-factor authentication are also covered in the blog.",
      "author": "Alice Johnson",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "15 February 2024"
    },
    {
      "id": 6,
      "title": "Gamification in Education",
      "content": "Exploring how gamification can enhance learning experiences and increase student engagement. The post explains how game elements like points, badges, and leaderboards can motivate students to complete tasks, reinforce learning, and foster healthy competition. It also examines case studies of schools and universities that have successfully integrated gamification into their curriculum.",
      "author": "Robert Lee",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "18 February 2024"
    },
    {
      "id": 7,
      "title": "How to Build a Personal Learning Network",
      "content": "Learn how to create and maintain a personal learning network to enhance your knowledge and skills. This post discusses the importance of networking with experts, peers, and communities both online and offline. It also provides practical steps for building a learning network, including attending webinars, joining professional groups, and using social media for educational purposes.",
      "author": "Mia White",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "1 March 2024"
    },
    {
      "id": 8,
      "title": "The Role of Data Science in Modern Business",
      "content": "Data science has become a crucial tool for businesses to analyze large datasets and make informed decisions. This post covers the basics of data science, from data collection to predictive analytics, and shows how companies are using data to improve customer experiences, optimize operations, and drive innovation. It also highlights tools like Python and R that data scientists use in their work.",
      "author": "Sophia Green",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "10 March 2024"
    },
    {
      "id": 9,
      "title": "Introduction to Web Development",
      "content": "A beginner's guide to web development, covering the basics of HTML, CSS, and JavaScript. This post walks readers through the essentials of building websites, from understanding the structure of HTML to styling pages with CSS and adding interactivity with JavaScript. The post also explores modern web development frameworks and how they are used to build dynamic web applications.",
      "author": "David Harris",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "12 March 2024"
    },
    {
      "id": 10,
      "title": "Sustainable Practices in Education",
      "content": "How educational institutions can implement sustainable practices to promote environmental responsibility. The post provides ideas for eco-friendly campuses, such as reducing energy consumption, recycling programs, and using digital learning tools to minimize paper waste. It also discusses the importance of incorporating sustainability into the curriculum to educate future generations on environmental issues.",
      "author": "Olivia Brown",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "20 March 2024"
    },
    {
      "id": 11,
      "title": "Understanding Blockchain Technology",
      "content": "This blog explains the basics of blockchain, its applications, and potential future use cases in various industries. The post delves into how blockchain works, the concept of decentralized ledgers, and its applications in sectors like finance, healthcare, and supply chain management. It also explores emerging trends in blockchain, such as smart contracts and tokenization.",
      "author": "Chris Allen",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "5 April 2024"
    },
    {
      "id": 12,
      "title": "Mobile Learning: The Future of Education",
      "content": "Exploring the benefits and challenges of mobile learning and its impact on the education sector. This post discusses how mobile learning apps are making education more accessible, flexible, and interactive for students. It also examines the challenges mobile learning presents, including ensuring device compatibility and maintaining engagement in a digital environment.",
      "author": "Lily Scott",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "10 April 2024"
    },
    {
      "id": 13,
      "title": "Best Practices for Remote Learning",
      "content": "A collection of best practices for students and educators to make remote learning more effective. The blog covers key strategies such as setting clear expectations, fostering online collaboration, and providing timely feedback. It also explores tools like video conferencing, discussion boards, and collaborative platforms to enhance remote learning experiences.",
      "author": "Jack Wilson",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "15 April 2024"
    },
    {
      "id": 14,
      "title": "Introduction to Deep Learning",
      "content": "An overview of deep learning, its significance, and how it's being applied across various fields. This post explains how deep learning differs from traditional machine learning, with a focus on neural networks and the role they play in applications like image recognition, natural language processing, and autonomous vehicles. The blog also touches on the computational power needed for deep learning models and the challenges involved.",
      "author": "Charlotte Davis",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "20 April 2024"
    },
    {
      "id": 15,
      "title": "Artificial Intelligence in Healthcare",
      "content": "Exploring the ways AI is revolutionizing the healthcare industry, from diagnostics to patient care. The blog covers AI-powered tools that assist doctors in diagnosing diseases, improving treatment outcomes, and streamlining hospital management. It also explores the ethical considerations and potential risks of AI in healthcare, such as data privacy and the role of human oversight.",
      "author": "Daniel Evans",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "25 April 2024"
    },
    {
      "id": 16,
      "title": "The Rise of E-Learning Platforms",
      "content": "Why e-learning platforms are gaining so much popularity and how they are transforming the educational landscape. This post explores the benefits of online education, such as convenience, accessibility, and affordability, as well as the challenges of maintaining student engagement and course quality. It also compares top e-learning platforms and their unique features.",
      "author": "James Ford",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "30 April 2024"
    },
    {
      "id": 17,
      "title": "Artificial Intelligence and Ethics",
      "content": "This post explores the ethical concerns surrounding the rise of artificial intelligence. It looks at key topics such as privacy issues, bias in AI algorithms, and the potential for AI to replace human jobs. The blog also discusses the need for AI regulations and the ethical responsibilities of developers and companies creating AI systems.",
      "author": "Lucas Moore",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "5 May 2024"
    },
    {
      "id": 18,
      "title": "Quantum Computing: The Next Frontier",
      "content": "An introduction to quantum computing and its potential to revolutionize industries like cryptography, medicine, and artificial intelligence. This post explains the basic principles of quantum mechanics, the difference between classical and quantum computing, and how quantum algorithms could change how we solve complex problems.",
      "author": "Elena Green",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "10 May 2024"
    },
    {
      "id": 19,
      "title": "The Importance of Emotional Intelligence in Leadership",
      "content": "This post discusses how emotional intelligence (EQ) is a critical trait for effective leadership. It covers the components of EQ such as self-awareness, empathy, and emotional regulation, and explores how leaders can develop these skills to improve team dynamics, enhance decision-making, and build strong relationships.",
      "author": "Hannah Clark",
      "category": "Business",
      "image": "assets/blog_image.jpeg",
      "date": "15 May 2024"
    },
    {
      "id": 20,
      "title": "How to Improve Your Digital Literacy",
      "content": "In today's digital age, digital literacy is essential for navigating the internet, using technology effectively, and making informed decisions. This post covers the core skills needed to improve digital literacy, including critical thinking, media literacy, and the ability to use digital tools responsibly and securely.",
      "author": "Olivia Brooks",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "20 May 2024"
    },
    {
      "id": 21,
      "title": "Exploring Augmented Reality in Education",
      "content": "Augmented Reality (AR) is changing the way we interact with information and learning materials. This post explains how AR can be used in classrooms to create immersive learning experiences, from virtual field trips to interactive simulations. It also looks at some of the challenges and opportunities AR presents for educators.",
      "author": "David King",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "25 May 2024"
    },
    {
      "id": 22,
      "title": "The Impact of Social Media on Mental Health",
      "content": "This post discusses the growing concern about the effects of social media on mental health. It explores the positive aspects, such as staying connected with others and building communities, as well as the negative effects, such as increased anxiety, depression, and the impact of social comparison.",
      "author": "Sarah Miller",
      "category": "Health",
      "image": "assets/blog_image.jpeg",
      "date": "30 May 2024"
    },
    {
      "id": 23,
      "title": "The Role of AI in Personalized Learning",
      "content": "Artificial Intelligence is being used to create personalized learning experiences for students. This post explains how AI can analyze student performance and tailor educational content to meet individual needs. It also discusses the potential benefits and challenges of using AI to improve learning outcomes.",
      "author": "Daniel Green",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "5 June 2024"
    },
    {
      "id": 24,
      "title": "The Future of Virtual Reality in Education",
      "content": "Virtual Reality (VR) is poised to revolutionize education by creating immersive learning environments. This post discusses the applications of VR in education, such as virtual labs, historical reenactments, and interactive simulations. It also explores the challenges and barriers to widespread adoption of VR in schools and universities.",
      "author": "Grace Thompson",
      "category": "Education",
      "image": "assets/blog_image.jpeg",
      "date": "10 June 2024"
    },
    {
      "id": 25,
      "title": "Building Resilience Through Mindfulness",
      "content": "Mindfulness practices can help individuals develop resilience in the face of adversity. This post explores how mindfulness techniques such as meditation, breathing exercises, and mindful reflection can help people manage stress, increase focus, and build emotional resilience.",
      "author": "Rachel Harris",
      "category": "Health",
      "image": "assets/blog_image.jpeg",
      "date": "15 June 2024"
    },
    {
      "id": 26,
      "title": "The Role of AI in Customer Experience",
      "content": "AI is transforming customer service by enabling more personalized experiences and improving customer satisfaction. This post explores how AI-powered chatbots, recommendation systems, and sentiment analysis are being used to enhance customer service across industries.",
      "author": "Michael Anderson",
      "category": "Business",
      "image": "assets/blog_image.jpeg",
      "date": "20 June 2024"
    },
    {
      "id": 27,
      "title": "The Ethics of Autonomous Vehicles",
      "content": "Autonomous vehicles (AVs) promise to reshape transportation, but they also raise ethical questions. This post explores the ethical dilemmas associated with AVs, such as decision-making in emergency situations, liability for accidents, and the implications for employment in the transportation industry.",
      "author": "Samuel Jones",
      "category": "Technology",
      "image": "assets/blog_image.jpeg",
      "date": "25 June 2024"
    },
    {
      "id": 28,
      "title": "Harnessing the Power of Data Analytics in Marketing",
      "content": "Data analytics is playing a critical role in modern marketing strategies. This post explains how companies use data to optimize marketing campaigns, target specific customer segments, and improve decision-making. It also looks at key tools and techniques used in data-driven marketing.",
      "author": "Isabel Lee",
      "category": "Business",
      "image": "assets/blog_image.jpeg",
      "date": "30 June 2024"
    },
    {
      "id": 29,
      "title": "The Importance of Sustainability in Business",
      "content": "Sustainability is becoming a key focus for businesses around the world. This post covers the benefits of sustainable business practices, such as reduced costs, improved brand reputation, and positive environmental impact. It also provides strategies for integrating sustainability into business operations.",
      "author": "Jonathan Scott",
      "category": "Business",
      "image": "assets/blog_image.jpeg",
      "date": "5 July 2024"
    },
    {
      "id": 30,
      "title": "How to Cultivate a Growth Mindset",
      "content": "This post discusses the importance of developing a growth mindset in order to overcome challenges and achieve success. It explores how individuals can shift their mindset from a fixed to a growth perspective, emphasizing the value of persistence, learning from failure, and embracing challenges.",
      "author": "Lily Turner",
      "category": "Personal Development",
      "image": "assets/blog_image.jpeg",
      "date": "10 July 2024"
    }
  ]
  paginatedBlogs: any[] = [];
  length = 30;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 7, 10];

  ngOnInit() {
    this.paginatedBlogs = this.blogs.slice(0, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedBlogs = this.blogs.slice(startIndex, endIndex);
  }
}

