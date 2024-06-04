import { web3, chatContract } from '../web3';

export async function POST(req: Request) {
  const body = await req.json();
  const { username } = body;

  if (typeof username !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }

  const accounts = await web3!.eth.getAccounts();
  const account = accounts[0];

  try {
    await chatContract.methods.registerUser(username).send({ from: account, gas: 3000000 });
    return new Response(JSON.stringify({ message: 'User registered successfully' }), { status: 200 });
  } catch (error: any) {
    console.error('Error executing registerUser:', error);
    return new Response(JSON.stringify({ error: "User already registered" }), { status: 500 });
  }
}
