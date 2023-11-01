import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, 
  RouterProvider 
} from 'react-router-dom'

// layouts and pages
import RootLayout from './layouts/RootLayout'
import Dashboard from './pages/Dashboard'
import Controller from './pages/Controller'
import Video from './pages/Video'
import Voice from './pages/Voice'
import Touch from './pages/Touch'
import Keyboard from './pages/Keyboard'
import Settings from './pages/Settings'

// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="controller" element={<Controller />}/>
      <Route path="video" element={<Video />}/>
      <Route path="voice" element={<Voice />}/>
      <Route path="touch" element={<Touch />}/>
      <Route path="keyboard" element={<Keyboard />}/>
      <Route path="settings" element={<Settings />}/>
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App