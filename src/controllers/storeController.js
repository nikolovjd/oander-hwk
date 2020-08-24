const getKey = async (services, req, res) => {
  const { key } = req.params;

  req.logger.info(`Requesting key "${key}" from store`, { key });
  const value = await services.store.get(key, req.logger);

  JSON.parse('penis')

  return res.json({
    success: true,
    value,
  })
};

const setKey = async (services, req, res) => {
  const { key } = req.params;
  const body = req.body;

  req.logger.info(`Storing key "${key}" in store`, { key });
  await services.store.set(key, body, req.logger);

  return res.json({
    success: true,
  })
};

const deleteKey = async (services, req, res) => {
  const { key } = req.params;

  req.logger.info(`Deleting key "${key}" from store`, { key });
  await services.store.del(key, req.logger);

  return res.json({
    success: true,
  })
};

module.exports = {
  getKey,
  setKey,
  deleteKey
}
