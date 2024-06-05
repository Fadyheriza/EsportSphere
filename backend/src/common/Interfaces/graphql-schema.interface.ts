export interface GraphQLSchema {
    queryType: {
      name: string;
    };
    mutationType: {
      name: string;
    };
    types: [
      {
        name: string;
        kind: string;
        fields: [
          {
            name: string;
            type: {
              name: string;
              kind: string;
            };
          }
        ];
      }
    ];
  }
  