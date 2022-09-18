const encode = (data: string) => {
  return Buffer.from(data, 'utf-8').toString('base64');
};

const decode = (data: string) => {
  return Buffer.from(data, 'base64').toString('utf-8');
};

export { encode, decode };
