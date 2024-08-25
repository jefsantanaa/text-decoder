const inputText = document.getElementById('input-text');
const encodeButton = document.getElementById('encode-button');
const decodeButton = document.getElementById('decode-button');
const decodedTextsSection = document.getElementById('decoded-texts');
const copyButton = document.getElementById('copy-button');
let decodedTexts = [];
let selectedTextIndex = null;

const hideNonTextAlert = () => {
  document.getElementById('no-content-alert').style.display = "none";
}

const showHeading = () => {
  const heading = document.querySelector('h1');
  heading.innerHTML = 'Encrypted Texts';
}  

const encode = (text) => {
  return text
    .replace(/e/g, 'enter')
    .replace(/i/g, 'imes')
    .replace(/a/g, 'ai')
    .replace(/o/g, 'ober')
    .replace(/u/g, 'ufat');
};

const decode = (text) => {
  return text
    .replace(/enter/g, 'e')
    .replace(/imes/g, 'i')
    .replace(/ai/g, 'a')
    .replace(/ober/g, 'o')
    .replace(/ufat/g, 'u');
};

encodeButton.addEventListener('click', () => {
  const text = inputText.value.trim();
  if (text && /^[a-z\s]+$/.test(text)) {
    hideNonTextAlert();
    showHeading();
    const encodedText = encode(text);
    if (decodedTexts.length < 3) {
      decodedTexts.push(encodedText);
      const decodedTextNode = document.createElement('p');
      decodedTextNode.textContent = encodedText;
      decodedTextNode.addEventListener('click', () => selectText(decodedTextNode));
      decodedTextsSection.appendChild(decodedTextNode);
      inputText.value = '';
      decodeButton.disabled = false;
      if (decodedTexts.length === 3) {
        encodeButton.disabled = true;
      }
    } else {
      alert("Máximo de 3 textos descodificados alcançado.");
    }
  } else {
    alert("Por favor, insira apenas letras minúsculas sem acentos ou caracteres especiais.");
  }
});

decodeButton.addEventListener('click', () => {
  const text = inputText.value.trim();
  if (text && /^[a-z\s]+$/.test(text)) {
    const decodedText = decode(text);
    inputText.value = decodedText;
  } else {
    alert("Por favor, insira um texto válido.");
  }
});

inputText.addEventListener('input', () => {
  decodeButton.disabled = !inputText.value.trim();
});

const selectText = (textNode) => {
  const paragraphs = decodedTextsSection.querySelectorAll('p');
  paragraphs.forEach((p, index) => {
    if (p === textNode) {
      p.classList.add('selected');
      selectedTextIndex = index;
    } else {
      p.classList.remove('selected');
    }
  });
  copyButton.disabled = false;
};

copyButton.addEventListener('click', () => {
  if (selectedTextIndex !== null) {
    const selectedText = decodedTexts[selectedTextIndex];
    navigator.clipboard.writeText(selectedText).then(() => {
      alert("Texto copiado para a área de transferência!");
    }).catch(err => {
      console.error('Erro ao copiar o texto: ', err);
    });
  }
});
