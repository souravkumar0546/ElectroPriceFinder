import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import ResultTable from '../components/ResultsTable';


const HomePage = () => {
  const [results, setResults] = useState([]);
  return (
    <div>
      <h1>Search Parts</h1>
      <InputForm setResults={setResults} />
      <ResultTable results={results}/>
    </div>
  );
};

export default HomePage;
