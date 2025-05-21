import { pedidos } from './dados.js';

export const config = { runtime: 'edge' };

let pedidoIdCounter = 1;

export default async function handler(req) {
  if (req.method === 'POST') {
    const { produtos, nome, telefone } = await req.json();
    if (!produtos || !Array.isArray(produtos) || !nome || !telefone)
      return new Response(JSON.stringify({ message: "Pedido inválido!" }), { status: 400 });

    const novoPedido = { id: pedidoIdCounter++, produtos, nome, telefone };
    pedidos.push(novoPedido);
    return new Response(JSON.stringify({ message: "Pedido salvo com sucesso!" }), { status: 201 });
  }

  if (req.method === 'GET') {
    return new Response(JSON.stringify({ pedidos }), { status: 200 });
  }

  if (req.method === 'DELETE') {
    pedidos.length = 0;
    return new Response(JSON.stringify({ message: "Todos os pedidos foram removidos!" }), { status: 200 });
  }

  return new Response(null, { status: 405 });
}
