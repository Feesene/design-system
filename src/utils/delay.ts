async function delay(number: number) {
  return await new Promise((resolve: any) => {
    setTimeout(() => {
      resolve();
      return true;
    }, number);
  });
}

export default delay;
