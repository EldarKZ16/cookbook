import React from 'react'
import {View, Text, Share, Button, Image} from 'react-native'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'

const ADD_RECIPE_TO_USER = gql`
    mutation addFavorite($recipesRecipeId : ID! , $userUserId : ID!){
      addToUserOnRecipe(recipesRecipeId : $recipesRecipeId, userUserId: $userUserId) {
          userUser {
            id
          }
      }
    }
`;

export default class DetailedInfoScreen extends React.Component{
  item= this.props.navigation.getParam('recipe')
  userId = this.props.navigation.getParam('userID')


  shareMessage = () => {
    Share.share(
            {
              message: `For lunch you have ${this.item.title.toString()}`
            }).then(result => console.log(result)).catch(errorMsg => console.log(errorMsg));
     }
  
  render(){
    console.log(this.item)
    return(
      <Mutation mutation={ADD_RECIPE_TO_USER}>
      {(addToUserOnRecipe, { data, loading, error }) => (  
      <View style={{flex: 1}}>
      <Image style={{width: 300, height: 300}} source={{uri: this.item.imageUrl}}/>
        <Text>Title: {this.item.title}</Text>
        <Text>Description: {this.item.description}</Text>
        <Text>Ingredients: {this.item.ingredients}</Text>
        <Button title='Share ->' style={{justifyContent: 'center'}} onPress={this.shareMessage}/>
        <Button title='Add' disabled={(this.item.user === null || this.item.user.id !== this.userId)? false:true} style={{justifyContent: 'center'}} onPress={() => {
          addToUserOnRecipe({
            variables: {
              recipesRecipeId: this.item.id,
              userUserId: this.userId,
            },
          });
          this.props.navigation.goBack();
        }}/>
      </View>
      )}
      </Mutation>
    );
  }
}