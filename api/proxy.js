export default async function handler(req, res) {
    const url = req.query.url;
  
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
  