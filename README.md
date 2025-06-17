# QazaQEduPlus

QazaQEduPlus is a full‑stack educational platform. The repository contains a React
client (in the project root) built with Vite and a Node.js/Express server located
in the `server` directory. The client communicates with the API server for course
management and user authentication.

## Getting Started

Follow the steps below to run the project locally.

### 1. Install dependencies

Install the client dependencies in the project root:

```bash
npm install
```

Then install the server dependencies:

```bash
cd server
npm install
cd ..
```

### 2. Configure environment variables

Copy the example file and adjust the values if needed:

```bash
cp server/.env.example server/.env
```

Edit `server/.env` to set your MongoDB connection string and JWT secret.

### 3. MongoDB

The application requires a MongoDB instance. You can run MongoDB locally or
use a hosted MongoDB Atlas cluster. Update `MONGODB_URI` in `server/.env`
accordingly. The provided `start-dev.sh` script tries to start a local MongoDB
server using `data/db`; if it cannot, it falls back to using MongoDB Atlas.

### 4. Seed test data (optional)

Inside the `server` folder you can populate the database with test data:

```bash
npm run seed            # add sample courses
npm run seed:student    # create a sample student
npm run seed:test-users # create test accounts
```

### 5. Start the development servers

Run both the client and server with the helper script:

```bash
./start-dev.sh
```

Alternatively, start them separately in different terminals:

```bash
# in the server folder
npm run dev

# in the project root
npm run dev
```


The client will be available at `http://localhost:5173` and the API server at
`http://localhost:5001` by default.

=======
## Environment setup

The backend relies on environment variables for database connection and token
signing. Copy the example file and provide your own values:

```bash
cp server/.env.example server/.env
```

Open `server/.env` and replace the placeholders with your MongoDB URI and JWT
secret.

