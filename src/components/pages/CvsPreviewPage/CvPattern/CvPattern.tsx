import { Document, Page, View, Text } from '@react-pdf/renderer';
import React from 'react';
import { ICvPatternProps } from './CvPattern.interface';
import { styles } from './CvPattern.styles';

export const CvPattern = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <div>
          <View>
            <Text>FULL NAME</Text>
            <Text>POSITION</Text>
          </View>
          <View>
            <Text>Email</Text>
            <Text>Skills</Text>

            <div>
              <Text>Languages</Text>
            </div>
          </View>
        </div>
        <Text>Experience</Text>
        <div>PROJECTS</div>
      </Page>
    </Document>
  );
};
