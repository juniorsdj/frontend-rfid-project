import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';


import './styles.css';

export default function NavBar() {
  const { goBack } = useHistory();

  return (
    <aside className="navbar">

    </aside>
  );
}