import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [techs, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  // function handleAdd() {
  //   setTech([...techs, newTech]);
  //   setNewTech('');
  // }

  const handleAdd = useCallback(() => {
    setTech([...techs, newTech]);
    setNewTech('');
  }, [newTech, techs]);

  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (storageTech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(techs));
  }, [techs]);

  const techSize = useMemo(() => techs.length, [techs]);

  return (
    <>
      <ul>
        {techs.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <p>Você tem {techSize} tecnologias.</p>

      <input
        value={newTech}
        type="text"
        onChange={(e) => setNewTech(e.target.value)}
      />
      <button onClick={handleAdd} type="button">
        Adicioanr
      </button>
    </>
  );
}

export default App;
