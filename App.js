import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/homeScreens";
import MeteorScreen from "./screens/meteorScreen";
import IssLocationScreen from "./screens/IssLocationScreen";
const Stack = createStackNavigator()

function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Meteor" component={MeteorScreen}></Stack.Screen>
        <Stack.Screen name="IssLocation" component={IssLocationScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}