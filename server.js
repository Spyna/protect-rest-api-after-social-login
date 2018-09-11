const bodyParser = require('body-parser');
const express = require('express');
const Authentication = require('./auth');

const authConfig = require('./auth-config');

class InMemoryUserStore {
    constructor() {
      this.users = [];
    }
  
    push(user) {
      this.users.push(user);
    }
  
    get(userId) {
      return this.users.find(u => u.id === userId);
    }
  }

const userStore = new InMemoryUserStore();

const auth = new Authentication({ routes: authConfig });

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.filter());

const handleProtectedResource = (req, res) => {
    const principal = res.locals.principal;
    const localUser = userStore.get(principal.sub);
    const name = localUser ? localUser.name : principal.sub;
    res.json({
        user: name
    }).end();
  }

  const handleTokenRequest = (req, res) => {
    try {
        const login = req.body;
      auth.authenticate(login).then(credentials => {
        userStore.push(credentials.user);
        res.json(credentials).end();
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' }).end();
    } finally {
    }
  }
  const handlePublicResource = (req, res) => {
    res.json({ hello: 'from server' }).end();
  }
app.post('/auth/token', handleTokenRequest);
app.get('/protected', handleProtectedResource);
app.get('/public', handlePublicResource);

app.use(express.static('static'));

const server = app.listen(PORT, () => {
  console.log(
    `server is listening on http://localhost:${server.address().port}`
  );
});
