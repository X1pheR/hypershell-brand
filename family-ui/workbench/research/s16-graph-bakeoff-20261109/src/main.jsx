import React from 'react';import {createRoot} from 'react-dom/client';import './style.css';
const q=new URLSearchParams(location.search);const engine=q.get('engine')||'cyto';const n=Math.max(2,Number(q.get('n')||100));const ratio=Number(q.get('edges')||3);
const C=engine==='richscale'?(await import('./richscale.jsx')).default:engine==='rich'?(await import('./rich.jsx')).default:engine==='reactopt'?(await import('./reactopt.jsx')).default:engine==='react'?(await import('./react.jsx')).default:engine==='cyto'?(await import('./cyto.jsx')).default:(await import('./g6.jsx')).default;
createRoot(document.getElementById('root')).render(<C n={n} ratio={ratio}/>);
