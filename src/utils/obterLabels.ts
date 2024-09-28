export function obterLabels(obj: any) {
  const labels = [];
  for (const chave in obj) {
    if (obj.hasOwnProperty(chave) && obj[chave].hasOwnProperty("label")) {
      labels.push(chave);
    }
  }
  return labels;
}
