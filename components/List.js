import React from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/ApiHooks';
import GlobalStyles from '../utils/GlobalStyles';
import ListItem from './ListItem';

const List = () => {
  const {mediaArray} = useMedia();

  return (
    <FlatList
      style={GlobalStyles.list}
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    ></FlatList>
  );
};

export default List;
