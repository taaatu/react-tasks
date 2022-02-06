import React, {useCallback, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import {Alert, ScrollView, StyleSheet} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import {Button, Card, Input} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MainContext} from '../contexts/MainContext';
import {useFocusEffect} from '@react-navigation/native';
import {appId} from '../utils/variables';

const Upload = ({navigation}) => {
  const [image, setImage] = useState(
    'https://place-hold.it/300x200&text=Choose'
  );
  const [imageSelected, setImageSelected] = useState(false);
  const [type, setType] = useState('');
  const {postMedia, loading} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageSelected(true);
      setType(result.type);
    }
  };

  const reset = () => {
    setImage('https://place-hold.it/300x200&text=Choose');
    setImageSelected(false);
    setValue('title', '');
    setValue('description', '');
  };

  useFocusEffect(
    useCallback(() => {
      return () => reset();
    }, [])
  );

  const onSubmit = async (data) => {
    if (!imageSelected) {
      Alert.alert('Please, select a file');
      return;
    }
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    const filename = image.split('/').pop();
    let fileExtension = filename.split('.').pop();
    fileExtension = fileExtension === 'jpg' ? 'jpeg' : fileExtension;
    formData.append('file', {
      uri: image,
      name: filename,
      type: type + '/' + fileExtension,
    });
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postMedia(formData, token);

      const tagResponse = await postTag(
        {file_id: response.file_id, tag: appId},
        token
      );
      tagResponse &&
        Alert.alert('File', 'uploaded', [
          {
            text: 'OK',
            onPress: () => {
              reset();
              setUpdate(update + 1);
              navigation.navigate('Home');
            },
          },
        ]);
    } catch (error) {
      console.log('onSubmit upload image error');
    }
  };

  return (
    <ScrollView>
      <Card>
        <Card.Image
          source={{uri: image}}
          style={styles.image}
          onPress={pickImage}
        ></Card.Image>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Title"
              errorMessage={errors.title && 'This is required.'}
            />
          )}
          name="title"
        />

        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Description"
              errorMessage={errors.description && 'This is required.'}
            />
          )}
          name="description"
        />

        <Button title="Choose image" onPress={pickImage} />
        <Button
          disabled={!imageSelected}
          loading={loading}
          title="Upload"
          onPress={handleSubmit(onSubmit)}
        />
        <Button title="Reset form" onPress={reset} />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 15,
    resizeMode: 'contain',
  },
});

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
