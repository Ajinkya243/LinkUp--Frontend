import "tailwindcss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Feed from "./components/Feed";
import {Provider} from 'react-redux';
import appStore from "./utils/appStore";
import Connections from "./components/Connections";
import Request from "./components/Request";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path="/" element={<Body/>} >
      <Route path="/" element={<Feed/>}/>
      <Route path="profile" element={<Profile/>} />
      <Route path="connections" element={<Connections/>} />
      <Route path="request" element={<Request/>}/>
      </Route>
      </Route>
    </Routes>
    </BrowserRouter>
      </Provider>
      </>
  )
}

export default App
