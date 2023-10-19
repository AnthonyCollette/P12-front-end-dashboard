import './assets/scss/main.scss';
import { useState } from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './views/Dashboard'
import Homepage from './views/Homepage';

function App() {


  const [mocked, setMocked] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage mocked={mocked} setMocked={setMocked} />} />
          <Route path='/user/:id' element={<Dashboard mocked={mocked} />} />
          <Route path='*' element={<Homepage mocked={mocked} setMocked={setMocked} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
