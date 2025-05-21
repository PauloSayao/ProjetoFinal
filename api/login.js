// /api/login.js
import { users } from './dados.js';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    if (req.method !== 'POST') {
      return new Response(null, {
        status: 405,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { name, password } = await req.json();

    // Debug: log the received data
    console.log('Login attempt:', { name, password });

    const user = users.find(u => u.name === name && u.password === password);

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Usuário ou senha incorretos!" }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return new Response(
      JSON.stringify({
        id: users.indexOf(user) + 1,
        name: user.name,
        email: user.email,
        role: user.role,
        telephone: user.telephone
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in login handler:', error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}