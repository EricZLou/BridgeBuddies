export const RESIZE_SCREEN = 'RESIZE_SCREEN';

export const resizeScreen = ({height, width}) => ({
  type: RESIZE_SCREEN,
  size: {height: height, width: width},
});
