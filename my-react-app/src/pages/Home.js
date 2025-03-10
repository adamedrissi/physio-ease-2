import React, { useContext } from 'react';
import { UserContext } from '../UserContext';

function Home() {
  const { user } = useContext(UserContext);

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div>
      <h1>Hello, {user.firstName}!</h1>
      <p>Today is {currentDate}.</p>
    </div>
  );
}

export default Home;