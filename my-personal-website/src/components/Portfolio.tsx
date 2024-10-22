'use client'

import React from 'react'
import { Github, Linkedin, Mail, ExternalLink, Award, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import lcwImage from '../app/images/LCW.jpeg'

export default function Portfolio() {
  const personalInfo = {
    name: 'Lee Chen Wei (Luis)',
    title: 'Year 3 Computer Science Student at University Malaya',
    email: 'LuisLCW02@gmail.com',
    github: 'https://github.com/leechenwei',
    linkedin: 'https://www.linkedin.com/in/luislcw02/',
    photoUrl: lcwImage,
  }

  const projects = [
    {
      title: 'UMHack-2023 Pregnancy App',
      description: 'A brief description of project 1',
      link: 'https://github.com/yiwan-21/umh23-pregnancy',
      techs: ['Dart', 'Python', 'C++', 'Machine Learning']
    },
    {
      title: 'FinFreedom',
      description: 'FinFreedom is a cutting-edge financial management app designed to empower users to take control of their financial future. Developed with the mission to enhance financial literacy and promote responsible financial practices, FinFreedom offers a comprehensive suite of tools and features to guide users on their journey towards financial freedom. With AI-driven budgeting, investment insights, and a reward system, FinFreedom makes managing finances easy and rewarding. Our subscription model offers premium features, while B2B partnerships and advertising generate revenue. Stand out with FinFreedom and unlock your path to financial freedom today.',
      link: 'https://github.com/SJWONG27/FinFreedom',
      techs: ['ReactNative', 'Javascript', 'Firebase']
    },
    {
      title: 'Stroke Risk Predictor',
      description: 'A brief description of project 3',
      link: 'https://github.com/leechenwei/Stroke-Risk-Predictor',
      techs: ['R', 'Machine Learning', 'Kaggle']
    },
  ]

  const awards = [
    { title: 'Dell Hack2Hire Honorable Mention Award', year: '2023' },
    { title: 'UMHackathon 2023 Second-Runner Up Domain: Healthcare', year: '2023' },
    { title: 'Programming League National 2023 University Malaya Second-Runner Up (Competitive Programming)', year: '2023'},
    { title: 'Y2S2 Dean\'s List', year: '2024' }, // Escape single quote
    { title: 'Y2S1 Dean\'s List', year: '2023/2024' }, // Escape single quote
    { title: 'Y1S1 Dean\'s List', year: '2022/2023' }, // Escape single quote
  ];
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-cyan-500 to-green-500 dark:from-blue-900 dark:via-cyan-900 dark:to-green-900 py-8">
      <main className="container mx-auto px-4">
        <header className="text-center mb-12 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 shadow-lg transition-transform transform hover:scale-105">
          <div className="mb-6 flex justify-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <Image
                src={personalInfo.photoUrl}
                alt={personalInfo.name}
                layout='fill'
                objectFit="cover"
                style={{ transform: 'scale(2.5)' }}
              />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2 text-white animate-fade-in">{personalInfo.name}</h1>
          <p className="text-xl text-white mb-4">{personalInfo.title}</p>
          <div className="flex justify-center space-x-4">
            {[
              { href: personalInfo.github, icon: <Github className="h-4 w-4" />, label: 'GitHub' },
              { href: personalInfo.linkedin, icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn' },
              { href: `mailto:${personalInfo.email}`, icon: <Mail className="h-4 w-4" />, label: 'Email' },
            ].map(({ href, icon, label }) => (
              <Button key={label} variant="secondary" size="icon" asChild>
                <a href={href} target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                  {icon}
                  <span className="sr-only">{label}</span>
                </a>
              </Button>
            ))}
          </div>
        </header>

        <Tabs defaultValue="about" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg">
            {['about', 'projects', 'awards', 'resume'].map(tab => (
              <TabsTrigger key={tab} value={tab} className="text-white data-[state=active]:bg-white data-[state=active]:text-blue-600 transition-transform transform hover:scale-105">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="about" className="mt-6">
            <Card className="bg-white bg-opacity-10 backdrop-blur-md text-white border-none transition-transform transform hover:scale-105">
              <CardHeader>
                <CardTitle>About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                Hello! I'm Lee Chen Wei, also known as Luis, from Klang, Selangor, Malaysia. I'm currently a Year 3 Bachelor of Computer Science (AI) student at the University of Malaya, and I'm interning as a Software Engineer Intern at Dell Technologies in Cyberjaya.

                My interests include machine learning, model training, and cybersecurity. I have participated in several hackathons, earning a few accolades along the way. I’m passionate about continuously learning new technologies to stay abreast of rapid advancements in the field. I’m also looking forward to engaging in Capture The Flag (CTF) challenges and writing about cybersecurity topics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project, index) => (
                <Card key={index} className="bg-white bg-opacity-10 backdrop-blur-md text-white border-none">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="text-gray-200">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.techs.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="bg-blue-500 text-white">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="secondary" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View Project <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="awards" className="mt-6">
            <Card className="bg-white bg-opacity-10 backdrop-blur-md text-white border-none transition-transform transform hover:scale-105">
              <CardHeader>
                <CardTitle>Awards & Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {awards.map((award, index) => (
                    <li key={index} className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-yellow-400" />
                      <span>{award.title} - {award.year}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resume" className="mt-6">
            <Card className="bg-white bg-opacity-10 backdrop-blur-md text-white border-none transition-transform transform hover:scale-105">
              <CardHeader>
                <CardTitle>Resume</CardTitle>
              </CardHeader>
              <CardContent>
                <p>You can view or download my resume using the button below:</p>
              </CardContent>  
              <CardFooter>
                <Button variant="secondary" asChild>
                  <a href="https://drive.google.com/file/d/1IxwMkFKlixoO_QoJBZDW8WoyllBVOc9O/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
                    View Resume <BookOpen className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
