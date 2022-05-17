import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getSymbols } from '../../services/SymbolsService';

function Symbols() {
  const history = useHistory();
  const [symbols, setSymbols] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    getSymbols(token)
      .then((symbols) => setSymbols(symbols))
      .catch((err) => {
        if (err.response && err.response.status === 401)
          return history.push('/');
        setError(err.message);
        setSuccess('');
      });
  }, [history]);

  return (
    <React.Fragment>
      {JSON.stringify(symbols)}
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="alert alert-danger">{success}</div>
      )}
    </React.Fragment>
  );
}

export default Symbols;
