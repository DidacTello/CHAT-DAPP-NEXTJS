import { web3, chatContract } from '../web3';

export async function GET(req: Request) {
  const accounts = await web3!.eth.getAccounts();
  const account = accounts[0];

  try {
    const users = await chatContract.methods.getAllUsernames().call({ from: account });

    return new Response(JSON.stringify({ users: users }), { status: 200 });
  } catch (error: any) {
    console.error('Error executing getUsers:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

