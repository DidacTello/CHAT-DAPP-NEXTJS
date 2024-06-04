# CHAT-DAPP-NEXTJS

This is a chat DApp project built with Next.js, using Ganache for the local blockchain environment and TypeScript for a better development experience.

## Requirements

- Node.js (>=12.x)
- Yarn
- Truffle

## Installation

Follow these steps to set up and run the development environment:

1. **Install Node.js:**

    Download and install Node.js from the [official website](https://nodejs.org/).

2. **Clone the repository:**

    ```sh
    git clone https://github.com/DidacTello/CHAT-DAPP-NEXTJS
    ```

3. **Navigate to the project directory:**

    ```sh
    cd CHAT-DAPP-NEXTJS
    ```

4. **Install dependencies:**

    ```sh
    yarn install
    ```

5. **Install Ganache CLI via Truffle:**

    ```sh
    truffle develop
    ```

## Development Setup

1. **Start Ganache:**

    ```sh
    truffle develop
    ```

    This will start the Ganache CLI integrated with Truffle and open a Truffle console.

2. **Compile smart contracts:**

    In the Truffle console, run:

    ```sh
    compile
    ```

3. **Migrate smart contracts to the blockchain:**

    In the Truffle console, run:

    ```sh
    migrate --reset
    ```

4. **Start the development server:**

    Open a new terminal and navigate to the project directory, then run:

    ```sh
    yarn dev
    ```

Your development server should now be running at [http://localhost:3000](http://localhost:3000).

## Author

Made by Dídac Tello

---
