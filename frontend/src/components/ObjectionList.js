import React from 'react';
import PropTypes from 'prop-types';
import './ObjectionList.css';

const ObjectionList = ({ objections, currentPage, totalPages, onPageChange }) => {
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const objectionsToDisplay = objections.slice(startIndex, endIndex);

  return (
    <div className="objection-list">
      <h2>Objections</h2>
      {objectionsToDisplay.length === 0 ? (
        <p className="no-objections">No objections to display.</p>
      ) : (
        <div>
          <ul>
            {objectionsToDisplay.map((objection) => (
              <ObjectionItem key={objection.id} objection={objection} />
            ))}
          </ul>
          <div className="pagination">
            {currentPage > 1 && (
              <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>
            )}
            {currentPage < totalPages && (
              <button onClick={() => onPageChange(currentPage + 1)}>Next</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const ObjectionItem = ({ objection }) => {
  const { id, objectionType, rebuttal } = objection;

  return (
    <li className="objection-item">
      <h3 className="objection-type">Objection Type: {objectionType}</h3>
      <p className="rebuttal">Rebuttal: {rebuttal}</p>
    </li>
  );
};

ObjectionList.propTypes = {
  objections: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      objectionType: PropTypes.string.isRequired,
      rebuttal: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default ObjectionList;
