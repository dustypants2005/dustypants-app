import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class SignupScreen extends Component {
  static navigationOptions = {
    title: 'SignUp',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    }
  }

  _signup(){
      const url = (username, password, email) => {
        return `https://us-west-2.api.scaphold.io/graphql/dustypants?query=mutation CreateUser($input: CreateUserInput!){
          createUser(input:$input){
            token
            viewer{
              user{
                id
                email
                username
              }
            }
          }
        }&variables={
          "input": {
            "email": "${email}",
            "username": "${username}",
            "password": "${password}"
          }
        }`;
        }
        fetch(url, { method: 'POST' })
        .then((res) => res.json())
        .then(res =>{
          const { loginUser } = res.data;
          sh.SetLoginUser(loginUser).done();
          navigate('Home', loginUser);
        })
        .catch(e => console.log( 'Error Login Post: ', JSON.stringify(e)))
        .done();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
            <TextInput
              placeholderTextColor='rgba(96,100,109, 1)'
              style={styles.input}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
              placeholder='username'
              autoFocus={true}
              maxLength={ 40 }/>
            <TextInput
              placeholderTextColor='rgba(96,100,109, 1)'
              style={styles.input}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
              placeholder='email'/>
            <TextInput
              placeholderTextColor='rgba(96,100,109, 1)'
              style={styles.input}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder='password'/>
            <Button style={styles.Button} onPress={this._signup} title='Sign Up' />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  Button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,    
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  input: {
    textAlign: 'center',
    color: 'rgba(96,100,109, 0.8)',
    fontSize: 30,
    backgroundColor: 'rgba(0,0,0,0.05)'
  }
});
