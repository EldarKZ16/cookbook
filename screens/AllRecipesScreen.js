import React from 'react';
import { ActivityIndicator, View, Button, Text } from 'react-native';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import RecipesFlatList from '../components/RecipesFlatList';
import FABButton from '../components/FAB';

const GET_RECIPES = gql`
{
  allRecipes{
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
`;


export default class AllRecipeScreen extends React.Component {
  userId = this.props.navigation.getParam('userID');
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Recipes',
    };
  };

  handleScreen = screen => {
    this.props.navigation.navigate(screen, {
      userId: this.userId
    });
  };
  renderDetails = item => {
    this.props.navigation.navigate('details', {
      recipe: item,
      userID: this.userId
    });
  };

  render() {
    return (
      <React.Fragment>
        <Query query={GET_RECIPES} >
          {({ loading, data, error, refetch }) =>
            loading ? (
              <ActivityIndicator />
            ) : ( 
                data.allRecipes.length !== 0 ? 
              (<RecipesFlatList
                recipes={data}
                recipeDetails={this.renderDetails}
                screen='allrecipes'
                refreshingData={() => refetch()}
              />) : (<Text>No recipes for a while</Text>)
            )
          }
        </Query>
        <FABButton screen={this.handleScreen} />
      </React.Fragment>
    );
  }
}