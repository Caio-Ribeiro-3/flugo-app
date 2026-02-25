import crypto from 'node:crypto';

/**
 * Uma função para adicionar headers de segurança no cloudflare de qualquer rota
 */
export const onRequest = async (context) => {
    const response = await context.next();
    // response.headers.set("Content-Security-Policy", `default-src 'self'; style-src 'self' 'nonce-${crypto.randomBytes(16).toString('base64')}'; script-src 'self' 'nonce-${crypto.randomBytes(16).toString('base64')}';`);
    return response;
};