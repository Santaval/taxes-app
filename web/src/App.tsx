import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import RegisterBeta from './pages/RegisterBeta'
import DeleteAccount from './pages/DeleteAccount'
import PartialDataDeletion from './pages/PartialDataDeletion'
import PrivacyPolicy from './pages/PrivacyPolicy'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/why" element={<Landing />} />
        <Route path="/features" element={<Landing />} />
        <Route path="/screenshots" element={<Landing />} />
        <Route path="/pricing" element={<Landing />} />
        <Route path="/download" element={<Landing />} />
        <Route path="/register-beta" element={<RegisterBeta />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/partial-data-deletion" element={<PartialDataDeletion />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
