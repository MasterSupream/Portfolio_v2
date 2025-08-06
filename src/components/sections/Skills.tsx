'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { skillGroups, getAverageSkillLevel } from '@/data/skills';
import { Card, CardContent } from '@/components/ui/card';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { 
  Code2, 
  Server, 
  Wrench, 
  Palette,
  Star,
  Clock,
  TrendingUp
} from 'lucide-react';
import type { SkillGroup } from '@/lib/types';

const categoryIcons = {
  frontend: Code2,
  backend: Server,
  tools: Wrench,
  design: Palette,
};

const categoryLabels = {
  frontend: 'Frontend',
  backend: 'Backend', 
  tools: 'Tools & DevOps',
  design: 'Design & UX',
};

const categoryColors = {
  frontend: 'from-blue-500 to-cyan-500',
  backend: 'from-green-500 to-emerald-500',
  tools: 'from-purple-500 to-violet-500',
  design: 'from-pink-500 to-rose-500',
};

interface SkillBarProps {
  skill: {
    name: string;
    level: number;
    yearsOfExperience: number;
  };
  delay: number;
  color: string;
}

const SkillBar = ({ skill, delay, color }: SkillBarProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="space-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-between items-center">
        <span className="font-medium text-gray-900 dark:text-gray-100">
          {skill.name}
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock size={14} />
          <span>{skill.yearsOfExperience}y</span>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-yellow-500" />
            <span>{skill.level}%</span>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`h-full bg-gradient-to-r ${color} rounded-full relative`}
          >
            {/* Shine effect */}
            <motion.div
              animate={isHovered ? { x: ['-100%', '100%'] } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        </div>
        
        {/* Tooltip on hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-sm whitespace-nowrap z-10"
          >
            {skill.level}% proficiency • {skill.yearsOfExperience} years
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

interface SkillCategoryProps {
  group: SkillGroup;
  index: number;
}

const SkillCategory = ({ group, index }: SkillCategoryProps) => {
  const Icon = categoryIcons[group.category];
  const averageLevel = getAverageSkillLevel(group.category);
  const color = categoryColors[group.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-6">
          {/* Category Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${color} text-white group-hover:scale-110 transition-transform duration-300`}>
              <Icon size={24} />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {categoryLabels[group.category]}
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <TrendingUp size={14} />
                <span>Avg: {averageLevel}%</span>
                <span>•</span>
                <span>{group.skills.length} skills</span>
              </div>
            </div>
          </div>

          {/* Skills List */}
          <div className="space-y-4">
            {group.skills.map((skill, skillIndex) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                delay={index * 0.1 + skillIndex * 0.05}
                color={color}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredGroups = selectedCategory 
    ? skillGroups.filter(group => group.category === selectedCategory)
    : skillGroups;

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            A comprehensive overview of my technical skills and proficiency levels across different domains
          </p>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <LiquidButton
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="flex items-center gap-2"
            >
              All Skills
            </LiquidButton>
            {skillGroups.map((group) => {
              const Icon = categoryIcons[group.category];
              return (
                <LiquidButton
                  key={group.category}
                  variant={selectedCategory === group.category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(group.category)}
                  className="flex items-center gap-2"
                >
                  <Icon size={16} />
                  {categoryLabels[group.category]}
                </LiquidButton>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredGroups.map((group, index) => (
              <SkillCategory
                key={group.category}
                group={group}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Skills Overview
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {skillGroups.map((group) => {
                  const Icon = categoryIcons[group.category];
                  const averageLevel = getAverageSkillLevel(group.category);
                  const color = categoryColors[group.category];
                  
                  return (
                    <div key={group.category} className="text-center">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${color} text-white mb-3`}>
                        <Icon size={32} />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {categoryLabels[group.category]}
                      </h4>
                      <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {averageLevel}%
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {group.skills.length} skills
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;