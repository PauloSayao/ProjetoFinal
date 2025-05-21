import { users } from './dados.js';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response(null, { status: 405 });

  const { name, password } = await req.json();
  const user = users.find(u => u.name === name && u.password === password);

  if (!user) return new Response(JSON.stringify({ message: "Usuário ou senha incorretos!" }), { status: 401 });

  return new Response(JSON.stringify({
    id: users.indexOf(user) + 1,
    name: user.name,
    email: user.email,
    role: user.role,
    telephone: user.telephone
  }), { status: 200 });
}