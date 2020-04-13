import ReactoTron from 'reactotron-react-js';

if (process.env.NODE_ENV === 'development') {
  const tron = ReactoTron.configure().connect();

  tron.clear();

  console.tron = tron;
}
