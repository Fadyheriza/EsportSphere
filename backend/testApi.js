const axios = require('axios');

const apiUrl = 'https://api-op.grid.gg/central-data/graphql';
const apiKey = 'w7lRua0Kqcymm7PpLfqTBdWXEknlXuYssCsaKIlL';

const query = `
  query {
    allSeries(
      first: 50,
      filter: {
        titleId: 6,
        types: ESPORTS
      },
      orderBy: StartTimeScheduled,
      orderDirection: DESC
    ) {
      totalCount
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          title {
            id
          }
          tournament {
            id
            name
          }
        }
      }
    }
  }
`;

axios.post(apiUrl, { query }, {
  headers: {
    'x-api-key': apiKey,
    'Content-Type': 'application/json',
  }
})
  .then(response => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error('Error fetching series data:', error.response?.status);
    console.error('Error response data:', error.response?.data);
  });
