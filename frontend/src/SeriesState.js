import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SeriesState() {
  const { id } = useParams();
  const [seriesState, setSeriesState] = useState(null);

  useEffect(() => {
    async function fetchSeriesState() {
      try {
        const response = await fetch(`http://localhost:3000/series-state/${id}`);
        const data = await response.json();
        setSeriesState(data);
      } catch (error) {
        console.error('Error fetching series state:', error);
      }
    }

    fetchSeriesState();
  }, [id]);

  return (
    <div>
      <h2>Series State</h2>
      {seriesState ? (
        <pre>{JSON.stringify(seriesState, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default SeriesState;
