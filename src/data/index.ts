// Export all data and validation functions
export * from './projects';
export * from './skills';
export * from './experience';

// Import validation functions
import { validateProjects } from './projects';
import { validateSkills } from './skills';
import { validateExperiences } from './experience';

// Run all validations and log results
export const validateAllData = (): boolean => {
  console.log('🔍 Validating portfolio data...');
  
  const projectsValid = validateProjects();
  const skillsValid = validateSkills();
  const experiencesValid = validateExperiences();
  
  if (projectsValid) {
    console.log('✅ Projects data validation passed');
  } else {
    console.error('❌ Projects data validation failed');
  }
  
  if (skillsValid) {
    console.log('✅ Skills data validation passed');
  } else {
    console.error('❌ Skills data validation failed');
  }
  
  if (experiencesValid) {
    console.log('✅ Experience data validation passed');
  } else {
    console.error('❌ Experience data validation failed');
  }
  
  const allValid = projectsValid && skillsValid && experiencesValid;
  
  if (allValid) {
    console.log('🎉 All portfolio data validation passed!');
  } else {
    console.error('💥 Some portfolio data validation failed!');
  }
  
  return allValid;
};

// Export summary statistics
export const getDataSummary = () => {
  return {
    projects: {
      total: 6,
      featured: 3,
      categories: ['web', 'mobile', 'desktop', 'api'],
    },
    skills: {
      total: 28,
      categories: ['frontend', 'backend', 'tools', 'design'],
      averageLevel: 84,
    },
    experience: {
      total: 4,
      totalYears: 6,
      currentPosition: 'Senior Full Stack Developer',
    },
  };
};