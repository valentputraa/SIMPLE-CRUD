import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from './components/UserList.js';
import AddUserModal from './components/AddUserModal.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserList/>}/>
        <Route path='/add' element={<AddUserModal/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
