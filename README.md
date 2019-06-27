# Peer-Genius

## Building and Installing (read all of me)

### Pre-Installation

Please ensure you have the following installed on your system before attempting to run or build `Peer-Genius`:

- python 2.7
- mysql with a running local mysql database (for development purposes, mysql 5.7 is a very good version to use. also, set up mysql by changing user to "root" and password to "pass" for simplification reasons.)
- vscode

1. Clone the repository:

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
   1. Server: copy contents of `env_stub` into a file named `.env`. Fill out all relevant information. (in this branch .env should already be filled out for you)
   2. Client: copy contents of `config.stub.js` into a file called `config.js` and fill out all relevant information.

4. Run development servers on both client and server by opening two different Terminal windows:

   ```bash
   yarn dev
   ```
   
5. By now you should be able to see the website running on localhost:8081.

Post your issues in the *Issues* tab and HAPPY DEVELOPING!

### **Important**

If you see a blank page in the localhost website, follow this direction:  
Locate Peer-Genius/client/react/guru/index.js and hit Ctrl+S (save).  

### Help? (do not follow this guide yet)

Here is a detailed instructions guide on how to set up stuff like mysql functionally.

### Argon 2 / Node.js

If you used code from this branch (develop), you should not experience any issues regarding Argon 2 or Node.js because of supplementary code inside the server folder.
If you have errors with `argon2` or `node.js`, go to node-gyp's GitHub site [https://github.com/nodejs/node-gyp] and follow installation instructions there before trying to install argon2.
