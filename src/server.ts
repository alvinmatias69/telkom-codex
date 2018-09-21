import app from "./app";
import cors from "cors";
const PORT = process.env.PORT || 3000;

app.use(cors());

app.listen(PORT, () => console.log(`Express app listening on port ${PORT}`));
