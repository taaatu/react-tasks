import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Card, Text} from 'react-native-elements';

const Single = ({route}) => {
  const {file} = route.params;
  return (
    <Card>
      <Card.Image
        source={{uri: uploadsUrl + file.filename}}
        style={{width: '90%', height: '70%'}}
        resizeMode="contain"
      ></Card.Image>
      <Card.Title h4>{file.title}</Card.Title>
      <Text>{file.description}</Text>
      <Card.Divider />
    </Card>
  );
};

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
