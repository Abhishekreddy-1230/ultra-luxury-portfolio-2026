import React from 'react';
import { createRoot } from 'react-dom/client';
import Hero3D from './components/Hero3D';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<Hero3D />);
