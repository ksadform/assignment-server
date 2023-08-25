exports.tryCatch = async (cb) => {
  try {
    const data = await cb();
    return [data, null];
  } catch (e) {
    return [null, e];
  }
};
