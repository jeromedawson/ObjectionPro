import React, { useEffect, useState } from 'react';
import ObjectionList from '../components/ObjectionList';
import ObjectionForm from '../components/ObjectionForm';
import api from '../utils/api';

const ObjectionsPage = () => {
  const [objections, setObjections] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchObjections();
  }, [currentPage]);

  const fetchObjections = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.get(`/objections?page=${currentPage}`);
      setObjections(response.data.objections);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError('Failed to fetch objections');
    }

    setIsLoading(false);
  };

  const addObjection = async (newObjection) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/objections', newObjection);
      setObjections([...objections, response.data]);
    } catch (error) {
      setError('Failed to add objection');
    }

    setIsLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredObjections = objections.filter((objection) =>
    objection.objectionType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Objections Page</h1>
      {error && <p>{error}</p>}
      <ObjectionForm onSubmit={addObjection} isLoading={isLoading} />
      <input
        type="text"
        placeholder="Search objections..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {isLoading ? (
        <p>Loading objections...</p>
      ) : (
        <ObjectionList
          objections={filteredObjections}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ObjectionsPage;
