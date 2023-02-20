import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: '25px 50px',
    backgroundColor: '#E4E4E4',
    minHeight: '1127px',
    minWidth: '520px',
    width: '707px',
  },
  pageDownload: {
    padding: '25px 50px',
  },
  right: {
    height: '100%',
    marginTop: '35px',
  },
  fullname: {
    fontWeight: 'bold',
    marginTop: '20px',
    fontSize: '30px',
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
    alignItems: 'center',
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
    marginBottom: '80px',
  },
  contacts: {
    fontSize: '18px',
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
  },
  projectDescription: {
    fontSize: '18px',
    width: '100%',
  },
  rightText: {
    fontSize: '10px',
  },
});
