import { Page, Text, View } from '@react-pdf/renderer';
import React from 'react';
import { ICvPatternProps } from '../CvPattern/CvPattern.interface';
import { styles } from './CvPatternDownload.styles';

export const CvPatternDownload = ({ data }: ICvPatternProps) => {
  return (
    <Page size="A4" style={styles.pageDownload}>
      <View style={styles.employeeInfo}>
        <View>
          <Text break style={styles.fullname}>
            {data?.user?.profile?.full_name?.toUpperCase() || 'Employee name'}
          </Text>
          <Text break style={styles.position}>
            {data?.user?.position_name || 'Position'}
          </Text>
        </View>
        <View style={styles.right}>
          <Text style={styles.subtitle}>Contacts:</Text>
          <Text style={styles.contacts}>{'Email: ' + data?.user?.email}</Text>
          <Text style={styles.subtitle}>Main skills:</Text>
          {data?.skills?.map((skill) => (
            <Text key={skill.skill_name} style={styles.text}>
              {skill?.skill_name + ' -  ' + skill?.mastery}
            </Text>
          ))}
          <View>
            <Text style={styles.subtitle}>Language:</Text>
            {data?.languages?.map((language) => (
              <Text key={language.language_name} style={styles.text}>
                {language?.language_name + ' - ' + language?.proficiency.toUpperCase()}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <Text style={styles.projectsTitle}>Projects:</Text>
      <View>
        {data?.projects?.map((project) => (
          <View style={styles.project} key={project.internal_name}>
            <View style={styles.projectSummary}>
              <Text style={styles.projectName}>{project.name.toUpperCase() || 'Project name'}</Text>
              <Text style={styles.dateTitle}>Period:</Text>
              <Text style={styles.projectInfo}>
                {project?.start_date} - {project?.end_date || 'Till now'}
              </Text>
              <Text style={styles.dateTitle}>Domain:</Text>
              <Text style={styles.projectInfo}> {project?.domain}</Text>
            </View>
            <Text style={styles.projectDescription}>{project?.description}</Text>
          </View>
        ))}
      </View>
    </Page>
  );
};
