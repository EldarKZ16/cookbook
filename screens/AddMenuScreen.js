import { ActivityIndicator, View, Text, TouchableOpacity, Button} from 'react-native';
import {ImagePicker, Permissions} from 'expo';
import { TextInput } from 'react-native-paper';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

const FILE_UPLOAD_URL = 'https://api.graph.cool/file/v1/cjj6owwc53wdg01209pr1byym'

const CREATE_RECIPE = gql`
  mutation AddingRecipe($title: String!, $shortDescription: String!, $description: String!, $imageUrl: String, $ingredients: [String!]) {
    createRecipe(title: $title, shortDescription: $shortDescription, description: $description, imageUrl: $imageUrl, ingredients: $ingredients) {
      id
    }
  }
`;

export default class AddMenuScreen extends React.Component {
  state = {
    titleValue: '',
    shortDescriptionValue: '',
    descriptionValue: '',
    ingredientsText: '',
    localImageUrl: '',
    userId: this.props.navigation.getParam('userID'),
    ingredients: []
  };
  
  handleChangeText = (text) => {
    this.setState({
      ingredientsText: text
    })
  }
  
  renderIngredients = () => {
    this.setState({
      ingredients: [...this.state.ingredients, this.state.ingredientsText],
      ingredientsText: ''
    })
  }

  handleUploadButton = async() => {
        await Permissions.askAsync(Permissions.CAMERA_ROLL)
        const photo = await ImagePicker.launchImageLibraryAsync();
        this.setState({
            localImageUrl: photo.uri
        })
  }

  render() {
    return (
      <Mutation mutation={CREATE_RECIPE}>
        {(createRecipe, { data, loading, error }) => (
          <React.Fragment>
            
            <TextInput
              label="Title"
              value={this.state.titleValue}
              theme={{ colors: { primary: 'green' } }}
              onChangeText={text => this.setState({ titleValue: text })}
            />
            <TextInput
              label="Short Description"
              value={this.state.shortDescriptionValue}
              theme={{ colors: { primary: 'green' } }}
              onChangeText={text =>
                this.setState({ shortDescriptionValue: text })
              }
            />
            <TextInput
              label="Description"
              value={this.state.descriptionValue}
              theme={{ colors: { primary: 'green' } }}
              onChangeText={text =>
                this.setState({ descriptionValue: text })
              }
            />
            <View style={{flexDirection: 'row'}}>
            <TextInput
              label="LocalImageURL"
              value={this.state.localImageUrl}
              theme={{ colors: { primary: 'green' } }}
              style={{flex:2}}
            /><View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button title='AddPhoto' onPress={this.handleUploadButton}/>
            </View>
            </View>
           
            <View style={{flexDirection: 'row'}}>
            <TextInput
              label="Ingredients"
              value={this.state.ingredientsText}
              theme={{ colors: { primary: 'green' } }}
              style={{flex:2}}
              onChangeText={this.handleChangeText}
            /><View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button title='Add'  onPress={this.renderIngredients}/>
            </View>
            </View>
            
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  alignItems: 'center',
                  width: 250,
                  
                }}
                disabled={loading}
                onPress={async() => {
                    try{
                        let formData = new FormData();
                        formData.append('data', {
                            uri: this.state.localImageUrl,
                            name: `${this.state.titleValue}.png`,
                            type: 'multipart/form-data'
                        })
                        const res = await fetch(FILE_UPLOAD_URL, {
                            method: 'POST',
                            body: formData
                        });
                        const resJson = await res.json()
                        createRecipe({
                            variables: {
                              title: this.state.titleValue,
                              shortDescription: this.state.shortDescriptionValue, 
                              description: this.state.descriptionValue,
                              imageUrl: resJson.url,
                              ingredients: this.state.ingredients,
                            },
                          });
                          
                    } catch (err) {
                        console.log(err)
                    }  
                  
                  this.props.navigation.goBack();
                }}>
                {loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={{ fontSize: 18 }}>Submit</Text>
                )}
              </TouchableOpacity>
            </View>
          </React.Fragment>
        )}
      </Mutation>
    );
  }
}
