const statement = require('../src/statement')


test('build statement of 3 performances', () => {
  const invoice =   {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "hamlet",
        "audience": 55
      },
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  };

  const plays = {
    "hamlet": {"name": "Hamlet", "type": "tragedy"},
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
  };


  let expectedStatement =`\
Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;
  expect(statement(invoice, plays)).toBe(expectedStatement)
})


test('build statement of 2 performances', () => {
  const invoice =   {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "as-like",
        "audience": 35
      },
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  };

  const plays = {
    "as-like": {"name": "As You Like It", "type": "comedy"},
    "othello": {"name": "Othello", "type": "tragedy"}
  };


  let expectedStatement =`\
Statement for BigCo
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,080.00
You earned 22 credits
`;
  expect(statement(invoice, plays)).toBe(expectedStatement)
})

test('build statement of 1 performance', () => {
  const invoice =   {
    "customer": "BigCo",
    "performances": [
      {
        "playID": "othello",
        "audience": 40
      }
    ]
  };

  const plays = {
    "othello": {"name": "Othello", "type": "tragedy"}
  };


  let expectedStatement =`\
Statement for BigCo
  Othello: $500.00 (40 seats)
Amount owed is $500.00
You earned 10 credits
`;
  expect(statement(invoice, plays)).toBe(expectedStatement)
})

test('badType throw error', () => {
  const plays = {
    hamlet: { name: 'Hamlet', type: 'badType' },
  };

  const invoice = {
    customer: 'BigCo',
    performances: [
      {
        playID: 'hamlet',
        audience: 55,
      },
    ],
  };

  expect(() => statement(invoice, plays))
    .toThrow('unknown type: badType');
});


