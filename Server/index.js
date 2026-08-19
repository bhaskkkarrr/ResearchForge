import app from "./src/app.js";
const PORT = 2001

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})