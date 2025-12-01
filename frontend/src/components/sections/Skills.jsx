import React from 'react';
import { motion } from 'framer-motion';
import { 
  IoLogoReact, 
  IoLogoNodejs, 
  IoServer,
  IoShieldCheckmark,
  IoCode
} from 'react-icons/io5';

const Skills = () => {
  const skillCategories = [
    {
      name: 'Frontend',
      icon: IoLogoReact,
      color: 'from-blue-600 to-cyan-600',
      skills: [
        { name: 'React / Next.js', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Framer Motion', level: 80 },
      ]
    },
    {
      name: 'Backend',
      icon: IoLogoNodejs,
      color: 'from-green-600 to-emerald-600',
      skills: [
        { name: 'Node.js / Express', level: 90 },
        { name: '.NET Core', level: 85 },
        { name: 'REST APIs', level: 95 },
        { name: 'GraphQL', level: 75 },
      ]
    },
    {
      name: 'Database',
      icon: IoServer,
      color: 'from-purple-600 to-pink-600',
      skills: [
        { name: 'MongoDB', level: 90 },
        { name: 'PostgreSQL', level: 85 },
        { name: 'Redis', level: 75 },
        { name: 'MySQL', level: 80 },
      ]
    },
    {
      name: 'Security',
      icon: IoShieldCheckmark,
      color: 'from-red-600 to-orange-600',
      skills: [
        { name: 'OWASP Top 10', level: 85 },
        { name: 'JWT / OAuth', level: 90 },
        { name: 'Penetration Testing', level: 75 },
        { name: 'Security Audits', level: 80 },
      ]
    },
    {
      name: 'DevOps & Tools',
      icon: IoCode,
      color: 'from-yellow-600 to-amber-600',
      skills: [
        { name: 'Git / GitHub', level: 95 },
        { name: 'Docker', level: 80 },
        { name: 'CI/CD', level: 75 },
        { name: 'Linux', level: 85 },
      ]
    },
  ];

  const techStack = [
    'React', 'Node.js', 'MongoDB', 'Express',
    'TypeScript', '.NET Core', 'Tailwind CSS', 'PostgreSQL',
    'Docker', 'Git', 'Next.js', 'GraphQL'
  ];

  return (
    <section id="skills" className="py-32 bg-white dark:bg-dark-bg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30"></div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-mono text-primary-600 dark:text-primary-400 mb-4 block">
            /habilidades
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Stack Tecnológico
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Herramientas y tecnologías con las que trabajo
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mt-4"></div>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="group bg-gray-600 dark:bg-dark-card rounded-2xl p-8 border border-gray-200 dark:border-dark-border hover:border-primary-600 dark:hover:border-primary-400 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {category.name}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-600 dark:bg-dark-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1, 
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: "easeOut"
                        }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Principales Tecnologías
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="px-6 py-3 bg-gray-100 dark:bg-dark-surface text-gray-700 dark:text-gray-300 rounded-lg font-medium border border-gray-200 dark:border-dark-border hover:border-primary-600 dark:hover:border-primary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;