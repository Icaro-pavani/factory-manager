import app, { init } from "./app.js";

const port = +process.env.PORT || 4000;

init().then(() => {
  app.listen(port, () => console.log(`Server is running at port ${port}`));
});
