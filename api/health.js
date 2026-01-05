const AZURE_EAST = "https://sm-mcp-gateway.lemoncoast-87756bcf.eastus.azurecontainerapps.io";

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const resp = await fetch(`${AZURE_EAST}/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list', params: {} })
    });
    
    if (resp.ok) {
      const data = await resp.json();
      const tools = data.result?.tools?.length || 0;
      return res.json({
        gateway: "sm-mcp-gateway-aws",
        status: "healthy",
        backend: "azure-east",
        tools: tools,
        message: "Proxying to Azure East primary"
      });
    }
    return res.status(503).json({ status: "degraded", error: `Backend returned ${resp.status}` });
  } catch (e) {
    return res.status(503).json({ status: "unhealthy", error: e.message });
  }
}
