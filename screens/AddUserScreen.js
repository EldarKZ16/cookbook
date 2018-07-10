import React from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity, Button} from 'react-native';
import {TextInput} from 'react-native-paper';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGNUP_USER_MUTATION = gql`
mutation CreateUserMutation($email: String!, $password: String!) {
    createUser(authProvider: { email: { email: $email, password: $password } }) {
      id
    }
}
`;

export default class AddUserScreen extends React.Component{
    state = {
        username: '',
        password: '',
    }

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 'Sign up',
        };
      };

    render(){
        return(
            <Mutation mutation={SIGNUP_USER_MUTATION}>
                {(createUser, {data, loading, error}) => (
                    <View style={{ flex: 1 }}>
                        <TextInput
                            label="Email"
                            value={this.state.username}
                            theme={{ colors: { primary: 'green' } }}
                            onChangeText={text => this.setState({ username: text })}
                        />
                        <TextInput
                            label="Password"
                            value={this.state.password}
                            theme={{ colors: { primary: 'green' } }}
                            onChangeText={text =>
                                this.setState({ password: text })
                            }
                        />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'green',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 250,
                                marginTop: 20,
                                padding: 10,
                            }}
                        disabled={loading}
                        onPress={() => {
                                createUser({
                                    variables: {
                                    email: this.state.username,
                                    password: this.state.password,
                                    },
                                });                 
                        this.props.navigation.goBack();
                        }}>
                            {loading ? (
                            <ActivityIndicator />
                            ) : (
                            <Text style={{ fontSize: 18 }}>Sign Up</Text>
                            )}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Mutation>
        );
    }
}