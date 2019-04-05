import {createStackNavigator} from 'react-navigation';

import LoginPage from './src/screens/login-page';
import GridViewPage from './src/screens/gridview-page';
import ShowerPage from './src/screens/shower-page';
import SettingsPage from './src/screens/settings-page';

const App = createStackNavigator({
  Login: {screen: LoginPage},
  GridView: {screen: GridViewPage},
  Shower: {screen: ShowerPage},
  Settings: {screen: SettingsPage},
})

export default App
