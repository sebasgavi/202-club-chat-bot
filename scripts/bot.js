class ChatBot {

  constructor() {
    this.base = 'https://api.spacexdata.com/v4';
  }

  async getNextLaunch() {
    const res = await fetch(`${this.base}/launches/next`);
    const obj = await res.json();
    return obj;
  }

  async answer(text) {

    if (/^hola\s?.*/.test(text)) {
      if (/dame un random/.test(text)) {
        const r = Math.floor(Math.random() * 99999);
        return `Tu random es: ${r}`;
      }

      if (/^hola\s?.*/.test(text)) {
        return 'El bot dice "Hola"';
      }

      const introRegex = /^me llamo (.+)$/;
      if (introRegex.test(text)) {
        const match = text.match(introRegex);
        console.log(match)
        return `Hola ${match[1]}, soy Bot.`;
      }

      if (/pr[oó]ximo lanzamiento/.test(text)) {
        const obj = await this.getNextLaunch();
        const date = new Date(obj.date_local);
        return `El próximo lanzamiento será el día ${date.toLocaleDateString()}`;
      }

      if (/mejor lenguaje/.test(text)) {
        return 'El bot dice: Java > JS';
      }

      return null;
    }
  }
}