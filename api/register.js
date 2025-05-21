import { users } from '../dados.js';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response(null, { status: 405 });

  const { name, password, email, fullName, telephone } = await req.json();
  if (!name || !password || !email) return new Response(JSON.stringify({ message: "Preencha todos os campos obrigatórios!" }), { status: 400 });

  const exists = users.find(u => u.name === name || u.email === email);
  if (exists) return new Response(JSON.stringify({ message: "Usuário ou e-mail já cadastrado!" }), { status: 409 });

  users.push({ name, password, email, fullName, telephone, role: "user" });
  return new Response(JSON.stringify({ message: "Usuário registrado com sucesso!" }), { status: 201 });
}
