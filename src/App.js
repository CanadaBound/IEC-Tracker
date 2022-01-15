import './App.css';
import Card from './Components/Card';

import Navigation from './Components/Navigation';
import Quotes from './Components/Quotes';
import Search from './Components/Search';

function App() {
  return (
   <div className='App'>
      <Navigation/>
      <Search/>
      <div className='Card-Holder'>
        <Card/>
      </div>
      <Quotes/>
   </div>
  );
}

export default App;
