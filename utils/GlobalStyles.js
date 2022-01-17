import {StyleSheet, Platform, StatusBar} from 'react-native';

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: '#202028',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    height: '100%',
  },
  header: {
    height: '40%',
  },
  headerImage: {
    borderBottomRightRadius: 50,
    height: 'auto',
  },
  headerTitle: {
    fontSize: 25,
    backgroundColor: '#2769fd',
    position: 'absolute',
    bottom: 15,
    padding: 5,
    paddingHorizontal: 15,
    color: 'white',
  },
  settingsIcon: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
  list: {
    height: 'auto',
    marginBottom: 20,
    marginTop: 30,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#242834',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginBottom: 10,
  },
  imageBox: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 6,
  },
  textBox: {
    flex: 1,
    padding: 10,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    paddingBottom: 3,
  },
  description: {
    color: 'grey',
  },
});
