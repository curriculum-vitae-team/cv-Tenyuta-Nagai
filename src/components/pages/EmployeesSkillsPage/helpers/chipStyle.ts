export const chipStyle = (mastery: string) => {
  switch (mastery) {
    case 'novice':
      return '#DC143C';
    case 'advanced':
      return 'orange';
    case 'competent':
      return 'gold';
    case 'proficient':
      return '#32CD32';
    case 'expert':
      return 'green';
    default:
      return 'gray';
  }
};
