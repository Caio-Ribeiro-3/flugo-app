export async function onRequestGet(context) {
    const response = await context.next();
    return response
}

export async function onRequestPost(context) {
    const response = await context.next();
    return response
}