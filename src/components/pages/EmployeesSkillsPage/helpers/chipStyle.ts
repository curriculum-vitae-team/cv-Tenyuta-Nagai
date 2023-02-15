export const chipStyle = (mastery: string) => {
  switch (mastery) {
    case 'novice':
      return 'orange';
    case 'advanced':
      return '#6685F0';
    case 'expert':
      return 'green';
    default:
      return 'gray';
  }
};
