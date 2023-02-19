import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    padding: '25px 50px',
    backgroundColor: '#E4E4E4',
    minHeight: '1127px',
    width: '707px',
  },
  sectionRight: {
    height: '100%',
    marginTop: '25px',
  },
  fullname: {
    fontWeight: 'bold',
    marginTop: '20px',
    fontSize: '30px',
  },
  position: {
    fontSize: '20px',
  },
  experience: {
    marginLeft: '25px',
    fontWeight: 'bold',
    fontSize: '24px',
  },
  projects: {
    marginLeft: 25,
  },
  project: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flex: {
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
  date: {
    fontSize: '10px',
    marginTop: '6px',
  },
  text: {
    fontSize: '18px',
  },
  projectRight: {
    width: '270px',

    marginRight: 25,
  },
  projectText: {
    fontSize: '18px',
  },
  rightText: {
    fontSize: '10px',
  },
});
