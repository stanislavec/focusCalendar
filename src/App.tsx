import React from 'react';
import { AutoSizeInput } from './components';
import './App.css';

function App() {
  const nameOfMeeting = React.createRef();
  const location = React.createRef();
  const agenda = React.createRef();
  return (
    <div className="App">
      <AutoSizeInput
        autoFocus
        tabIndex="1"
        ref={nameOfMeeting}
        label="Name of Meeting"
      />
      <AutoSizeInput tabIndex="2" ref={location} label="Location / Call" />
      <AutoSizeInput
        tabIndex="3"
        ref={agenda}
        defaultValue="Значение по умолчанию"
        label="Agenda"
      />
    </div>
  );
}

export default App;
