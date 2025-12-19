import {Routes, Route} from 'react-router';
import Home from './pages/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<div>About Page</div>} />
    </Routes>
  )
}

export default App