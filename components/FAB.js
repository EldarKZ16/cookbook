import React, { Component } from 'react';
import { TouchableOpacity, Image, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    width: 70,
    height: 70,
  },
})

class FAB extends Component {
  handleScreen = () => {
    this.props.screen('addMenu');
  };
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={this.handleScreen}
        style={styles.touchableOpacityStyle}>
        <Image
          source={{
            uri:
              'https://reactnativecode.com/wp-content/uploads/2017/11/Floating_Button.png',
          }}
          style={styles.floatingButtonStyle}
        />
      </TouchableOpacity>
    );
  }
}

export default FAB;