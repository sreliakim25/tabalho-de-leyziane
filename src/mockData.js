/**
 * BANCO DE DADOS LOCAL (MOCK DATA)
 * 
 * Este arquivo serve como o banco de dados inicial do projeto.
 * Ele contém as trilhas (cursos), as aulas detalhadas, o glossário e a trilha de segurança digital.
 * Esta estrutura facilita a expansão futura para uma API real ou banco de dados relacional.
 * 
 * Comentários didáticos foram adicionados para guiar os alunos sobre a estrutura JSON.
 */

export const mockData = {
  // Lista de Trilhas de Aprendizado (Cursos)
  cursos: [
    {
      id: "nivel-1",
      titulo: "Nível 1 — Primeiros Passos",
      desc: "Para quem nunca ou quase nunca utilizou um computador. Vamos começar do zero absoluto, juntos.",
      nivel: "Iniciante",
      imagem: "💻", // Usamos emojis grandes e amigáveis para evitar placeholders ou URLs quebradas
      ordem: 1,
      totalAulas: 5
    },
    {
      id: "nivel-2",
      titulo: "Nível 2 — Aprendendo Windows",
      desc: "Aprenda a navegar pela tela do computador, organizar seus arquivos, configurar o som, Wi-Fi e usar o sistema.",
      nivel: "Iniciante",
      imagem: "🖥️",
      ordem: 2,
      totalAulas: 3
    },
    {
      id: "nivel-3",
      titulo: "Nível 3 — Internet sem Medo",
      desc: "Entenda o que é a internet, como navegar em sites com segurança, fazer pesquisas e preencher formulários.",
      nivel: "Intermediário",
      imagem: "🌐",
      ordem: 3,
      totalAulas: 3
    },
    {
      id: "nivel-4",
      titulo: "Nível 4 — Sites e Serviços do Dia a Dia",
      desc: "Aprenda na prática a usar e-mail (Gmail), WhatsApp Web, YouTube e fazer pesquisas avançadas de forma autônoma.",
      nivel: "Intermediário",
      imagem: "📱",
      ordem: 4,
      totalAulas: 3
    }
  ],

  // Aulas detalhadas indexadas por curso
  aulas: [
    // --- AULAS DO NÍVEL 1 (Mínimo de 5 aulas exigidas pelo MVP) ---
    {
      id: "aula-1-1",
      cursoId: "nivel-1",
      titulo: "1. O que é um computador?",
      desc: "Entenda de forma muito simples o que compõe um computador e para que ele serve no dia a dia.",
      ordem: 1,
      duracao: "5 min",
      passos: [
        {
          titulo: "O Computador é como uma Mesa de Trabalho",
          conteudo: "Pense no computador como uma mesa. Nela, você tem papel para escrever, gavetas para guardar coisas e ferramentas como caneta e calculadora. O computador faz exatamente isso, mas tudo dentro de uma tela!",
          imagem: "📁"
        },
        {
          titulo: "A Tela (Monitor) e o Gabinete",
          conteudo: "A tela é onde você vê o que está acontecendo (como a superfície da mesa). O gabinete (ou o próprio corpo do notebook) é onde fica o cérebro da máquina, que processa todas as informações que você pede.",
          imagem: "🖥️"
        },
        {
          titulo: "Teclado e Mouse: Suas Mãos Digitais",
          conteudo: "Como nós conversamos com o computador? Através do teclado (para escrever) e do mouse (para apontar e pegar objetos na tela). Sem eles, o computador seria apenas uma TV sem controle remoto.",
          imagem: "⌨️"
        }
      ],
      exercicio: {
        pergunta: "Qual das seguintes partes do computador é responsável por nos ajudar a 'apontar' e 'selecionar' itens na tela?",
        opcoes: [
          "O Teclado",
          "O Mouse",
          "A Impressora",
          "O Gabinete"
        ],
        respostaCorreta: 1, // Índice da resposta correta (O Mouse)
        explicacao: "O mouse funciona como a extensão da sua mão na tela do computador. Você o mexe na mesa física e uma setinha acompanha esse movimento na tela."
      }
    },
    {
      id: "aula-1-2",
      cursoId: "nivel-1",
      titulo: "2. Conhecendo o Teclado e o Mouse",
      desc: "Descubra como segurar o mouse corretamente e identifique as principais teclas do computador.",
      ordem: 2,
      duracao: "7 min",
      passos: [
        {
          titulo: "Como Segurar o Mouse",
          conteudo: "Coloque sua mão sobre o mouse de forma relaxada. O seu dedo indicador deve ficar sobre o botão esquerdo e o dedo médio sobre o botão direito. O dedão apoia na lateral esquerda.",
          imagem: "🖱️"
        },
        {
          titulo: "O Botão Esquerdo (O mais usado)",
          conteudo: "Você usará o botão esquerdo para 95% das coisas! Ele serve para selecionar um botão, abrir um texto ou confirmar uma ação. Pense nele como o seu 'dedo indicador' apontando e tocando algo.",
          imagem: "☝️"
        },
        {
          titulo: "O Botão Direito (O menu de opções)",
          conteudo: "O botão direito serve para abrir uma lista de opções extras sobre o que você clicou. É como se você perguntasse ao computador: 'O que posso fazer com este objeto?'. Ele abrirá um menu suspenso.",
          imagem: "📋"
        }
      ],
      exercicio: {
        pergunta: "Qual botão do mouse você deve usar na maior parte do tempo para abrir links e clicar em botões?",
        opcoes: [
          "O botão direito",
          "A rodinha do meio (Scroll)",
          "O botão esquerdo",
          "Tanto faz, os dois fazem a mesma coisa"
        ],
        respostaCorreta: 2,
        explicacao: "O botão esquerdo é o botão principal de clique e ação rápida. Usamos o direito apenas quando queremos ver opções de configuração ou funções específicas."
      }
    },
    {
      id: "aula-1-3",
      cursoId: "nivel-1",
      titulo: "3. Praticando Cliques com o Mouse",
      desc: "Vamos praticar a diferença entre clicar uma vez, clicar duas vezes e usar o botão direito.",
      ordem: 3,
      duracao: "6 min",
      passos: [
        {
          titulo: "Clique Simples (Selecionar)",
          conteudo: "Dê um toque rápido no botão esquerdo e solte imediatamente. Isso serve para selecionar um arquivo ou apertar um botão na tela. Não aperte com força; um toque leve é suficiente.",
          imagem: "🖱️"
        },
        {
          titulo: "Duplo Clique (Abrir)",
          conteudo: "Dê dois toques muito rápidos com o botão esquerdo no mesmo lugar. Isso serve para abrir um programa ou uma pasta no computador. A dica é dizer: 'clique-clique' bem rápido!",
          imagem: "⚡"
        },
        {
          titulo: "Clicar e Arrastar (Mover)",
          conteudo: "Aperte o botão esquerdo sobre um ícone, mantenha-o pressionado, mova o mouse na mesa e só então solte o botão. Isso serve para mover pastas e objetos de lugar, como se estivesse arrastando um papel na mesa.",
          imagem: "🔄"
        }
      ],
      exercicio: {
        pergunta: "Se você quer abrir uma pasta que está na sua tela, o que você deve fazer com o botão esquerdo do mouse?",
        opcoes: [
          "Dar um clique simples",
          "Dar dois cliques rápidos seguidos (Duplo clique)",
          "Segurar o botão por 5 segundos",
          "Clicar com o botão direito"
        ],
        respostaCorreta: 1,
        explicacao: "O duplo clique rápido avisa ao sistema operacional (Windows) que você deseja 'abrir' ou 'entrar' no item selecionado."
      }
    },
    {
      id: "aula-1-4",
      cursoId: "nivel-1",
      titulo: "4. Aprendendo a Digitar e Corrigir",
      desc: "Conheça as teclas mais importantes do teclado para escrever seus primeiros textos de forma confiante.",
      ordem: 4,
      duracao: "8 min",
      passos: [
        {
          titulo: "As Teclas de Letras e Números",
          conteudo: "O teclado tem a mesma disposição das antigas máquinas de escrever. Basta apertar levemente a letra correspondente para que ela apareça na tela.",
          imagem: "⌨️"
        },
        {
          titulo: "Como dar Espaço e Ir para a Próxima Linha",
          conteudo: "A barra longa no final do teclado serve para separar as palavras com um espaço em branco. A tecla 'Enter' (geralmente grande, no lado direito) serve para enviar uma mensagem ou ir para a linha de baixo.",
          imagem: "↩️"
        },
        {
          titulo: "Como Apagar Letras Erradas",
          conteudo: "A tecla Backspace (geralmente uma seta apontando para a esquerda, no topo direito do teclado) apaga a letra que você acabou de escrever. Se errou, não se preocupe! Basta apertá-la.",
          imagem: "⬅️"
        }
      ],
      exercicio: {
        pergunta: "Qual tecla você pressiona para apagar uma letra ou palavra que digitou errado?",
        opcoes: [
          "A tecla Enter",
          "A Barra de Espaço",
          "A tecla Backspace (Seta para a esquerda acima do Enter)",
          "A tecla Shift"
        ],
        respostaCorreta: 2,
        explicacao: "A tecla Backspace apaga o caractere imediatamente à esquerda do cursor de digitação, permitindo que você corrija erros rapidamente."
      }
    },
    {
      id: "aula-1-5",
      cursoId: "nivel-1",
      titulo: "5. Como Criar e Organizar Pastas",
      desc: "Entenda o conceito de pastas e aprenda a organizar seus arquivos dentro do computador.",
      ordem: 5,
      duracao: "10 min",
      passos: [
        {
          titulo: "O que é uma Pasta?",
          conteudo: "Imagine uma pasta física de papelão onde você guarda suas contas de luz. No computador é igual! Uma pasta serve para agrupar arquivos relacionados (fotos, documentos, receitas) para que você os ache facilmente.",
          imagem: "📂"
        },
        {
          titulo: "Criando sua Primeira Pasta (Passo a Passo)",
          conteudo: "1. Vá para um espaço vazio na tela.\n2. Clique uma vez com o botão DIREITO do mouse.\n3. Uma lista aparecerá. Coloque o mouse em cima de 'Novo' e depois clique em 'Pasta'.\n4. Uma pasta amarela surgirá escrito 'Nova pasta'.",
          imagem: "🆕"
        },
        {
          titulo: "Dando Nome à sua Pasta",
          conteudo: "Assim que a pasta aparecer na tela, você pode digitar o nome que quiser (ex: 'Minhas Fotos'). Depois de digitar, basta apertar a tecla 'Enter' no teclado para confirmar o nome.",
          imagem: "✏️"
        }
      ],
      exercicio: {
        pergunta: "Qual é o primeiro passo para criar uma nova pasta na Área de Trabalho do Windows?",
        opcoes: [
          "Desligar o monitor",
          "Clicar duas vezes rapidamente com o botão esquerdo do mouse",
          "Clicar com o botão direito do mouse em um espaço vazio",
          "Pressionar a tecla Enter"
        ],
        respostaCorreta: 2,
        explicacao: "Clicar com o botão direito abre as opções extras (menu de contexto), onde você encontrará a opção de criar um item 'Novo' e, em seguida, selecionar 'Pasta'."
      }
    },

    // --- EXEMPLOS DE AULAS PARA AS DEMAIS TRILHAS (Exigência do MVP) ---
    {
      id: "aula-2-1",
      cursoId: "nivel-2",
      titulo: "1. Conhecendo a Área de Trabalho",
      desc: "A tela principal do Windows. Aprenda o que é a barra de tarefas e o menu iniciar.",
      ordem: 1,
      duracao: "5 min",
      passos: [
        {
          titulo: "A Área de Trabalho (Desktop)",
          conteudo: "É a tela inicial do computador logo após ligar. Ela contém atalhos para programas e pastas organizadas.",
          imagem: "🖥️"
        }
      ],
      exercicio: {
        pergunta: "O que é a barra horizontal na parte inferior da tela do Windows?",
        opcoes: ["Barra de Navegação", "Barra de Tarefas", "Barra de Espaço", "Menu Iniciar"],
        respostaCorreta: 1,
        explicacao: "A Barra de Tarefas guarda os atalhos de programas abertos e mostra o relógio e conexão de rede."
      }
    },
    {
      id: "aula-3-1",
      cursoId: "nivel-3",
      titulo: "1. O que é a Internet?",
      desc: "Descubra como os computadores do mundo todo se conectam e o que é um navegador de internet.",
      ordem: 1,
      duracao: "6 min",
      passos: [
        {
          titulo: "O que é a Rede Mundial",
          conteudo: "A Internet é como uma grande teia de fios que conecta computadores do mundo todo, permitindo enviar mensagens e ver sites.",
          imagem: "🌐"
        }
      ],
      exercicio: {
        pergunta: "Qual programa usamos em nosso computador para visualizar páginas da internet (sites)?",
        opcoes: ["Um editor de texto", "Um Navegador (Browser)", "O Menu Iniciar", "Um antivírus"],
        respostaCorreta: 1,
        explicacao: "O Navegador (como Google Chrome, Edge ou Firefox) é o programa que lê e exibe os sites para nós."
      }
    },
    {
      id: "aula-4-1",
      cursoId: "nivel-4",
      titulo: "1. Como Usar o WhatsApp Web",
      desc: "Aprenda a conectar e usar o WhatsApp do seu celular diretamente na tela grande do seu computador.",
      ordem: 1,
      duracao: "8 min",
      passos: [
        {
          titulo: "Por que usar no computador?",
          conteudo: "Usar o WhatsApp no computador facilita a leitura com letras maiores e torna a digitação de mensagens longas muito mais rápida usando o teclado físico.",
          imagem: "💬"
        }
      ],
      exercicio: {
        pergunta: "O que precisamos apontar para a tela do computador para conectar o WhatsApp Web?",
        opcoes: ["A tela do computador para outra TV", "A câmera do celular para ler o código QR na tela", "O mouse para o teclado", "O celular desligado na mesa"],
        respostaCorreta: 1,
        explicacao: "A câmera do celular lê o código QR que aparece na tela do computador para autenticar sua conta com segurança."
      }
    }
  ],

  // --- GLOSSÁRIO DE TECNOLOGIA (Mínimo de 10 termos) ---
  glossario: [
    {
      termo: "Wi-Fi",
      definicao: "É a tecnologia que permite ligar o seu computador ou celular à internet sem a necessidade de usar fios físicos.",
      exemplo: "É como uma onda de rádio invisível que leva a internet da caixinha do roteador até o seu aparelho.",
      icone: "📶"
    },
    {
      termo: "Bluetooth",
      definicao: "Uma forma de conectar dois aparelhos que estão pertinho um do outro sem usar fios (como celular e fone de ouvido).",
      exemplo: "É usado para tocar a música do seu celular em uma caixinha de som portátil que está na mesma sala.",
      icone: "🎧"
    },
    {
      termo: "Navegador (Browser)",
      definicao: "O programa que você abre no computador para poder acessar e visitar os sites na internet (como o Google Chrome).",
      exemplo: "Pense nele como a porta de entrada para a rua da internet. Sem ele, você não consegue ver nenhuma página web.",
      icone: "🌐"
    },
    {
      termo: "Link / URL",
      definicao: "É o endereço digital de uma página da internet. Ao clicar em um link, você é levado imediatamente para outro site.",
      exemplo: "O endereço escrito na barra de pesquisa (como www.google.com) é o link/URL para a página de buscas do Google.",
      icone: "🔗"
    },
    {
      termo: "Download",
      definicao: "O ato de puxar ou baixar um arquivo da internet para dentro do seu próprio computador ou celular.",
      exemplo: "Quando você recebe uma foto de um neto no WhatsApp e clica para guardá-la na sua galeria, você fez um download.",
      icone: "📥"
    },
    {
      termo: "Upload",
      definicao: "O oposto de download. É enviar um arquivo que está no seu computador ou celular para a internet.",
      exemplo: "Quando você anexa um documento em um e-mail ou posta uma foto no seu perfil, você está fazendo um upload.",
      icone: "📤"
    },
    {
      termo: "Nuvem (Cloud)",
      definicao: "Computadores gigantescos conectados à internet que guardam fotos e arquivos para você não ocupar espaço no seu aparelho.",
      exemplo: "Ao invés de encher a memória física do seu celular com fotos, elas ficam guardadas 'na nuvem' e você pode acessá-las de qualquer lugar.",
      icone: "☁️"
    },
    {
      termo: "PDF",
      definicao: "Um tipo de arquivo muito seguro usado para documentos. Ele garante que a formatação e as letras continuem iguais em qualquer tela.",
      exemplo: "Boletos de banco, manuais de aparelhos e contratos digitais costumam vir sempre no formato PDF.",
      icone: "📄"
    },
    {
      termo: "Login",
      definicao: "O processo de se identificar em um site digitando seu nome de usuário ou e-mail, provando quem você é.",
      exemplo: "É como usar a chave correta para abrir a porta da sua casa digital (sua conta do banco ou seu e-mail).",
      icone: "🔑"
    },
    {
      termo: "Senha (Password)",
      definicao: "Uma combinação secreta de letras, números ou símbolos que protege suas contas contra acessos de estranhos.",
      exemplo: "Funciona exatamente como o segredo do cadeado ou a senha do seu cartão de crédito físico.",
      icone: "🔒"
    }
  ],

  // --- TRILHA DE SEGURANÇA DIGITAL ---
  seguranca: [
    {
      id: "seg-1",
      titulo: "Senha do banco por mensagem de texto",
      descricao: "Você recebe um SMS dizendo que sua conta foi bloqueada e precisa clicar no link abaixo e digitar sua senha imediatamente.",
      classificacao: "GOLPE", // PODE CONFIAR, CUIDADO, GOLPE
      dica: "Bancos nunca solicitam senhas ou dados sigilosos por mensagens de celular ou e-mail. Na dúvida, ligue para o seu gerente."
    },
    {
      id: "seg-2",
      titulo: "Site de Compras com cadeado verde",
      descricao: "Ao fazer compras online, você repara que ao lado do endereço do site (link) existe um desenho de cadeado fechado e o site começa com 'https://'.",
      classificacao: "CONFIAR",
      dica: "O cadeado fechado indica que os dados digitados naquela página são transmitidos com criptografia segura."
    },
    {
      id: "seg-3",
      titulo: "Desconto absurdo no WhatsApp",
      descricao: "Um amigo envia um link com a mensagem: 'Ganhe um cupom de R$ 500 do Boticário! Clique e responda a pesquisa'.",
      classificacao: "CUIDADO",
      dica: "Promoções muito boas costumam ser falsas para capturar seus dados pessoais. Acesse o site oficial da marca para conferir."
    }
  ],

  // --- CONQUISTAS GAMIFICADAS ---
  conquistas: [
    { id: "primeiro-passo", titulo: "Primeiro Passo", desc: "Você concluiu sua primeira aula com sucesso!", icone: "🌱" },
    { id: "explorador", titulo: "Explorador", desc: "Aprendeu a criar e organizar pastas no computador.", icone: "📂" },
    { id: "navegador", titulo: "Navegador", desc: "Aprendeu a usar um navegador e abrir abas na internet.", icone: "🧭" },
    { id: "seguro-internet", titulo: "Seguro na Internet", desc: "Concluiu todas as lições sobre segurança digital.", icone: "🛡️" },
    { id: "independente", titulo: "Independente", desc: "Concluiu a trilha inicial de primeiros passos!", icone: "🎓" }
  ]
};
