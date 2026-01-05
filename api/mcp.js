const AZURE_EAST = "https://sm-mcp-gateway.lemoncoast-87756bcf.eastus.azurecontainerapps.io";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    const resp = await fetch(`${AZURE_EAST}/mcp`, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    });
    
    const data = await resp.json();
    return res.status(resp.status).json(data);
  } catch (e) {
    return res.status(503).json({
      jsonrpc: '2.0',
      error: { code: -32603, message: `Proxy error: ${e.message}` },
      id: req.body?.id || null
    });
  }
}
