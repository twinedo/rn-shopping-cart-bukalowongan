import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {globalStyles} from '../../styles/globalStyles';

const Buttons = props => {
  const {onPress, children, backgroundColor} = props;
  return (
    <Pressable
      {...props}
      style={[
        globalStyles.horizontalDefaultPadding,
        globalStyles.verticalDefaultPadding,
        globalStyles.justifyCenter,
        globalStyles.alignCenter,
        styles.buttons,
        {backgroundColor: backgroundColor},
      ]}
      onPress={onPress}>
      {children}
    </Pressable>
  );
};

export default Buttons;

const styles = StyleSheet.create({
  buttons: {borderRadius: 5},
});
