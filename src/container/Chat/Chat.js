import React from 'react';
import * as firebase from 'firebase';

export default class Chat extends React.Component{

  state={
    user:{}
  }
  componentDidMount(){
    const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      console.log(user);
      if(user){
        this.setState({
          user
        })
      }else{
        this.props.history.push('/')
      }
    })
  }


  render(){
    return(
      <div>
        <h1>Chat Page</h1>
        <button onClick={() => firebase.auth().signOut()} >Logout</button>
      </div>
    )
  }
}