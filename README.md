# Experimental Boilerplate with Typescript and Node
This project includes

Typescript
Node
Eslint
Prettier
Jest

# Installation

For this Service to work we require redis installation.
https://redis.io/docs/getting-started/

Rename .env.example to .env and add your variables
This project uses Firestore, you will require serviceAccountKey.json or similar,
in case you have another file or setup, you can update it in src/modules/firebase



# Raspberry Setup
You need to export the file with ts-node in order to be able to add it to pm2
add this to the config in the built dotenv.config({ path: "../.env" });