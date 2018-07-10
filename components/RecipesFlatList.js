import React from 'react'
import {FlatList} from 'react-native'
import RecipesFlatListItem from './RecipesFlatListItem'

export default class RecipesFlatList extends React.Component{
    state = {
        currentScreen : this.props.screens
    }

    render(){
        return(
            <FlatList 
                data={this.state.currentScreen === 'user' ? this.props.recipes["User"].recipes : this.props.recipes.allRecipes}
                refreshing={this.props.recipes.networkStatus === 4}
                onRefresh={this.props.refreshingData}
                renderItem = {({item}) => (
                    <RecipesFlatListItem recipe={item} recipeDetail={this.props.recipeDetails}/>
                )}
                keyExtractor = {(item) => item.id}
            />
        );
    }
}