import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native';
import {useTag} from '../hooks/ApiHooks';
import {uploadsUrl} from '../utils/variables';
import {Card, Text, Button} from 'react-native-elements';
import {PropTypes} from 'prop-types';

const Profile = ({navigation}) => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFilesByTag} = useTag();
  console.log('Profile', user);

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };

  /* const createAvatar = async (mediaId) => {
    const data = {
      file_id: mediaId,
      tag: 'avatar_' + user.user_id,
    };
    try {
      const result = await postTag(data, 'njkk');
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  } */

  useEffect(() => {
    fetchAvatar();
  }, []);

  return (
    <ScrollView>
      <Card>
        <Card.Title h2>{user.username}</Card.Title>
        <Card.Image
          source={{uri: avatar}}
          style={{width: '80%', height: undefined, aspectRatio: 1}}
          resizeMode="contain"
        />
        <Text>{user.email}</Text>
        <Text>{user.full_name}</Text>
        <Button
          title="Log out"
          onPress={async () => {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
          }}
        />
        <Button
          title="Modify user"
          onPress={() => {
            navigation.navigate('Modify user');
          }}
        />
        <Button
          title={'My Files'}
          onPress={() => {
            navigation.navigate('My Files');
          }}
        />
      </Card>
    </ScrollView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
