const quizData = [
    {
        question: "O que caracteriza os modelos de Inteligência Artificial Generativa (GenAI)?",
        options: [
            "Capacidade de realizar apenas cálculos matemáticos estruturados e simples.",
            "Capacidade de criar conteúdos originais (textos, códigos, imagens) a partir do aprendizado de padrões em grandes bases de dados.",
            "Execução mecânica de tarefas sem a necessidade de qualquer treinamento prévio.",
            "Processamento exclusivo em supercomputadores quânticos não acessíveis via nuvem."
        ],
        correct: 1,
        category: "IA Generativa"
    },
    {
        question: "O que significa o termo RAG (Retrieval-Augmented Generation) na arquitetura de IA atual?",
        options: [
            "Random Algorithmic Generation: técnica para aleatorizar respostas da IA.",
            "Retrieval-Augmented Generation: método que combina busca em bases externas de dados com o modelo generativo para respostas mais precisas.",
            "Recurrent Neural Group: uma estrutura antiga de processamento de áudio.",
            "Real-time Automated Guidance: sistema de piloto automático para robótica industrial."
        ],
        correct: 1,
        category: "Arquitetura & Engenharia"
    },
    {
        question: "No contexto de Grandes Modelos de Linguagem (LLMs), o que é uma 'Alucinação'?",
        options: [
            "Um erro de hardware devido a superaquecimento da placa de vídeo (GPU).",
            "Quando o modelo recusa uma resposta por violar termos de uso.",
            "A geração de informações incorretas ou sem fundamento, apresentadas com tom de certeza e coerência gramatical.",
            "O processo de conversão automática de arquivos PDF para imagens 3D."
        ],
        correct: 2,
        category: "Confiabilidade & LLMs"
    },
    {
        question: "Qual foi a grande inovação da arquitetura Transformer lançada para o processamento de dados sequenciais?",
        options: [
            "Mecanismo de Atenção (Self-Attention), permitindo processar todas as partes de uma sequência em paralelo.",
            "Eliminação da necessidade de utilizar energia elétrica no treinamento de redes neurais.",
            "Substituição de algoritmos por regras manuais de programação.",
            "Uso obrigatório de transistores de fibra óptica."
        ],
        correct: 0,
        category: "Deep Learning"
    },
    {
        question: "Qual é a relação estrutural entre Machine Learning (ML) e Deep Learning (DL)?",
        options: [
            "São duas tecnologias totalmente concorrentes sem qualquer ligação.",
            "Deep Learning é um subconjunto do Machine Learning baseado em redes neurais artificiais com múltiplas camadas.",
            "Machine Learning utiliza obrigatoriamente robôs humanóides, enquanto Deep Learning é exclusivo de software.",
            "Machine Learning é uma evolução direta lançada após o Deep Learning."
        ],
        correct: 1,
        category: "Fundamentos de IA"
    },
    {
        question: "O que define o conceito de 'Agentes de IA' (Agentic AI) nas aplicações modernas?",
        options: [
            "Sistemas autônomos capazes de planejar, utilizar ferramentas externas e executar sequências de tarefas para atingir um objetivo com pouca ou nenhuma intervenção humana contínua.",
            "Chatbots simples baseados em regras rígidas de 'se/senão' para FAQ.",
            "Programas de antivírus que verificam anexos de e-mail automaticamente.",
            "Sistemas operacionais de smartphones antigos."
        ],
        correct: 0,
        category: "Sistemas Autônomos"
    },
    {
        question: "Qual é o objetivo principal da técnica de Fine-Tuning (Ajuste Fino) em um modelo de linguagem?",
        options: [
            "Deletar a memória do modelo para reutilizá-lo do zero.",
            "Adaptar um modelo pré-treinado genérico ajustando seus parâmetros para especializá-lo em um domínio ou tarefa específica.",
            "Aumentar a velocidade física do processador central (CPU).",
            "Compactar arquivos de texto para economizar espaço em disco."
        ],
        correct: 1,
        category: "Treinamento & Modelos"
    },
    {
        question: "O que mede o historicamente famoso 'Teste de Turing'?",
        options: [
            "A taxa máxima de transferência de gigabits por segundo de uma rede.",
            "A capacidade de uma máquina demonstrar comportamento inteligente indistinguível do comportamento humano.",
            "O custo financeiro por hora de processamento em nuvem.",
            "A precisão do reconhecimento de impressões digitais."
        ],
        correct: 1,
        category: "História & Teoria"
    },
    {
        question: "O que caracteriza o 'Viés Algorítmico' (Algorithmic Bias) em modelos de Inteligência Artificial?",
        options: [
            "Distorções sistemáticas e injustas nas decisões da IA provocadas por dados de treinamento preconceituosos ou incompletos.",
            "O consumo excessivo de memória RAM por algoritmos não otimizados.",
            "A preferência do software por rodar em determinado sistema operacional.",
            "Erros randômicos causados por oscilações na rede elétrica."
        ],
        correct: 0,
        category: "Ética & Governança"
    },
    {
        question: "Qual o foco principal do conceito de Alinhamento de IA (AI Alignment)?",
        options: [
            "Garantir que as metas, decisões e comportamentos do sistema de IA estejam alinhados com a segurança, ética e intenções humanas.",
            "Organizar fisicamente os servidores nos racks dos Data Centers.",
            "Sincronizar a hora local de todos os computadores que acessam a API.",
            "Padronizar as cores dos gráficos gerados pela inteligência artificial."
        ],
        correct: 0,
        category: "Segurança & Governança"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// Elementos DOM
const quizCard = document.getElementById('quiz-card');
const resultsCard = document.getElementById('results-card');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const questionCount = document.getElementById('question-count');
const categoryTag = document.getElementById('category-tag');
const progressBar = document.getElementById('progress-bar');
const nextBtn = document.getElementById('next-btn');
const finalScore = document.getElementById('final-score');
const resultsFeedback = document.getElementById('results-feedback');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
    selectedOption = null;
    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestionIndex === quizData.length - 1 ? "Finalizar Avaliação" : "Próxima Pergunta";

    const currentData = quizData[currentQuestionIndex];
    
    questionText.textContent = currentData.question;
    questionCount.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;
    categoryTag.textContent = currentData.category;
    
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    optionsContainer.innerHTML = '';
    
    const prefixes = ['A', 'B', 'C', 'D'];
    
    currentData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.innerHTML = `<span class="option-prefix">${prefixes[index]})</span> ${option}`;
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

function selectOption(index, button) {
    const allOptions = optionsContainer.querySelectorAll('.option-btn');
    allOptions.forEach(btn => btn.classList.remove('selected'));
    
    button.classList.add('selected');
    selectedOption = index;
    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    if (selectedOption === null) return;

    if (selectedOption === quizData[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    quizCard.style.display = 'none';
    resultsCard.style.display = 'block';

    const percentage = Math.round((score / quizData.length) * 100);
    finalScore.textContent = `${percentage}%`;

    if (percentage >= 80) {
        resultsFeedback.innerHTML = `<strong>Desempenho Excelente!</strong><br>Você demonstrou domínio avançado sobre os conceitos estratégicos e técnicos de Inteligência Artificial.`;
    } else if (percentage >= 50) {
        resultsFeedback.innerHTML = `<strong>Desempenho Satisfatório!</strong><br>Você possui uma boa base sobre IA, mas pode aprofundar em tópicos como RAG, Arquiteturas e Governança.`;
    } else {
        resultsFeedback.innerHTML = `<strong>Necessita Revisão!</strong><br>Recomendamos a leitura dos materiais corporativos sobre conceitos fundamentais e éticos de IA.`;
    }
}

restartBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    resultsCard.style.display = 'none';
    quizCard.style.display = 'block';
    loadQuestion();
});

// Inicialização
loadQuestion();