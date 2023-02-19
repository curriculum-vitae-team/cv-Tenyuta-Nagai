import { Document, Page, View, Text } from '@react-pdf/renderer';
import React from 'react';
import { ICvPatternProps } from './CvPattern.interface';
import { styles } from './CvPattern.styles';

export const CvPattern = ({ data }: ICvPatternProps) => {
  console.log(data?.projects);
  //const { user, projects, languages, skills } = data;

  return (
    <div style={styles.page}>
      <div style={styles.flex}>
        <div>
          <div style={styles.fullname}>
            {data?.user?.profile?.full_name?.toUpperCase() || 'Employee name'}
          </div>
          <div style={styles.position}>{data?.user?.position_name || 'Position'}</div>
        </div>
        <div style={styles.sectionRight}>
          <div style={styles.subtitle}>Contacts:</div>
          <div style={styles.contacts}>{'Email: ' + data?.user?.email}</div>
          <div style={styles.subtitle}>Programming Technologies:</div>
          {data?.skills?.map((skill) => (
            <div key={skill.skill_name} style={styles.text}>
              {skill?.skill_name + ' -  ' + skill?.mastery}
            </div>
          ))}
          <div>
            <div style={styles.subtitle}>Language proficiency</div>
            {data?.languages?.map((language) => (
              <div key={language.language_name} style={styles.text}>
                {language?.language_name + ' - ' + language?.proficiency.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={styles.experience}>Projects:</div>
      <div style={styles.projects}>
        {data?.projects?.map((project) => (
          <div style={styles.project} key={project.internal_name}>
            <div>
              <div style={styles.subtitle}>{project.name || 'Project name'}</div>
              <div style={styles.text}>
                {project?.start_date + ' - ' + project?.end_date || 'Till now'}
              </div>
              <div style={styles.text}>Team Size - {project?.team_size}</div>
            </div>
            <div style={styles.projectRight}>
              <div style={styles.projectText}>
                Project ProjectProjectProject Project ProjectProject
              </div>
            </div>
            <div>
              <div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
