function mudarTonalidadeCor(hex: string, percent: number) {
  try {
    // Remove o '#' se estiver presente
    hex = hex.replace("#", "");

    // Converte a cor hexadecimal para RGB
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    // Calcula o valor de diminuição (percent deve ser negativo para escurecer)
    const factor = 1 - percent / 100;

    // Aplica o fator para escurecer a cor
    r = Math.floor(r * factor);
    g = Math.floor(g * factor);
    b = Math.floor(b * factor);

    // Garante que os valores estejam no intervalo [0, 255]
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Converte de volta para hexadecimal e adiciona zeros à esquerda, se necessário
    const darkenedHex =
      "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0");

    return darkenedHex;
  } catch (err) {
    console.error(err);
    return hex;
  }
}

export default mudarTonalidadeCor;
