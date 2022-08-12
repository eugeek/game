import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';

import SignIn from './pages/SignIn';
import Panel from './pages/Panel';
import SignUp from './pages/SignUp';
import { Game } from './pages/Game';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <ChakraProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={''} />
        <Route path='/play' element={<Game />} />
        <Route path='/panel' element={<Panel />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='*' element={''} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);