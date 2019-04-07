import {createStackNavigator} from 'react-navigation';

import LoginScreen from './src/screens/login-screen';
import SignInScreen from './src/screens/signin-screen';
import HomeScreen from './src/screens/home-screen';
import ShowerScreen from './src/screens/shower-screen';
import SettingsScreen from './src/screens/settings-screen';

const App = createStackNavigator({
  Login: {screen: LoginScreen},
  SignIn: {screen: SignInScreen},
  Home: {screen: HomeScreen},
  Shower: {screen: ShowerScreen},
  Settings: {screen: SettingsScreen},
})

export default App
