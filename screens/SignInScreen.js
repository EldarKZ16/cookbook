import { ActivityIndicator, View, Text, TouchableOpacity, Button} from 'react-native';
import {TextInput} from 'react-native-paper';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React from 'react';

const SIGNIN_USER_MUTATION = gql`
    mutation SigninUserMutation($email: String!, $password: String!) {
        signinUser(email: { email: $email, password: $password }) {
          token
          user {
              id
          }
        }
      }
`;

class SignInScreen extends React.Component{
    state= {
        email: '',
        password: '',
    }

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: 'Login',
        };
      };

    handleSignUp = () => {
        this.props.navigation.navigate('addUser')
    }

    handleSignIn = async() => {
        const { email, password } = this.state;
    
    const result = await SIGNIN_USER({
      variables: {
        email,
        password,
      }
    });
    this.setState({token: result.data.signinUser.token})
    console.log(result);
    }
    render(){
        return(
            <Mutation mutation={SIGNIN_USER_MUTATION}>
             {(signinUser, {data, loading, error}) => (
            <React.Fragment>
                  
                            <TextInput
                                label="Email"
                                value={this.state.email}
                                theme={{ colors: { primary: 'green' } }}
                                onChangeText={text => this.setState({ email: text })}
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
                           
                            onPress={async() => {
                                try{
                                    const res = await signinUser({
                                        variables: {
                                            email: this.state.email,
                                            password: this.state.password,
                                        }
                                    })
                                    this.props.navigation.navigate('justList', {
                                        userId: res.data.signinUser.user.id
                                    });
                                }catch(err){
                                    alert('User not Found or Password is incorrect')
                                }
                                
                            }}>
                                <Text style={{ fontSize: 18 }}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginTop: 15,}}onPress={this.handleSignUp}><Text style={{ fontSize: 15 }}>Don't have an account?</Text></TouchableOpacity>
                            </View>        
            </React.Fragment>
             )}
        </Mutation>
        );
    }
}
export default SignInScreen;