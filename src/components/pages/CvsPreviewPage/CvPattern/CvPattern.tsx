import { Box, Typography } from '@mui/material';
import React from 'react';
import { ICvPatternProps } from './CvPattern.interface';
import * as Styled from './CvPattern.styles';

export const CvPattern = ({ data }: ICvPatternProps) => {
  return (
    <Styled.PaperCV>
      <Styled.EmployeeBox>
        <Box>
          <Styled.FullName>
            {data?.user?.profile?.full_name?.toUpperCase() || 'Employee name'}
          </Styled.FullName>
          <Typography sx={{ fontSize: '20px' }}>
            {data?.user?.position_name || 'Position'}
          </Typography>
        </Box>
        <Box sx={{ height: '100%', mt: '35px' }}>
          <Styled.Subtitle>Contacts:</Styled.Subtitle>
          {data?.user?.email && (
            <Typography sx={{ fontSize: '18px' }}>{'Email: ' + data?.user?.email}</Typography>
          )}
          <Styled.Subtitle>Main skills:</Styled.Subtitle>
          {data?.skills?.map((skill) => (
            <Typography key={skill.skill_name} sx={{ fontSize: '18px' }}>
              {skill?.skill_name + ' -  ' + skill?.mastery}
            </Typography>
          ))}
          <Box>
            <Styled.Subtitle>Language:</Styled.Subtitle>
            {data?.languages?.map((language) => (
              <Typography key={language.language_name} sx={{ fontSize: '18px' }}>
                {language?.language_name + ' - ' + language?.proficiency.toUpperCase()}
              </Typography>
            ))}
          </Box>
        </Box>
      </Styled.EmployeeBox>
      <Typography sx={{ fontWeight: 'bold', fontSize: '24px' }}>Projects:</Typography>
      <Box>
        {data?.projects?.map((project) => (
          <Styled.ProjectBox key={project.internal_name}>
            <Box sx={{ width: '100%' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                {project.name.toUpperCase() || 'Project name'}
              </Typography>
              <Styled.SmallSubtitle>Period:</Styled.SmallSubtitle>
              <Typography sx={{ fontSize: '16px' }}>
                {project?.start_date} - {project?.end_date || 'Till now'}
              </Typography>
              <Styled.SmallSubtitle>Domain:</Styled.SmallSubtitle>
              <Typography sx={{ fontSize: '16px' }}> {project?.domain}</Typography>
            </Box>
            <Box sx={{ fontSize: '18px', width: '100%' }}>{project?.description}</Box>
          </Styled.ProjectBox>
        ))}
      </Box>
    </Styled.PaperCV>
  );
};
