const getDbConnection = dbUrl => {
  return new Promise(resolve => {
    resolve(dbUrl);
  });
};

const getValueInSeconds = (value, seconds, hasError) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => (hasError ? reject("Bad error") : resolve(value)),
      seconds * 1000
    );
  });
};
