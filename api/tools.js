const AZURE_EAST = "https://sm-mcp-gateway.lemoncoast-87756bcf.eastus.azurecontainerapps.io";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const resp = await fetch(`${AZURE_EAST}/tools`);
    const data = await resp.json();
    return res.json(data);
  } catch (e) {
    return res.status(503).json({ error: e.message });
  }
}
