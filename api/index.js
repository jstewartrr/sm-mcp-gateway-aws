export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    service: "sm-mcp-gateway-aws",
    version: "1.0.0",
    status: "healthy",
    primary_backend: "azure-east",
    description: "AWS region failover gateway - proxies to Azure East primary"
  });
}
