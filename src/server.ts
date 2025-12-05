import app from './app';
import config from './config';

const { port } = config;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
