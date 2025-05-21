import { produtos } from './dados.js';

export const config = {
  runtime: 'edge',
  // Aumenta o tempo limite para 30 segundos (máximo no Vercel)
  maxDuration: 30
};

export default async function handler(req) {
  // Resposta rápida para OPTIONS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Apenas GET permitido
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Método não permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Cache para melhor performance
    const cache = caches.default;
    const cacheKey = new Request('https://produtos-cache', { method: 'GET' });
    let response = await cache.match(cacheKey);

    if (!response) {
      const produtosAtivos = produtos.filter(p => p.ativo);

      response = new Response(JSON.stringify(produtosAtivos), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600' // Cache de 1 hora
        }
      });

      // Armazena no cache
      await cache.put(cacheKey, response.clone());
    }

    return response;
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: "Erro interno" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}