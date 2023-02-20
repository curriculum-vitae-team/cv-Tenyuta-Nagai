import { Page } from '@react-pdf/renderer';
import React from 'react';
import { ICvPatternProps } from './CvPattern.interface';
import { styles } from './CvPattern.styles';

export const CvPattern = ({ data }: ICvPatternProps) => {
  return (
    <div style={styles.page}>
      <div style={styles.employeeInfo}>
        <div>
          <div style={styles.fullname}>
            {data?.user?.profile?.full_name?.toUpperCase() || 'Employee name'}
          </div>
          <div style={styles.position}>{data?.user?.position_name || 'Position'}</div>
        </div>
        <div style={styles.right}>
          <div style={styles.subtitle}>Contacts:</div>
          {data?.user?.email && <div style={styles.contacts}>{'Email: ' + data?.user?.email}</div>}
          <div style={styles.subtitle}>Main skills:</div>
          {data?.skills?.map((skill) => (
            <div key={skill.skill_name} style={styles.text}>
              {skill?.skill_name + ' -  ' + skill?.mastery}
            </div>
          ))}
          <div>
            <div style={styles.subtitle}>Language:</div>
            {data?.languages?.map((language) => (
              <div key={language.language_name} style={styles.text}>
                {language?.language_name + ' - ' + language?.proficiency.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={styles.projectsTitle}>Projects:</div>
      <div>
        {data?.projects?.map((project) => (
          <div style={styles.project} key={project.internal_name}>
            <div style={styles.projectSummary}>
              <div style={styles.projectName}>{project.name.toUpperCase() || 'Project name'}</div>
              <div style={styles.dateTitle}>Period:</div>
              <div style={styles.projectInfo}>
                {project?.start_date} - {project?.end_date || 'Till now'}
              </div>
              <div style={styles.dateTitle}>Domain:</div>
              <div style={styles.projectInfo}> {project?.domain}</div>
            </div>
            <div style={styles.projectDescription}>
              Project ProjectProjectProject Project ProjectProject Project ProjectProject Project
              ProjectProjectProject
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
