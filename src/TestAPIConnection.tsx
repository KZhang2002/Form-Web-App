import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestApiConnection = () => {
  const [response, setResponse] = useState<any>(null);  // Using 'any' to handle array or object response
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Change this URL to match your backend URL and endpoint
    axios.get('http://localhost:8080/user/all')
      .then(res => {
        setResponse(res.data); // Expecting an array of UserInfo or an object
      })
      .catch(err => {
        setError('Failed to connect to the backend or no users found');
      });
  }, []);

  return (
    <div>
      <h1>Test API Connection</h1>
      {response ? (
        <div>
          <h2>Users:</h2>
          <ul>
            {Array.isArray(response) && response.map((user: any, index: number) => (
              <li key={index}>{user.username}</li>
              ))}
          </ul>
        </div>
      ) : (
        <p>No users available or connection issue.</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TestApiConnection;