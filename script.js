const textareaFrom = document.querySelector("#textareaFrom");
const textareaTo = document.querySelector("#textareaTo");
const btnTranslate = document.querySelector("#btnTranslate");
const selects = document.querySelectorAll("select");

const countries = {
  "en-GB": "Inglês",
  "es-ES": "Espanhol",
  "it-IT": "Italiano",
  "ja-JP": "Japonês",
  "pt-BR": "Português",
};

selects.forEach((tag) => {
  for (let country in countries) {
    let selected;
    if (tag.className.includes("selectFrom") && country == "pt-BR") {
      selected = "selected";
    } else if (tag.className.includes("selectTo") && country == "en-GB") {
      selected = "selected";
    }

    const option = `<option value="${country}" ${selected}>${countries[country]}</option>`;

    tag.insertAdjacentHTML("beforeend", option);
  }
});

btnTranslate.addEventListener("click", () => {
    if(textareaFrom.value){
        loadTranslation()
    } else {
        textareaTo.value = "";
    }
})

function loadTranslation() {
    // FETCH - é uma maneira moderna e mais flexível de fazer requisições de rede (como buscar dados de um servidor) 
    fetch(`https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
    ).then((res) => res.json()).then((data) => {
        textareaTo.value = data.responseData.translatedText;
    });
    // .then(): Este método é usado para encadear ações a serem realizadas quando a Promise retornada pela função fetch é resolvida
    // res.json(): Este trecho do código converte o corpo da resposta (res) para um objeto JSON. Isso é necessário porque a resposta de uma requisição fetch geralmente é uma sequência de texto (JSON) e precisa ser convertida em um objeto JavaScript para ser facilmente manipulada.
    // .then((data) => { ... }): Este bloco de código é executado após a conversão do JSON. O objeto data agora contém os dados da resposta no formato JavaScript.
    // textareaTo.value = data.responseData.translatedText;: Finalmente, o valor traduzido é extraído do objeto data e atribuído ao textareaTo.value. 
}