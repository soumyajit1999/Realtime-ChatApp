import React, { useState, useEffect} from 'react';
import { FormControl, InputLabel, Input, IconButton} from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';


function App() {
  const [input, setInput] = useState('');
  const[messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // useState = variable in REACT
  // useEffect = run a block of code with a condition

  useEffect(() =>{
    //run once when the app component loads
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    });      // "Snapshot" will detect any new record in firebase
  },[] )

  useEffect(() => {
    //if its [] blank inside the dependencies ,then this code runs ones when app component loads
    setUsername(prompt('Please Enter your name'))
  },[])

  const sendMessage = (event) => {
    event.preventDefault();                 //As form makes to refresh the page to prevent the refresh we will use this 
  
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  setInput('');
                 
  }
  return (
    <div className="App">
      <img src="https://img.icons8.com/fluent/96/000000/chat.png"/>
    <h1>SOUPIFY REALTIME-CHATAPP</h1>

    <form className="app-form">
    <FormControl className="app-formControl">
      <Input className="app-input" placeholder="Enter a message..." value={input} onChange={event => setInput(event.target.value)}/>   {/* Input Field */}
      <IconButton className="icon-button" disabled={!input} variant="contained" color="primary" type="submit" onClick={sendMessage}>
        <SendIcon />
      </IconButton>  {/*button*/}
    </FormControl>
    </form>                                
   

    <FlipMove>
      {
        messages.map(({id, message}) => (
          <Message key={id} username={username} message={message} />   //"map" is a fancy way to loop thorugh instead of wrting like for or while and it return something

        ))
      }
    </FlipMove>
    </div>
  );
}

export default App;
