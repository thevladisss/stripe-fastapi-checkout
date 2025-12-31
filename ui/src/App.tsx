import { Routes, Route, Navigate } from 'react-router-dom'
import { ProductsView } from './views/ProductsView'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<ProductsView />} />
    </Routes>
  )
}

export default App
