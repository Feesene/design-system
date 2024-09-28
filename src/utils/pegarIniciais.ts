function pegarIniciais(nomeCompleto?: string) {
  if (!nomeCompleto) return "";

  const words = nomeCompleto.split(" ");

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  } else {
    return words
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
}

export default pegarIniciais;
