# Peer-Genius

## Building and Installing

### Pre-Installation

Please ensure you have the following installed on your system before attempting to run or build `Peer-Genius`:

- python 2.7
- mysql with a running local mysql database

1. Clone the repository:
   1. Using `ssh`:

      ```bash
      git clone git@github.com:Peer-Genius/Peer-Genius.git/
      ```

   2. OR alternatively, using `https`:

      ```bash
      git clone https://github.com/Peer-Genius/Peer-Genius.git/
      ```

2. Install dependencies in BOTH client and server folders.

    ```bash
    cd client
    yarn install

    cd server
    yarn install
    ```

3. Fill in environment variables
   1. Server: copy contents of `env_stub` into a file named `.env`. Fill out all relevant information.
   2. Client: copy contents of `config.stub.js` into a file called `config.js` and fill out all relevant information.

4. Run development servers:

   ```bash
   yarn dev
   ```

### Argon 2

If you have errors with `argon2`, go to node-gyp's GitHub site [https://github.com/nodejs/node-gyp] and follow installation instructions there before trying to install argon2.
