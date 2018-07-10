import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import { createStackNavigator } from 'react-navigation';
import React from 'react';
import MainScreen from './screens/MainScreen'
import AddMenuScreen from './screens/AddMenuScreen'
import DetailedInfoScreen from './screens/DetailedInfoScreen'
import AddUserScreen from './screens/AddUserScreen'
import SignInScreen from './screens/SignInScreen'
import AllRecipesScreen from './screens/AllRecipesScreen'

const client = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjj6owwc53wdg01209pr1byym"
});

const StackNavigator = createStackNavigator(
  {
    justList : MainScreen,
    addMenu: AddMenuScreen,
    details: DetailedInfoScreen,
    addUser: AddUserScreen,
    justLogin: SignInScreen,
    allrecipes: AllRecipesScreen,
  },
  {
    initialRouteName: 'justLogin'
  }
);

class App extends React.Component {
  
  render() {
    return (
      <ApolloProvider client={client} >
       <StackNavigator />
      </ApolloProvider>
    );
  }
}

export default App;
