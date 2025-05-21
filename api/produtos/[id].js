import { produtos } from '../dados.js';

// export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split('/').pop());
  const produto = produtos.find(p => p.id === id);

  if (!produto) return new Response(JSON.stringify({ message: "Produto não encontrado!" }), { status: 404 });

  if (req.method === 'PATCH') {
    produto.ativo = !produto.ativo;
    return new Response(JSON.stringify({ message: "Produto atualizado com sucesso!", produto }), { status: 200 });
  }

  return new Response(null, { status: 405 });
}