export default async function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      return res.status(200).end(); // CORS preflight OK
    }
  
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: "Missing url parameter" });
    }
  
    try {
      const response = await fetch(url, {
        method: req.method,
        headers: { "Content-Type": "application/json" },
        body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
      });
  
      const data = await response.text();
      res.status(response.status).send(data);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }
  