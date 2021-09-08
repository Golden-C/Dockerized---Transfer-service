import request from 'supertest';
import app from '../src/app';

describe('TEST FOR POST METHODS API', () => {
  test('Should return 201 for created account', async () => {
    const data = {
      accountNumber: 1234568888,
      balance: 12000,
    };
    await request(app)
      .post('/create-account')
      .send(data)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201);
  });

  test('Should return 404 for invalid account number', async () => {
    const data = { accountNumber: 12345 };
    await request(app)
      .post('/create-account')
      .send(data)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });

  test('Should return 404 for account number that already exist', async () => {
    const data = { accountNumber: 1234567898 };
    await request(app)
      .post('/create-account')
      .send(data)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });

  test('Should return 201 for sucessful transfer', async () => {
    const data = {
      senderAccount: 1234567893,
      amount: 1000,
      receiverAccount: 1234567894,
      transferDescription: 'done',
    };
    await request(app)
      .post('/transfer')
      .send(data)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(201);
  });

  test('Should return 404 for receiver account not found', async () => {
    const data = {
      senderAccount: 1234567893,
      amount: 1000,
      receiverAccount: 1134567894,
      transferDescription: 'done',
    };
    await request(app)
      .post('/transfer')
      .send(data)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });

  test('Should return 404 for insufficient fund', async () => {
    const data = {
      senderAccount: 1234567893,
      amount: 100000,
      receiverAccount: 1134567894,
      transferDescription: 'done',
    };
    await request(app)
      .post('/transfer')
      .send(data)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });

  test('Should return 404 for sender account not found', async () => {
    const data = {
      senderAccount: 1224567893,
      amount: 1000,
      receiverAccount: 1134567894,
      transferDescription: 'done',
    };
    await request(app)
      .post('/transfer')
      .send(data)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });
});

describe('TEST THE GET METHODS FOR API', () => {
  test('Should return 200, and json for single account by account number', async () => {
    await request(app)
      .get('/balance/1234567893')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });

  test('Should return 404 for invalid account number', async () => {
    await request(app)
      .get('/balance/123456789999')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(404);
  });

  test('should return 200, and json for all accounts', async () => {
    await request(app)
      .get('/balance')
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200);
  });

  // test("Should return 404 for no account in database", async () => {
  //   await request(app)
  //     .get("/balance")
  //     .expect("Content-Type", "application/json; charset=utf-8")
  //     .expect(404);
  // });
});
