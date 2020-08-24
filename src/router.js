const express = require('express');
const services = require('./services/container');
const storeController = require('./controllers/storeController');
const logger = require('./logger').child({ service: 'router' })

const withServices = (controller) => controller.bind(null, services);

// Async handler is used so express can handle async errors in the controllers
const asyncHandler = fn => (req, res, next) => {
  return Promise
    .resolve(fn(req, res, next))
    .catch(next)
}

const methods = [
  'get',
  'post',
  'delete'
];

toAsyncRouter = router => {
  for (let key in router) {
    if (methods.includes(key)) {
      let method = router[key]
      router[key] = (path, ...callbacks) => method.call(router, path, ...callbacks.map(cb =>
        asyncHandler(withServices(cb))));
    }
  }
  return router
}

const router = toAsyncRouter(express.Router());

// Set up routes
router.get('/:key', storeController.getKey);
router.post('/:key', storeController.setKey);
router.delete('/:key', storeController.deleteKey);
logger.debug('routes set up');

module.exports = router;
