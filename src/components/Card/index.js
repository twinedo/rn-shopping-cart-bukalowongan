import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';
import {WHITE} from '../../styles/colors';

const Card = props => {
  const {children} = props;
  return (
    <Pressable
      {...props}
      style={[
        globalStyles.row,
        globalStyles.horizontalDefaultPadding,
        globalStyles.verticalDefaultPadding,
        styles.container,
      ]}>
      {children}
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    elevation: 5,
    borderRadius: 3,
  },
});
