import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, Card, ListItem, Text} from 'react-native-elements';
import {Video} from 'expo-av';
import {useFavourite, useTag, useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';

const Single = ({route}) => {
  const {file} = route.params;
  const videoRef = useRef(null);
  const {getUserById} = useUser();
  const {getFilesByTag} = useTag();
  const {postFavourite, getFavouritesByFileId, deleteFavourite} =
    useFavourite();
  const [owner, setOwner] = useState({username: 'fetching...'});
  const [avatar, setAvatar] = useState('http://placekitten.com/180');
  const [likes, setLikes] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const {user} = useContext(MainContext);

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setOwner(userData);
    } catch (error) {
      console.error('fetch owner error', error);
      setOwner({username: 'user not available'});
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      if (avatarArray.length === 0) {
        return;
      }
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error('fetch owner error', error);
      setOwner({username: 'user not available'});
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesByFileId(file.file_id);
      setLikes(likesData);
      likesData.forEach((like) => {
        like.user_id === user.user_id && setUserLike(true);
      });
    } catch (error) {
      console.error('fetchLikes() error', error);
    }
  };

  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file.file_id, token);
      response && setUserLike(true);
    } catch (error) {
      console.error('createFavourite error', error);
    }
  };

  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (error) {
      console.error('removeFavourite error', error);
    }
  };

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  return (
    <Card>
      {file.media_type === 'image' ? (
        <Card.Image
          source={{uri: uploadsUrl + file.filename}}
          style={{width: '90%', height: '70%'}}
          resizeMode="contain"
        ></Card.Image>
      ) : (
        <Video
          ref={videoRef}
          style={{width: '90%', height: '70%'}}
          source={{
            uri: uploadsUrl + file.filename,
          }}
          usePoster
          posterSource={{
            uri: uploadsUrl + file.screenshot,
          }}
          useNativeControls={true}
          isLooping
          resizeMode="contain"
        ></Video>
      )}

      <Card.Title h4>{file.title}</Card.Title>
      <Text>{file.description}</Text>
      <Card.Divider />
      <ListItem>
        <Avatar source={{uri: avatar}} />
        <Text>{owner.username}</Text>
      </ListItem>
      <ListItem>
        <Text>Likes: {likes.length}</Text>
        <Button
          title={'Like'}
          onPress={() => {
            createFavourite();
            fetchLikes();
          }}
        ></Button>
        <Button
          title={'Unlike'}
          onPress={() => {
            removeFavourite();
          }}
        ></Button>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  route: PropTypes.object.isRequired,
};

export default Single;
