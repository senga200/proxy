export const config = {
  api: {
    bodyParser: false, // pour lire le corps manuellement
  },
};

export default async function handler(req, res) {
  const url = req.query.url;

  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "*");
    return res.status(200).end();
  }

  if (!url) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  let body = undefined;
  if (req.method !== "GET" && req.method !== "OPTIONS") {
    body = await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => (data += chunk));
      req.on("end", () => resolve(data));
      req.on("error", reject);
    });
  }

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: {
        ...req.headers,
        host: undefined,
      },
      body,
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Content-Type", "application/json");

    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
