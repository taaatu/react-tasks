import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {
  Avatar,
  ButtonGroup,
  ListItem as NBListItem,
} from 'react-native-elements';
import {useMedia} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {Alert} from 'react-native';

const ListItem = ({navigation, singleMedia, myFilesOnly}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);
  const doDelete = () => {
    Alert.alert('Delete', 'this file permanently', [
      {text: 'Cancel'},
      {
        text: 'OK',
        onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await deleteMedia(singleMedia.file_id, token);
            response && setUpdate(update + 1);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };
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

      {myFilesOnly && (
        <ButtonGroup
          containerStyle={{width: 150}}
          onPress={(index) => {
            if (index === 0) {
              navigation.navigate('Modify', {file: singleMedia});
            } else if (index === 1) {
              doDelete();
            } else {
              navigation.navigate('Single', {file: singleMedia});
            }
          }}
          buttons={['Modify', 'Delete', 'View']}
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
