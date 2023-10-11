import './assets/scss/main.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './views/Homepage'

function App() {

  const mocked = true;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/user/:id' element={<Homepage mocked={mocked}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
