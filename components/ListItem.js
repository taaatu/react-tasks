import React from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  Button,
  ButtonGroup,
  ListItem as NBListItem,
} from 'react-native-elements';

const ListItem = ({navigation, singleMedia, myFilesOnly}) => {
  return (
    <NBListItem bottomDivider>
      <Avatar
        size="large"
        source={{uri: uploadsUrl + singleMedia.thumbnails.w160}}
      ></Avatar>
      <NBListItem.Content>
        <NBListItem.Title h4>{singleMedia.title}</NBListItem.Title>
        <NBListItem.Subtitle>{singleMedia.description}</NBListItem.Subtitle>
      </NBListItem.Content>
      <Button
        onPress={() => {
          navigation.navigate('Single', {file: singleMedia});
        }}
        title={'View'}
        containerStyle={{width: 90}}
      />
      {myFilesOnly && (
        <ButtonGroup
          onPress={(index) => {
            if (index === 0) {
              navigation.navigate('Modify', {});
            } else {
            }
          }}
          buttons={['Modify', 'Delete']}
        />
      )}
    </NBListItem>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  myFilesOnly: PropTypes.bool,
};

export default ListItem;
