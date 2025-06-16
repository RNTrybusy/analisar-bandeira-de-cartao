// Importa as funções de validação
import { validarCartao, identificarBandeira, validarCartaoLuhn } from './index.js';

// Elementos da DOM
const cardForm = document.getElementById('card-form');
const cardNumberInput = document.getElementById('card-number');
const cardNumberDisplay = document.getElementById('card-number-display');
const cardLogo = document.getElementById('card-logo');
const cardIconsContainer = document.getElementById('card-icons');
const resultDiv = document.getElementById('result');
const resultTitle = document.getElementById('result-title');
const resultMessage = document.getElementById('result-message');
const verifyButton = document.getElementById('verify-button');

// Mapeamento de bandeiras para ícones
const cardIcons = {
    'American Express': 'amex.svg',
    'Aura': 'generic.svg',
    'Desconhecida': 'generic.svg',
    'Diners Club': 'diners.svg',
    'Discover': 'discover.svg',
    'Elo': 'elo.svg',
    'enRoute': 'generic.svg',
    'Hipercard': 'hipercard.svg',
    'JCB': 'jcb.svg',
    'MasterCard': 'mastercard.svg',
    'Voyager': 'generic.svg',
    'Visa': 'visa.svg'
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Carrega os ícones das bandeiras
    loadCardIcons();
    
    // Adiciona máscara ao campo de número do cartão
    cardNumberInput.addEventListener('input', formatCardNumber);
    
    // Adiciona validação em tempo real
    cardNumberInput.addEventListener('input', updateCardPreview);
    
    // Submissão do formulário
    cardForm.addEventListener('submit', handleFormSubmit);
});

// Carrega os ícones das bandeiras
function loadCardIcons() {
    Object.entries(cardIcons).forEach(([brand, icon]) => {
        const img = document.createElement('img');
        img.src = `./src/card_icons/${icon}`;
        img.alt = brand;
        img.title = brand;
        img.dataset.brand = brand;
        cardIconsContainer.appendChild(img);
    });
}

// Formata o número do cartão com espaços
function formatCardNumber(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    e.target.value = formattedValue.trim();
}

// Atualiza a visualização do cartão
function updateCardPreview() {
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    
    // Atualiza o display do número do cartão
    if (cardNumber) {
        let display = '';
        for (let i = 0; i < 16; i++) {
            if (i > 0 && i % 4 === 0) display += ' ';
            display += i < cardNumber.length ? cardNumber[i] : '•';
        }
        cardNumberDisplay.textContent = display;
    } else {
        cardNumberDisplay.textContent = '•••• •••• •••• ••••';
    }
    
    // Identifica a bandeira
    const brand = identificarBandeira(cardNumber);
    updateCardBrand(brand);
    
    // Atualiza os ícones ativos
    updateActiveIcons(brand);
    
    // Validação básica em tempo real
    if (cardNumber.length >= 13) {
        const isValid = validarCartaoLuhn(cardNumber);
        cardNumberInput.classList.toggle('valid', isValid);
        cardNumberInput.classList.toggle('invalid', !isValid && cardNumber.length > 0);
    } else {
        cardNumberInput.classList.remove('valid', 'invalid');
    }
}

// Atualiza a bandeira exibida no cartão
function updateCardBrand(brand) {
    const iconPath = cardIcons[brand] ? `./src/card_icons/${cardIcons[brand]}` : './src/card_icons/generic.svg';
    cardLogo.src = iconPath;
    cardLogo.alt = brand;
    cardLogo.title = brand;
    cardLogo.onload = () => {
        console.log(`Imagem de cartão ${brand} carregada com sucesso.`);
        cardLogo.style.display = 'initial';
    };
    cardLogo.onerror = () => {
        console.error(`Erro ao carregar imagem de cartão ${brand}.`);
    };
}

// Atualiza os ícones ativos
function updateActiveIcons(activeBrand) {
    document.querySelectorAll('#card-icons img').forEach(img => {
        const isActive = img.dataset.brand === activeBrand;
        img.classList.toggle('active', isActive);
    });
}

// Manipula o envio do formulário
function handleFormSubmit(e) {
    e.preventDefault();
    
    const cardNumber = cardNumberInput.value.replace(/\s/g, '');
    
    // Mostra o estado de carregamento
    verifyButton.disabled = true;
    verifyButton.classList.add('loading');
    
    // Simula um atraso para melhor experiência do usuário
    setTimeout(() => {
        const result = validarCartao(cardNumber);
        showResult(result);
        
        // Remove o estado de carregamento
        verifyButton.disabled = false;
        verifyButton.classList.remove('loading');
    }, 800);
}

// Exibe o resultado da validação
function showResult(result) {
    if (result.valido) {
        resultTitle.textContent = `Bandeira: ${result.bandeira}`;
        resultMessage.textContent = 'Número de cartão válido';
        resultDiv.className = 'result show valid';
    } else {
        resultTitle.textContent = 'Cartão inválido';
        resultMessage.textContent = result.mensagem || 'Verifique o número do cartão e tente novamente.';
        resultDiv.className = 'result show invalid';
        
        // Adiciona animação de erro
        cardNumberInput.classList.add('shake');
        setTimeout(() => cardNumberInput.classList.remove('shake'), 300);
    }
    
    // Rola até o resultado
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Exporta as funções para uso em outros módulos
export { validarCartao, identificarBandeira, validarCartaoLuhn };