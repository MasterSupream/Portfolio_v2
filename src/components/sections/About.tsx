'use client';

import { motion } from 'framer-motion';
import { Download, Calendar, MapPin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';

const About = () => {

  const handleDownloadResume = () => {
    // Create a temporary link to download resume
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // This would be the actual resume file
    link.download = 'Anuvesh_Chilwal_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="min-h-screen flex items-center py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A passionate student exploring the endless possibilities of technology and software development
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Biography Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >


              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Hello! I&apos;m Anuvesh Chilwal, a passionate student with a deep fascination for AI/ML, 
                  web development, and everything related to software. My journey in technology is driven 
                  by an insatiable curiosity and a desire to understand how digital solutions can make 
                  a meaningful impact in the world.
                </p>
                
                <p>
                  I&apos;m currently exploring various domains including artificial intelligence, machine learning, 
                  and full-stack web development. Through hands-on projects like ChordCircle, Whitezilla, 
                  and Veshara, I&apos;m constantly learning and pushing the boundaries of what I can create 
                  with code.
                </p>
                
                <p>
                  What drives me is curiosity and a deep interest in the software and technology field. 
                  My career goal is to unlock all my potential and display it to the world for helping others. 
                  I believe that technology should be a force for good, and I&apos;m committed to building 
                  solutions that make a positive difference.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  onClick={handleDownloadResume}
                  variant="primary"
                  className="flex items-center gap-2"
                >
                  <Download size={18} />
                  Download Resume
                </Button>
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Mail size={18} />
                  Get In Touch
                </Button>
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin size={16} className="text-blue-500" />
                  <span>Remote & Onsite</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar size={16} className="text-blue-500" />
                  <span>Student & Aspiring Developer</span>
                </div>
              </div>
            </motion.div>

            {/* Learning Journey */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold mb-6">Learning Journey</h3>
              
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto">
                      <Calendar size={24} className="text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      Currently Learning & Building
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      As a passionate student, I&apos;m focused on building practical projects and expanding 
                      my knowledge in AI/ML, web development, and software engineering. Each project 
                      is a stepping stone in my journey to become a skilled developer.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h5 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">Focus Areas</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• AI/ML Development</li>
                          <li>• Full Stack Web Development</li>
                          <li>• Software Engineering</li>
                        </ul>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <h5 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">Current Projects</h5>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <li>• ChordCircle (Music Platform)</li>
                          <li>• Whitezilla (Collaborative Tool)</li>
                          <li>• KSA (AI Assistant)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;