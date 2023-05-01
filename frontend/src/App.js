import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Bug from './Components/Bug';
import Feature from './Components/Feature';
import Patch from './Components/Patch';
import RequestDev from './Components/Request';
import PatchRequest from './Components/PatchReqeust';
import Patches from './Components/Patches';
import Datatable from 'react-data-table-component';
function App() {
  const columns = [
    {
      name: 'Title',
      selector: row => row.title
    },
    {
      name: 'Email',
      selector: row => row.email
    },
    {
      name: 'Age',
      selector: row => row.age
    }
  ];
  const data = [
    {
      id:1,
      title: 'patch',
      email: 'nisjd@gmail.com',
      age: '34'
    },
    {
      id:1,
      title: 'patch',
      email: 'nisjd@gmail.com',
      age: '34'
    },
    {
      id:1,
      title: 'patch',
      email: 'nisjd@gmail.com',
      age: '34'
    }
  ]
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route path='/admin/home' element={<></>}/>
          <Route path='/admin/patchrequest' element={<PatchRequest/>}/>
          <Route path='/dev/currentrequest' element={<RequestDev/>}/>
          <Route path='/qc/patches' element={<Patches/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/bugs' element={<Bug/>}/>
          <Route path='/features' element={<Feature/>}/>
          <Route path='/patches' element={<Patch/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
