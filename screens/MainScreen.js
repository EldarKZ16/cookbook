import React from 'react';
import { ActivityIndicator, View, Button } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RecipesFlatList from '../components/RecipesFlatList';
import FABButton from '../components/FAB';


const GET_RECIPES = gql`
  query LoggedUser($id: ID!){
    User (id: $id){
      recipes {
        id
        imageUrl
        title
        shortDescription
        description
        ingredients
        user {
          id
        }
      }
    }
  }
`;

export default class MainScreen extends React.Component {
  state = {
  curScreen : 'user',
  userId : this.props.navigation.getParam('userId'),
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'My Recipes',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('allrecipes',{
            userID: navigation.getParam('Id')
          })}
          title="Show All"
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams({ Id: this.state.userId });
  }

  handleScreen = screen => {
    this.props.navigation.navigate(screen, {
      userID: this.state.userId
    });
  };

  renderDetails = item => {
    this.props.navigation.navigate('details', {
      recipe: item,
      userID: this.state.userId
    });
  };

  render() {
    return (
      <React.Fragment>
        <Query query={GET_RECIPES} variables={{id: this.state.userId}}>
          {({ loading, data, error, refetch }) =>
            loading ? (
              <ActivityIndicator />
            ) : ( 
              <RecipesFlatList
                recipes={data}
                recipeDetails={this.renderDetails}
                screens={this.state.curScreen}
                refreshingData={() => refetch()}
              />
            ) 
          }
        </Query>
        <FABButton screen={this.handleScreen} />
      </React.Fragment>
    );
  }
}