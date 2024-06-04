import { web3, chatContract } from '../web3';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const senderUsername = url.searchParams.get('senderUsername');
  const receiverUsername = url.searchParams.get('receiverUsername');

  if (!senderUsername || !receiverUsername) {
    return new Response(JSON.stringify({ error: 'Invalid query parameters' }), { status: 400 });
  }

  const accounts = await web3!.eth.getAccounts();
  const account = accounts[0];

  try {
    const messages = await chatContract.methods.getMessages(senderUsername, receiverUsername).call({ from: account });
    
    const serializedMessages = messages.map((msg: any) => ({
      senderUsername: msg.senderUsername,
      receiverUsername: msg.receiverUsername,
      message: msg.message,
      timestamp: msg.timestamp.toString()
    }));

    return new Response(JSON.stringify({ messages: serializedMessages }), { status: 200 });
  } catch (error: any) {
    console.error('Error executing getMessages:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const { senderUsername, receiverUsername, message } = body;
  
  if (typeof senderUsername !== 'string' || typeof receiverUsername !== 'string' || typeof message !== 'string') {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), { status: 400 });
  }

  const accounts = await web3!.eth.getAccounts();
  const account = accounts[0];

  try {
    console.log(senderUsername,receiverUsername)
    await chatContract.methods.sendMessage(senderUsername, receiverUsername, message).send({ from: account, gas: 3000000 });
    return new Response(JSON.stringify({ message: 'Message sent successfully' }), { status: 200 });
  } catch (error: any) {
    console.error('Error executing sendMessage:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

