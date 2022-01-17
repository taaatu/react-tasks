import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import GlobalStyles from '../utils/GlobalStyles';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={GlobalStyles.item}>
      <View style={GlobalStyles.imageBox}>
        <Image
          source={{uri: uploadsUrl + props.singleMedia.thumbnails.w160}}
          style={GlobalStyles.image}
        />
      </View>
      <View style={GlobalStyles.textBox}>
        <Text style={GlobalStyles.title}>{props.singleMedia.title}</Text>
        <Text style={GlobalStyles.description}>
          {props.singleMedia.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
};

export default ListItem;
