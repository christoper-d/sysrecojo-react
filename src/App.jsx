import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainComponent from './components/MainComponent';
import { EmpresasComponent } from './components/EmpresasComponent';
import { AppRouter } from './router/AppRouter';

function App() {
  return (
    <AppRouter/>
  );
}

export default App;
