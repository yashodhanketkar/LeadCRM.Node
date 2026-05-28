import app from "./app.js";
import { PORT } from "./lib/store.js";

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
