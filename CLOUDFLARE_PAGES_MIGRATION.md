# Cloudflare Pages - Imovel Explicado Contratos

## Decisao

Usar Cloudflare Pages para a landing estatica e manter o Render para o app/backend.

Motivo: campanhas pagas nao devem cair primeiro no cold start do Render. A landing estatica carrega rapido, aquece `https://imovel-explicado-contratos.onrender.com/api/health` em segundo plano e direciona o usuario para `/triagem` quando ele decide iniciar.

## Repositorio recomendado

```txt
massaprod/imovel-explicado-compliance
```

Branch:

```txt
main
```

Build command:

```txt
deixar vazio
```

Output directory:

```txt
/
```

## Configuracao no Cloudflare Pages

1. Entrar no Cloudflare Dashboard.
2. Acessar `Workers & Pages`.
3. Criar novo projeto Pages.
4. Conectar GitHub.
5. Selecionar `massaprod/imovel-explicado-compliance`.
6. Usar as configuracoes acima.
7. Publicar.

## URLs esperadas

Landing estatica provisoria:

```txt
https://massaprod.github.io/imovel-explicado-compliance/
```

Backend/app:

```txt
https://imovel-explicado-contratos.onrender.com
```

Depois que Cloudflare Pages publicar, usar a URL `*.pages.dev` como URL principal dos anuncios ate termos dominio proprio.

## Depois do deploy

Atualizar estes locais para apontar para a URL Cloudflare:

- Link do Instagram.
- Link do Facebook.
- URL de site no Meta Developers, se a landing principal mudar.
- `APP_PUBLIC_URL` e `VITE_PUBLIC_APP_URL` somente se o backend tambem passar a responder pelo dominio definitivo. Enquanto a API continuar no Render, nao trocar essas variaveis sem revisar rotas e webhook.

## Observacao

Em 2026-06-04, o login social GitHub no Cloudflare falhou com mensagem de identidade divergente. A migracao depende de login manual na conta correta da Cloudflare ou cadastro por outro metodo.
