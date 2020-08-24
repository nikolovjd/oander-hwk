const Store = require('./store');
const redis = require('redis');
const logger = require('../../logger');

// Example object and encoded base64 string
const body = {
  test: {
    value: 'true',
    number: 123
  }
};

const encodedBody = 'eyJ0ZXN0Ijp7InZhbHVlIjoidHJ1ZSIsIm51bWJlciI6MTIzfX0=';

// Basic redis mock
const mockGet = jest.fn((a, callback) => callback(null, encodedBody));
const mockSet = jest.fn((a, b, callback) => callback(null, true));
const mockDel = jest.fn((a, callback) => callback(null, true));
const mockExists = jest.fn((a, callback) => callback(null, true));

afterEach(() => {
  jest.clearAllMocks();
});

jest.mock('redis', () => ({
  createClient: jest.fn(() => ({
    get: mockGet,
    set: mockSet,
    del: mockDel,
    exists: mockExists,
  }))
}));

// Mock out logger
jest.mock('../../logger');

test('Store service creates a redis client', () => {
  const store = new Store({ host: '', port: 1 });
  expect(redis.createClient).toHaveBeenCalledTimes(1);
});

test('Set operation calls redisClient.set', async () => {
  const store = new Store({ host: '', port: 1 });
  await store.set('key', 'value');
  expect(mockSet).toHaveBeenCalledTimes(1);
});

test('Set operation calls redisClient.set', async () => {
  const store = new Store({host: '', port: 1});
  await store.set('key', { value: 'value' });
  expect(mockSet).toHaveBeenCalledTimes(1);
});

test('Set operation encodes object as base64 string', async () => {
  const store = new Store({host: '', port: 1});
  await store.set('key', body);
  expect(mockSet).toBeCalledWith('key', encodedBody, expect.anything());
});

test('Get operation calls redisClient.get', async () => {
  const store = new Store({ host: '', port: 1 });
  await store.get('key');
  expect(mockGet).toHaveBeenCalledTimes(1);
});

test('Get operation decodes base64 into object', async () => {
  const store = new Store({ host: '', port: 1 });
  const value = await store.get('key');
  expect(value).toStrictEqual(body);
});

test('Del operation checks if value exists', async () => {
  const store = new Store({ host: '', port: 1 });
  await store.del('key');
  expect(mockExists).toHaveBeenCalledTimes(1);
});

test('Del operation should throw 404 if value doesnt exist', async () => {
  const store = new Store({ host: '', port: 1 });
  mockExists.mockImplementationOnce((a, callback) => callback(null, false));
  await expect(store.del('key')).rejects.toThrow();
});

test('Del operation calls redisClient.del', async () => {
  const store = new Store({ host: '', port: 1 });
  await store.del('key');
  expect(mockExists).toHaveBeenCalledTimes(1);
});
