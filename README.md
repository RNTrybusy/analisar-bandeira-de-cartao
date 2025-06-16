# Validador de Cartão de Crédito

Uma ferramenta simples para validar números de cartão de crédito e identificar sua bandeira.

## Funcionalidades

- Validação de números de cartão de crédito usando o algoritmo de Luhn
- Identificação automática da bandeira do cartão (Visa, MasterCard, Elo, etc.)
- Interface amigável com visualização em tempo real
- Suporte a múltiplas bandeiras de cartão
- Design responsivo que funciona em dispositivos móveis e desktop

## Bandeiras Suportadas

- American Express
- Aura
- Discover
- Diners Club
- Elo
- Hipercard
- JCB
- MasterCard
- Visa
- Outras (com ícone genérico)

## Como Usar

1. Instale o Node.js (se ainda não tiver instalado)
2. Clone este repositório
3. Navegue até a pasta do projeto
4. Execute `node server.js`
5. Abra o navegador em `http://localhost:3000`
6. Digite o número do cartão no campo indicado
7. A bandeira será identificada automaticamente
8. Clique em "Verificar" para validar o número do cartão

## Estrutura do Projeto

```
.
├── src/
│   ├── card_icons/       # Ícones das bandeiras
│   ├── css/               # Folhas de estilo
│   └── js/                # Código JavaScript
│       ├── index.js       # Lógica de validação
│       └── script.js      # Lógica da interface
├── index.html            # Página principal
├── teste.html            # Página de teste
├── server.js             # Servidor local
└── README.md             # Este arquivo
```

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS)
- JavaScript (ES6+)
- Node.js

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
