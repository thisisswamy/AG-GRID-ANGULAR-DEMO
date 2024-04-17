export class TableData{
    static sampleRowdata =   [
        {
          JAN: {
            id: 1,
            name: 'John',
            amount: 100,
          },
          FEB: {
            id: 1,
            name: 'Alice',
            amount: 150,
          },
          MAR: {
            id: 1,
            name: 'Bob',
            amount: 200,
          },
        },
        {
          JAN: {
            id: 2,
            name: 'Emily',
            amount: 120,
          },
          FEB: {
            id: 2,
            name: 'David',
            amount: 180,
          },
          MAR: {
            id: 2,
            name: 'Sophia',
            amount: 220,
          },
        },
        {
          JAN: {
            id: 3,
            name: 'Michael',
            amount: 90,
          },
          FEB: {
            id: 3,
            name: 'Emma',
            amount: 160,
          },
          MAR: {
            id: 3,
            name: 'Oliver',
            amount: 240,
          },
        },
        {
          JAN: {
            id: 4,
            name: 'Michael',
            amount: 90,
          },
          FEB: {
            id: 4,
            name: 'Emma',
            amount: 160,
          },
          MAR: {
            id: 4,
            name: 'Oliver',
            amount: 240,
          },
        },
      ];

      static sampleUsersData =[
        {
          USERINFO:{
              id:1,
              name:'Alpha'
          },
          JAN: {
            expected: 50,
            committed: 5
          },
          FEB: {
            expected: 10,
            committed: 5
          },
          MAR: {
            expected: 10,
            committed: 5
          }
        },
        {
          USERINFO:{
              id:2,
              name:'Beta'
          },
          JAN: {
            expected: 20,
            committed: 5
          },
          FEB: {
            expected: 20,
            committed: 5
          },
          MAR: {
            expected: 20,
            committed: 5
          }
        },
        {
          USERINFO:{
              id:3,
              name:'Comma'
          },
          JAN: {
            expected: 30,
            committed: 5
          },
          FEB: {
            expected: 30,
            committed: 5
          },
          MAR: {
            expected: 30,
            committed: 5
          }
        },
        {
          USERINFO:{
              id:4,
              name:'Emma'
          },
          JAN: {
            expected: 40,
            committed: 5
          },
          FEB: {
            expected: 40,
            committed: 5
          },
          MAR: {
            expected: 40,
            committed: 5
          }
        }
      ]
}