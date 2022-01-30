import React, {useContext, useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {ButtonGroup, Card} from 'react-native-elements';

const Login = ({navigation}) => {
  // props is needed for navigation
  const [formToggle, setFormToggle] = useState(true);
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      console.log('checkToken', userData);
      setUser(userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''}>
        <Card>
          <ButtonGroup
            onPress={() => setFormToggle(!formToggle)}
            selectedIndex={formToggle ? 0 : 1}
            buttons={['Login', 'Register']}
          />
        </Card>
        {formToggle ? (
          <Card>
            <Card.Title h4>Login</Card.Title>
            <LoginForm />
          </Card>
        ) : (
          <Card>
            <Card.Title h4>Register</Card.Title>
            <RegisterForm />
          </Card>
        )}
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
