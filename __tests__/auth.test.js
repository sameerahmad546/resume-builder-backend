
const request = require('supertest');
const app = require('../app');

const config = require('../config')

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms));

beforeEach(() => {
   jest.setTimeout(2000)
});
describe('Authentication Endpoints', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .set('x-api-key', '8ArTScAEKzot6HVdYFPIxRXbr9qrEWroovM4s85RqMfThtu6M2aJWnJixHrbzCRD')
      .send({
        name: 'sameer11222',
        email: 'sameer112225665547@gmail.com',
        password: 'password123'
      });
    expect(response.statusCode).toBe(200);
    expect(response._body.message).toBe('User Created Successfully');
  });



  it('should handle if user already created', async () => {
    
    const response = await request(app)
      .post('/api/auth/register')
      .set('x-api-key', '8ArTScAEKzot6HVdYFPIxRXbr9qrEWroovM4s85RqMfThtu6M2aJWnJixHrbzCRD')
      .send({
        name: 'sameer11222',
        email: 'sameer112225665547@gmail.com',
        password: 'password123'
      });
      console.log(response)
    expect(response.statusCode).toBe(400);
    expect(response._body.message).toBe('User already exists');
  });

  it('should log in an existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .set('x-api-key', '8ArTScAEKzot6HVdYFPIxRXbr9qrEWroovM4s85RqMfThtu6M2aJWnJixHrbzCRD')
      .send({
        email: 'sameer112225665547@gmail.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(200);
    expect(response._body.message).toBe('Login Successfully');
  });

  it('should handle invalid login password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .set('x-api-key', '8ArTScAEKzot6HVdYFPIxRXbr9qrEWroovM4s85RqMfThtu6M2aJWnJixHrbzCRD')
      .send({ email: 'sameer112225665547@gmail.com', password: 'password112' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Invalid Password');
  });

  it('should handle invalid user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .set('x-api-key', '8ArTScAEKzot6HVdYFPIxRXbr9qrEWroovM4s85RqMfThtu6M2aJWnJixHrbzCRD')
      .send({ email: 'sameer17122@gmail.com', password: 'password112' });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('No user found');
  });
});
