const quizQuestions = [
    {
        question: "Qual é o objetivo central do ODS 4 (Objetivo de Desenvolvimento Sustentável 4)?",
        options: [
            "Erradicar a pobreza extrema no mundo.",
            "Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem.",
            "Garantir a igualdade de gênero e o empoderamento feminino.",
            "Reduzir as emissões de carbono em escolas e universidades."
        ],
        correctIndex: 1
    },
    {
        question: "Marque a alternativa INCORRETA sobre as metas do ODS 4 até 2030:",
        options: [
            "Garantir que meninas e meninos completem o ensino primário e secundário de qualidade.",
            "Assegurar a igualdade de acesso à educação técnica, profissional e superior de qualidade.",
            "Privatizar totalmente o ensino básico para garantir investimento privado na educação.",
            "Eliminar as disparidades de gênero na educação."
        ],
        correctIndex: 2
    },
    {
        question: "O ODS 4 destaca a importância de 'Instalações físicas para educação'. Qual das características abaixo NÃO é um requisito?",
        options: [
            "Adequadas para crianças.",
            "Sensíveis às deficiências.",
            "Sensíveis ao gênero.",
            "Focadas apenas no ensino digital, eliminando a necessidade de salas de aula."
        ],
        correctIndex: 3
    },
    {
        question: "Por que a educação de qualidade é chave para alcançar outros ODS?",
        options: [
            "Porque é a única ODS que recebe financiamento da ONU.",
            "Porque empodera as pessoas, ajudando a quebrar o ciclo da pobreza.",
            "Porque reduz o número de escolas necessárias no futuro.",
            "Porque a educação é focada apenas em tecnologia que resolve problemas climáticos."
        ],
        correctIndex: 1
    },
    {
        question: "Qualifique a afirmação INCORRETA sobre o acesso à educação em escala global:",
        options: [
            "Crianças em áreas rurais ou zonas de conflito têm menos chances de frequentar a escola.",
            "A pandemia de COVID-19 não teve nenhum impacto significativo no progresso do ODS 4.",
            "Ainda existem milhões de crianças fora da escola em todo o mundo.",
            "Meninas ainda enfrentam maiores barreiras para acessar a educação em algumas regiões."
        ],
        correctIndex: 1
    },
    {
        question: "Segundo o ODS 4, qual deve ser o foco da educação pré-escolar?",
        options: [
            "Apenas alfabetização rigorosa e matemática avançada.",
            "Preparação exclusiva para o mercado de trabalho industrial.",
            "Desenvolvimento na primeira infância de qualidade e cuidados para o ensino primário.",
            "Treinamento físico avançado para esportes."
        ],
        correctIndex: 2
    },
    {
        question: "O ODS 4 menciona a promoção do desenvolvimento sustentável através da educação. O que isso engloba?",
        options: [
            "Educação para o desenvolvimento sustentável, direitos humanos e promoção da paz.",
            "Apenas o ensino de biologia e ecologia em escolas técnicas.",
            "Obrigar todas as crianças a trabalharem na agricultura desde o ensino básico.",
            "Cortar o financiamento de escolas que não têm painéis solares."
        ],
        correctIndex: 0
    },
    {
        question: "Assinale a alternativa INCORRETA sobre a qualificação de professores (Meta 4.c):",
        options: [
            "Busca aumentar substancialmente o contingente de professores qualificados.",
            "A cooperação internacional para a formação de professores é estimulada.",
            "Qualquer pessoa, independente de formação, pode e deve atuar como educador.",
            "Professores são a chave para melhorar a qualidade da educação."
        ],
        correctIndex: 2
    },
    {
        question: "O que o ODS 4 defende em relação ao ensino superior e profissionalizante?",
        options: [
            "Acesso igualitário para todos e todas, a preços acessíveis e de qualidade.",
            "Deve ser restrito a uma pequena elite para garantir a qualidade intelectual do país.",
            "Só deve ser focado em cursos de tecnologia da informação.",
            "Deve ser gratuito apenas para homens."
        ],
        correctIndex: 0
    },
    {
        question: "Sobre as 'bolsas de estudo' abordadas no ODS 4, marque a alternativa correta:",
        options: [
            "O ODS 4 prega a abolição das bolsas de estudo globais.",
            "As bolsas de estudo devem ser concedidas apenas para cursos de artes.",
            "A meta é expandir o número de bolsas de estudo para os países em desenvolvimento.",
            "Bolsas de estudo devem ser cobradas posteriormente com juros altíssimos."
        ],
        correctIndex: 2
    },
    {
        question: "Qual das seguintes ações NÃO contribui de forma positiva para o atingimento do ODS 4?",
        options: [
            "Melhorar a infraestrutura das escolas rurais.",
            "Aumentar o salário e oferecer formação contínua aos professores.",
            "Reduzir o investimento público na educação básica.",
            "Criar programas de alfabetização para adultos."
        ],
        correctIndex: 2
    },
    {
        question: "A Educação Inclusiva (uma das premissas do ODS 4) significa:",
        options: [
            "Separar alunos por nível de inteligência em escolas diferentes.",
            "Garantir que o sistema educacional acolha todos, independente de suas condições.",
            "Focar apenas no ensino de crianças superdotadas.",
            "Incluir apenas matérias exatas no currículo."
        ],
        correctIndex: 1
    },
    {
        question: "Sobre a alfabetização de jovens e adultos, marque a opção INCORRETA:",
        options: [
            "É uma meta garantir que todos os jovens tenham habilidades de leitura e escrita.",
            "Uma proporção substancial de adultos deve alcançar a alfabetização.",
            "A alfabetização e o letramento são fundamentais para a participação na sociedade.",
            "Adultos que não aprenderam a ler na infância não devem ser alvo de políticas públicas."
        ],
        correctIndex: 3
    },
    {
        question: "Qual competência o ODS 4 visa desenvolver em jovens e adultos para o emprego?",
        options: [
            "Nenhuma, a educação deve ser puramente teórica e filosófica.",
            "Apenas força de trabalho braçal sem necessidade de estudo técnico.",
            "Habilidades relevantes, incluindo competências técnicas e profissionais.",
            "Apenas fluência em três línguas estrangeiras."
        ],
        correctIndex: 2
    },
    {
        question: "Em relação ao impacto da violência no ambiente escolar, qual a posição do ODS 4?",
        options: [
            "A violência é vista como uma forma de disciplina necessária.",
            "O ODS 4 não aborda a segurança nas escolas.",
            "A violência afeta a aprendizagem; a meta é proporcionar ambientes não violentos.",
            "Escolas devem ter segurança armada em todas as salas como única solução."
        ],
        correctIndex: 2
    },
    {
        question: "O ODS 4 defende o conceito de 'aprendizagem ao longo da vida'. Isso significa que:",
        options: [
            "As pessoas devem ter oportunidades de aprender e se atualizar continuamente.",
            "As pessoas devem frequentar a mesma escola desde a infância até a velhice.",
            "Só idosos precisam continuar aprendendo.",
            "O currículo escolar deve durar 40 anos para ser finalizado."
        ],
        correctIndex: 0
    },
    {
        question: "Qual das opções NÃO representa uma barreira à educação de qualidade?",
        options: [
            "Pobreza extrema.",
            "Conflitos armados e guerras.",
            "Distribuição de material didático gratuito e atualizado.",
            "Falta de infraestrutura básica, como água limpa nas escolas."
        ],
        correctIndex: 2
    },
    {
        question: "A Agenda 2030, que inclui o ODS 4, foi criada por qual organização internacional?",
        options: [
            "Organização Mundial do Comércio (OMC)",
            "União Europeia (UE)",
            "Fundo Monetário Internacional (FMI)",
            "Organização das Nações Unidas (ONU)"
        ],
        correctIndex: 3
    },
    {
        question: "Selecione a alternativa INCORRETA sobre o papel da tecnologia na educação:",
        options: [
            "Pode ajudar a democratizar o acesso ao conhecimento, desde que haja inclusão digital.",
            "As TICs podem apoiar a formação de professores.",
            "A tecnologia por si só, sem planejamento pedagógico, resolve os problemas educacionais.",
            "Ferramentas digitais devem ser utilizadas para melhorar a qualidade da aprendizagem."
        ],
        correctIndex: 2
    },
    {
        question: "Para o alcance das metas do ODS 4, quem são os atores responsáveis envolvidos?",
        options: [
            "Apenas os governos nacionais.",
            "Governos, sociedade civil, setor privado e educadores, atuando em conjunto.",
            "Exclusivamente as organizações não governamentais (ONGs).",
            "Apenas os pais e os alunos, individualmente."
        ],
        correctIndex: 1
    }
];
