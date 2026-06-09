export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (url.hostname === "www.imovelexplicado.com.br") {
    url.hostname = "imovelexplicado.com.br";
    return Response.redirect(url.toString(), 301);
  }

  if (url.hostname === "contratos.imovelexplicado.com.br" && url.pathname === "/") {
    url.pathname = "/contratos";
    return Response.redirect(url.toString(), 302);
  }

  return context.next();
}
