export const ActionsMenuRowProps = {
  minWidth: 100,
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,

  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 10,
    width: 10,
    height: 8,
    backgroundColor: 'background.paper',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
};

export const ActionsMenuRowItemProps = {
  height: '25px',
};

export const ActionsMenuRowIconsProps = {
  mr: 1,
  color: 'secondary.contrastText',
};
