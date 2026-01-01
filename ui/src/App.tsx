import { Routes, Route, Navigate } from 'react-router-dom'
import { ProductsView } from './views/ProductsView'
import { SuccessView } from './views/SuccessView'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsView />} />
      <Route path="/success" element={<SuccessView />} />
    </Routes>
  )
}

export default App
