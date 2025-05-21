import { produtos } from './dados.js';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    // Habilitar CORS
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (req.method !== 'GET') {
      return new Response(null, {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Filtrar apenas produtos ativos
    const produtosAtivos = produtos.filter(p => p.ativo);

    return new Response(
      JSON.stringify(produtosAtivos),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ message: "Erro interno no servidor" }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}