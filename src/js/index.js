/**
 * Valida um número de cartão de crédito usando o algoritmo de Luhn
 * @param {string} cardNumber - Número do cartão a ser validado
 * @returns {boolean} Retorna true se o número for válido
 */
export function validarCartaoLuhn(cardNumber) {
    // Remove todos os caracteres não numéricos
    const numeroLimpo = cardNumber.replace(/\D/g, '');
    
    // Verifica se o número tem pelo menos 2 dígitos
    if (numeroLimpo.length < 2) return false;
    
    let soma = 0;
    let deveDobrar = false;
    
    // Percorre os dígitos da direita para a esquerda
    for (let i = numeroLimpo.length - 1; i >= 0; i--) {
        let digito = parseInt(numeroLimpo.charAt(i), 10);
        
        if (deveDobrar) {
            digito *= 2;
            if (digito > 9) {
                digito = (digito % 10) + 1;
            }
        }
        
        soma += digito;
        deveDobrar = !deveDobrar;
    }
    
    return soma % 10 === 0;
}

/**
 * Identifica a bandeira do cartão com base no número
 * @param {string} cardNumber - Número do cartão
 * @returns {string} Nome da bandeira ou 'Desconhecida' se não reconhecida
 */
export function identificarBandeira(cardNumber) {
    // Remove todos os caracteres não numéricos
    const numeroLimpo = cardNumber.replace(/\D/g, '');
    
    // Expressões regulares para cada bandeira (em ordem alfabética)
    const bandeiras = [
        { 
            nome: 'American Express', 
            regex: /^3[47]/,
            digitos: [15]
        },
        { 
            nome: 'Aura',
            regex: /^50(78|67|4175|509\d{3})/,
            digitos: [16, 19]
        },
        { 
            nome: 'Diners Club',
            regex: /^(30[0-5]|3095|36|3[89])/,
            digitos: [14, 16, 17, 18, 19]
        },
        { 
            nome: 'Discover', 
            regex: /^(6011|65|64[4-9]|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]))/,
            digitos: [16, 19]
        },
        { 
            nome: 'Elo', 
            regex: /^(4011(78|79)|43(1274|8435)|45(1416|7393|763(1|2))|50(4175|6699|67\d{2})\d|627780|63(6297|6368)|65003[1-3]|6500(3[5-9]|4[0-9]|5[0-1])|6504(0[5-9]|1[0-9]|2[0-9]|3[0-9])|650(4(8[5-9]|9[0-9])|5(0[0-9]|1[0-9]|2[0-9]|3[0-8]))|6505(4[1-9]|[5-8][0-9]|9[0-8])|6507(0[0-9]|1[0-8])|65072[0-7]|6509(0[1-9]|1[0-9]|20)|6516(5[2-9]|[6-7][0-9])|6550([0-1][0-9])|6550[2-8][0-9]|6550[0-9][0-9]|6559([0-1][0-9])|65592[0-5])/,
            digitos: [16]
        },
        { 
            nome: 'enRoute',
            regex: /^(2014|2149)/,
            digitos: [15]
        },
        { 
            nome: 'Hipercard', 
            regex: /^(606282|3841(0[0-5]|4[0-9]|5[0-5]|6[0-5]|7[0-5]|8[0-5]|9[0-5])|60(0[0-9]{3}|[1-9][0-9]{3})[0-9]{8,13})/,
            digitos: [13, 16, 19]
        },
        { 
            nome: 'JCB',
            regex: /^(352[8-9]|35[3-8][0-9])/,
            digitos: [16, 17, 18, 19]
        },
        { 
            nome: 'MasterCard', 
            regex: /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/,
            digitos: [16]
        },
        { 
            nome: 'Visa', 
            regex: /^4/,
            digitos: [13, 16]
        },
        { 
            nome: 'Voyager',
            regex: /^8699/,
            digitos: [15]
        }
    ];
    
    for (const bandeira of bandeiras) {
        if (bandeira.regex.test(numeroLimpo) && 
            bandeira.digitos.includes(numeroLimpo.length)) {
            return bandeira.nome;
        }
    }
    
    return 'Desconhecida';
}

/**
 * Valida o número do cartão e retorna a bandeira
 * @param {string} cardNumber - Número do cartão a ser validado
 * @returns {Object} Objeto com as propriedades 'valido' e 'bandeira'
 */
export function validarCartao(cardNumber) {
    if (typeof cardNumber !== 'string' && typeof cardNumber !== 'number') {
        return {
            valido: false,
            bandeira: 'Inválido',
            mensagem: 'Tipo de entrada inválido. Forneça uma string ou número.'
        };
    }
    
    const numeroString = String(cardNumber);
    const valido = validarCartaoLuhn(numeroString);
    const bandeira = identificarBandeira(numeroString);
    
    return {
        valido,
        bandeira: valido ? bandeira : 'Inválido',
        mensagem: valido 
            ? `Cartão ${bandeira} válido` 
            : 'Número de cartão inválido'
    };
}

// Exemplo de uso:
// const resultado = validarCartao('4111111111111111');
// console.log(resultado); // { valido: true, bandeira: 'Visa', mensagem: 'Cartão Visa válido' }
