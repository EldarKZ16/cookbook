import React from 'react'
import {TouchableOpacity, Text, StyleSheet} from 'react-native'
import {ListItem, Left, Body} from 'native-base'

export default class RecipesFlatListItem extends React.Component{
    
    handleOnPress = () => {
      this.props.recipeDetail(this.props.recipe);
    }

    render(){
     
        return(
            <ListItem noIndent>
              <Body>
                <TouchableOpacity onPress={this.handleOnPress}>
                  <Text style={styles.textSizeStyle}>{this.props.recipe.title}</Text>
                  <Text note style={styles.textNoteStyle}>{this.props.recipe.shortDescription}</Text>
                </TouchableOpacity>
              </Body>
            </ListItem>
        );
    }
}

const styles = StyleSheet.create({
  textSizeStyle: {
      fontSize: 18
  },
  textNoteStyle: {
    color: 'gray'
  }
})
