import { StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: require('../../../../../public/fonts/Roboto-Regular.ttf'),
      fontWeight: 400,
    },
    {
      src: require('../../../../../public/fonts/Roboto-Bold.ttf'),
      fontWeight: 700,
    },
  ],
});

export const styles = StyleSheet.create({
  pageDownload: {
    padding: '25px 50px',
    fontFamily: 'Roboto',
  },
  right: {
    height: '100%',
    marginTop: '35px',
    maxWidth: '300px',
  },
  left: { maxWidth: '220px', marginRight: '10px' },
  fullname: {
    marginTop: '20px',
    fontSize: '30px',
    fontWeight: 'bold',
  },
  position: {
    fontSize: '20px',
  },
  projectsTitle: {
    fontWeight: 'bold',
    fontSize: '24px',
  },
  project: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: '30px',
  },
  projectSummary: {
    width: '100%',
  },
  employeeInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginTop: '20px',
  },
  dateTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  projectName: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  projectInfo: {
    fontSize: '16px',
  },
  text: {
    fontSize: '18px',
    wordBreak: 'normal',
  },
  projectDescription: {
    fontSize: '18px',
    width: '100%',
  },
  rightText: {
    fontSize: '10px',
  },
  redline: {
    width: '100%',
    height: '2px',
    backgroundColor: '#c63031',
    borderRadius: '10px',
  },
  redline2: {
    width: '2px',
    backgroundColor: '#c63031',
    borderRadius: '10px',
    margin: '0 10px',
  },
});
