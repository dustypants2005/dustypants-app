import React, { Component } from 'react';
import sh from '../api/storageHelper';
import { NavigationActions } from 'react-navigation';
import { 
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from 'react-native';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isCached: false
    }    
  }

  async _login(navigate) {
    const _getUrl = (username, password) => {
      return `https://us-west-2.api.scaphold.io/graphql/testdemo?query=mutation LoginUserQuery ($input: LoginUserInput!) {
        loginUser(input: $input) {
          token
          user {
            id
            username
            createdAt
          }
        }
      }&variables={"input": {
          "username": "${username}",
          "password": "${password}"
        }}`;
    }
    const url = _getUrl(this.state.username, this.state.password);
    fetch(url, { method: 'POST' })
      .then((res) => res.json())
      .then(res =>{
        const { loginUser } = res.data;
        sh.SetToken(loginUser.token).done();
        sh.SetUser(loginUser.user).done();
        navigate('Home', loginUser);
      })
      .catch(e => console.log( 'Error sending post: ', e))
      .done();
    }

  _loginNavigation({token, user}) { return NavigationActions.navigate({
      routeName: 'Home',
      params: {token, user}
    })
  }

  componentDidMount(){
    const { dispatch} = this.props.navigation;
    const token  = sh.GetToken().then(result => result).catch(e => console.log('getToken error: ',e));
    const user  = sh.GetUser().then(result => result).catch(e => console.log('getUser error: ',e));

    if( token && user && !this.state.isCached){
      this.setState({...this.state, isCached: true});
      dispatch(this._loginNavigation({token, user}))
    }
  }
  
  render() {
    const {navigate} = this.props.navigation;
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
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
              placeholder='password'/>
            <Button style={styles.Button} onPress={async () => await this._login(navigate)} title='Login' />
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
