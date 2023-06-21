import React, { useState, useEffect } from 'react';

const ScriptList = ({ scripts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredScripts, setFilteredScripts] = useState([]);

  useEffect(() => {
    const filterScripts = () => {
      const filteredScripts = scripts.filter((script) =>
        script.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredScripts(filteredScripts);
    };

    filterScripts();
  }, [scripts, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <h2>Script List</h2>
      <div>
        <input
          type="text"
          placeholder="Search scripts..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {filteredScripts.length === 0 ? (
        <p>No scripts found.</p>
      ) : (
        <ul>
          {filteredScripts.map((script) => (
            <li key={script.id}>
              <h3>{script.title}</h3>
              <p>{script.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScriptList;
