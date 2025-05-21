import { pedidos } from '../dados.js';

export const config = { runtime: 'edge' };

export default function handler(req) {
  const url = new URL(req.url);
  const id = parseInt(url.pathname.split('/').pop());
  const index = pedidos.findIndex(p => p.id === id);

  if (req.method === 'DELETE') {
    if (index === -1) return new Response(JSON.stringify({ message: "Pedido não encontrado!" }), { status: 404 });
    pedidos.splice(index, 1);
    return new Response(JSON.stringify({ message: "Pedido removido com sucesso!" }), { status: 200 });
  }

  return new Response(null, { status: 405 });
}
