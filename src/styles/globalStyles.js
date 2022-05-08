import {StyleSheet} from 'react-native';
import {BLACK} from './colors';

export const globalStyles = StyleSheet.create({
  row: {flexDirection: 'row'},
  horizontalDefaultPadding: {paddingHorizontal: 10},
  verticalDefaultPadding: {paddingVertical: 10},
  horizontalDefaultMargin: {marginHorizontal: 10},
  verticalDefaultMargin: {marginVertical: 10},
  alignCenter: {alignItems: 'center'},
  alignStart: {alignItems: 'flex-start'},
  justifyCenter: {justifyContent: 'center'},
  justifySpaceBetween: {justifyContent: 'space-between'},
  justifySpaceAround: {justifyContent: 'space-around'},
  justifyEvenly: {justifyContent: 'space-evenly'},
  justifyStart: {justifyContent: 'flex-start'},
  justifyEnd: {justifyContent: 'flex-end'},
  flex1: {flex: 1},
  flex2: {flex: 2},
  flex3: {flex: 3},

  headingBold: {
    h1: {fontSize: 18, fontWeight: 'bold', color: BLACK},
    h2: {fontSize: 16, fontWeight: 'bold', color: BLACK},
    h3: {fontSize: 14, fontWeight: 'bold', color: BLACK},
  },
  headingRegular: {
    h1: {fontSize: 18, fontWeight: 'normal', color: BLACK},
    h2: {fontSize: 16, fontWeight: 'normal', color: BLACK},
    h3: {fontSize: 14, fontWeight: 'normal', color: BLACK},
  },
});
