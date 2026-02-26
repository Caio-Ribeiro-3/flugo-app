export function validateEmail(email: unknown) {
    if (typeof email !== 'string') return 'Parâmetro não é uma string'
    const input = document.createElement('input');
    input.type = 'email';
    input.value = email;
    return input.checkValidity() ? undefined : 'Email inválido'
}