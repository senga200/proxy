console.log("allo allo")
export default async function handler(req, res) {
    const url = req.query.url;
  
    // Gérer les requêtes OPTIONS (préflight)
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "*");
      return res.status(200).end();
    }

    if (!url) {
      return res.status(400).json({ error: "Missing url parameter" });
    }
  
    try {
      const response = await fetch(url, {
        method: req.method,
        headers: req.headers,
        body: req.method !== "GET" ? req.body : undefined,
      });
  
      const data = await response.text();
  
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");
      res.status(response.status).send(data);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
  