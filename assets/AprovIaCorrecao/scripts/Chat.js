const API_KEY = 'AIzaSyCY-bbhibbGJMwsB2LBA_1fmelMzSlJXY0'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`

const promptInput = document.getElementById('text-perguntas');
const responseArea = document.getElementById('responseArea');
const sendButton = document.getElementById('sendButton');
const select = document.getElementById('select');
const copiarTexto = () => {navigator.clipboard.writeText(responseArea.innerText), alert('Copiado para a área de tranferência')}

sendButton.addEventListener('click', async () => {   
       
    const prompt = `Você agora é um ciêntista na matéria de ${select.value}, com mais de 30 anos de pesquisa e ensino acadêmico (Não precisa mencionar isso). Seu papel é oferecer explicações profundas e fundamentadas de uma maneira que um aluno de ensino médio entenda. Minha pergunta é ${promptInput.value.trim()} e se essa minha pergunta não estiver relacionada com a matéria escolhida e encerre a tarefa. E se essa pergunta não for relacionada à assuntos didáticos explique que você é uma ia de estudos (Crianças vão utilizar o site evite temas sexuais e/ou muito violentos)`

    //Verificação se o campo de perguntas está preenchido
    if (!promptInput.value.trim()) {
        alert('Por favor, digite algo para enviar')
        return
    }

    responseArea.innerHTML = 'Gerando resposta por favor aguarde...'

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