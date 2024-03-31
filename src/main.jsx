import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.192.242:36363/',
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)
