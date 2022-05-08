import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {globalStyles} from '../../styles/globalStyles';
import {GRAY, WHITE} from '../../styles/colors';

const Toolbar = props => {
  const {prefix, postfix, title, contentStyle} = props;
  return (
    <View
      style={[
        globalStyles.verticalDefaultPadding,
        globalStyles.horizontalDefaultPadding,
        globalStyles.justifyCenter,
        styles.container,
      ]}>
      <View style={globalStyles.justifyStart}>{prefix}</View>
      <View
        style={[
          globalStyles.flex1,
          globalStyles.justifyCenter,
          globalStyles.alignStart,
          contentStyle,
        ]}>
        <Text style={globalStyles.headingRegular.h1}>{title}</Text>
      </View>
      <View style={globalStyles.justifyEnd}>{postfix}</View>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    height: 45,
    borderBottomWidth: 1,
    borderBottomColor: GRAY,
    elevation: 10,
  },
});

Toolbar.propTypes = {
  prefix: PropTypes.element,
  postfix: PropTypes.element,
  title: PropTypes.string,
  contentStyle: PropTypes.object,
};
