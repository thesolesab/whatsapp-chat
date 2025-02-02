import React, { useState } from 'react';
import Auth from './components/Auth';
import Messenger from './pages/Messenger';
import useHttp from './hooks/useHTTP';
import Spinner from './components/Spinner';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const { request, loading } = useHttp()

  const handleAuth = async (idInstance, apiTokenInstance) => {
    const url = `https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`

    const { stateInstance } = await request(url)
    if (stateInstance === 'authorized') {
      setIsAuthenticated(true);
      setIdInstance(idInstance);
      setApiTokenInstance(apiTokenInstance);
    }
  };

  return (
    <div className="app">
      <div className="container">
        {/* <h1>WhatsApp Chat</h1> */}
        {!isAuthenticated ?
          (
            <Auth onAuth={handleAuth} />
          )
          :
          loading ? <Spinner /> : <Messenger idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
        }
      </div>
    </div>
  );
};

export default App;