import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';

const ListItem = ({navigation, singleMedia}) => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        navigation.navigate('Single', {file: singleMedia});
      }}
    >
      <View style={styles.imageBox}>
        <Image
          source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
          style={styles.image}
        />
      </View>
      <View style={styles.textBox}>
        <Text style={styles.title}>{singleMedia.title}</Text>
        <Text>{singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 5,
  },
  imageBox: {
    flex: 2,
  },
  image: {
    flex: 2,
  },
  textBox: {
    flex: 3,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 3,
  },
});

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default ListItem;
