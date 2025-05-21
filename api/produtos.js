import { produtos } from './dados.js';

// export const config = { runtime: 'edge' };

export default function handler() {
  return new Response(JSON.stringify(produtos), { status: 200 });
}
