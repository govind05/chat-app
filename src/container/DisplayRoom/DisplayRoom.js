import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { NavLink } from 'react-router-dom';

import ChatPage from '../Chat/Chat.js';

class DisplayRoom extends React.Component {
    state = {
        rooms: []
    }

    componentDidMount() {
        const auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      if (!user) {

        this.props.history.push('/')
      }
    })
        const db = firebase.firestore();
        db.collection('rooms')
            .get()
            .then(snap => {
                console.log(snap)
                const rooms = snap.docs.map(room => {
                    console.log(room.data())
                    return {
                        id: room.id,
                        name: room.data().name
                    }
                });
                this.setState({
                    rooms
                });
            })
            .catch(err => console.log(err));

    }

    render() {
        console.log(this.state.rooms)

        let rooms = this.state.rooms.map(room => (
            <div className="roomlog">
               <button><NavLink
                    to={{
                        pathname: '/chat',
                        state:{ id: room.id},
                    }}
                    
                    key={room.id}>
                    {room.name}
                </NavLink></button> 
            </div>
        ))

        return (
            <div>
                <p>Rooms</p>
                {rooms}
            </div>
        );
    }
}

export default DisplayRoom;