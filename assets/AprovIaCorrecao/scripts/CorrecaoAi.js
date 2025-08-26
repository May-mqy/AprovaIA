const API_KEY = 'AIzaSyCY-bbhibbGJMwsB2LBA_1fmelMzSlJXY0'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

const promptInput = document.getElementById('text-composition');
const responseArea = document.getElementById('responseArea');
const sendButton = document.getElementById('sendButton');
const copiarTexto = () => {navigator.clipboard.writeText(responseArea.innerText), alert('Copiado para a área de tranferência')}

sendButton.addEventListener('click', async () => {   
    //const prompt = `Tenho uma dúvida: ${promptInput.value.trim()} referente a matéria de ${select.value}`
    
    const prompt = `Você agora é um especialista em corrigir redações (detalhe não precisa mostrar isso), com mais de 30 anos de experiência e ensino acadêmico. Seu papel é corrigir as minhas redações de forma concisa (Atenção: se a redação não tiver conteúdo avise apenas que não tem uma redação para corrigir).(Caso o texto tenha menos de 140 palavras diga que esse texto não é uma redação e explique que uma redação tem que ter no minímo 140 palávras). (Se a minha redação não ter estrutura nem tema realmente relevante: diga que você é uma IA capaz apenas de corrigir redações); Minha redação é ${promptInput.value.trim()}, me aponte os erros e pontos de acertos.`

    //Verificação se o campo de perguntas está preenchido
    if (!promptInput) {
        alert('Por favor, digite algo para enviar')
        return
    }


    responseArea.innerHTML = 'Gerando correção por favor aguarde...'

    //A parte a baixo é o código destindo á requisição da api atavés do método post
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text:prompt
                    }]
                }]
            })
        })

        if (!response.ok) {
            throw new Error(`Erro na API ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
            const generatedText = data.candidates[0].content.parts[0].text
             responseArea.innerHTML = marked.parse(generatedText)
        }
        else {
            responseArea.innerHTML = "Não foi possível apresentar uma resposta qualificada"
        }
    }

    catch (error) {
        console.error("Erro ao chamar a API:", error);
        responseArea.innerHTML = `Ocorreu um erro: ${error.message}`;
    }


})

//Botão Acessibilidade*/
    // Selecionando os botões
const btnAbrirLeitor = document.getElementById("abrirLeitor");
const btnLer = document.getElementById("lerPagina");
const btnPausar = document.getElementById("pausarAudio");
const btnRetomar = document.getElementById("retomarAudio");

let utterance;
let isPaused = false;

// Abre/fecha os controles do leitor
btnAbrirLeitor.addEventListener("click", () => {
  document.querySelector(".leitor-controles").classList.toggle("ativo");
});

// Função para iniciar leitura da página
btnLer.addEventListener("click", () => {
  const texto = document.body.innerText; // lê o texto da página inteira
  utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = "pt-BR"; // define português do Brasil
  speechSynthesis.cancel(); // cancela qualquer leitura anterior
  speechSynthesis.speak(utterance);
  isPaused = false;
});

// Pausar leitura
btnPausar.addEventListener("click", () => {
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    isPaused = true;
  }
});

// Retomar leitura
btnRetomar.addEventListener("click", () => {
  if (isPaused) {
    speechSynthesis.resume();
    isPaused = false;
  }
});
