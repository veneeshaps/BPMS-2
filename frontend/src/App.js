import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from './Components/Home';
import Bug from './Components/Bug';
import Patch from './Components/Patch';
import BReport from './Components/BReport';
import Request from './Components/Request';
import PatchRequest from './Components/PatchRequest'; 
import Deployment from './Components/Deployment';
import Dev from './Components/Dev';
import Quality from './Components/Quality';
import Previous from './Components/Previous';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/user/home' element={<Home/>}/>
        <Route path='/user/reportbug' element={<Bug/>}/>
        <Route path='/user/patch' element={<Patch/>}/>
        <Route path='/reporter' element={<BReport/>}/>
        <Route path='/reporter/bugreport' element={<BReport/>}/>
        <Route path='/reporter/sendrequest' element={<Request/>}/>
        <Route path='/admin' element={<PatchRequest/>}/>
        <Route path='/admin/requestpatch' element={<PatchRequest/>}/>
        <Route path='/admin/deployment' element={<Deployment/>}/>
        <Route path='/dev' element={<Dev/>}/>
        <Route path='/dev/patch' element={<Dev/>}/>
        <Route path='/qa' element={<Quality/>}/>
        <Route path='/qa/previous' element={<Previous/>}/>
      </Routes>
    </Router>
  );
}