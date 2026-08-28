# 🎯 Funil Gamificado - Gestão de Gráfico

Funil de qualificação interativo e gamificado para capturar leads qualificados com 6 etapas e integração com WhatsApp.

## ✨ Funcionalidades

✅ **6 Etapas Gamificadas**
- Bem-vindo
- Captura de email
- Número de WhatsApp
- Dados da empresa
- Faturamento
- Desafio principal

✅ **Sistema de Pontos**
- 16 pontos por etapa
- 100 pontos ao completar
- Desconto exclusivo de 15%

✅ **Design Moderno**
- Interface responsiva (mobile & desktop)
- Animações suaves
- Gradiente atrativo
- Acessibilidade garantida

✅ **Integração WhatsApp**
- Captura número WhatsApp
- Pronto para integrar com Twilio, Evolution API ou sua ferramenta
- Mensagem automática com dados do lead

## 🚀 Deployment na Vercel

### Pré-requisitos
- Conta GitHub (para conectar repositório)
- Conta Vercel (vercel.com)
- Node.js 16+ instalado localmente (opcional)

### Passo 1: Preparar o Repositório GitHub

```bash
# Clone ou crie um novo repositório
git init
git add .
git commit -m "Initial commit: Funnel gamificado"

# Envie para GitHub (crie um repo em https://github.com/new)
git remote add origin https://github.com/seu-usuario/seu-repo.git
git branch -M main
git push -u origin main
```

### Passo 2: Deploy na Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New..." → "Project"
3. Selecione "Import Git Repository"
4. Selecione o repositório que acabou de criar
5. Configure as variáveis de ambiente (se necessário):
   - `TWILIO_ACCOUNT_SID` (opcional)
   - `TWILIO_AUTH_TOKEN` (opcional)
   - `TWILIO_WHATSAPP_NUMBER` (opcional)
6. Clique em "Deploy"

A Vercel detectará automaticamente que é um projeto Next.js e fará o build corretamente.

### Passo 3: Configurar Integração WhatsApp

Escolha uma das opções:

#### Opção A: Twilio (Recomendado)
1. Crie conta em [twilio.com](https://www.twilio.com)
2. Obtenha suas credenciais
3. Em Vercel → Settings → Environment Variables
4. Adicione as variáveis:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_WHATSAPP_NUMBER`
5. Descomente o código Twilio em `pages/api/submit-lead.ts`

#### Opção B: Evolution API
1. Hospede a Evolution API em seu servidor
2. Configure o endpoint em `pages/api/submit-lead.ts`
3. Implemente a integração usando a API deles

#### Opção C: Zapier/Make (Mais Simples)
1. Crie um webhook em Zapier/Make
2. Configure para enviar mensagem WhatsApp
3. Chame o webhook na API

## 📋 Estrutura do Projeto

```
.
├── pages/
│   ├── index.tsx              # Página principal do funil
│   └── api/
│       └── submit-lead.ts     # API para processar leads
├── styles/
│   └── Home.module.css        # Estilos
├── package.json
├── tsconfig.json
├── next.config.js
└── README.md
```

## 🔧 Desenvolvimento Local

```bash
# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:3000
```

## 📊 Dados Capturados

O funil captura:
- **Nome completo**
- **Email**
- **Telefone WhatsApp**
- **Nome da empresa**
- **Faturamento mensal**
- **Principal desafio**

Esses dados são enviados para sua API e podem ser integrados com:
- Seu CRM (Pipedrive, RD Station, etc)
- Ferramentas de automação (Zapier, Make, etc)
- Bancos de dados próprios
- Ferramentas de email marketing

## 🎨 Personalização

### Alterar Cores
Em `styles/Home.module.css`, altere os gradientes:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Alterar Logo/Nome
Em `pages/index.tsx`, edite:
```tsx
<span className={styles.logoText}>Gestão Gráfico</span>
```

### Alterar Etapas
Edite o array `stages` em `pages/index.tsx` para adicionar/remover/modificar etapas.

### Alterar Desconto
Em `pages/index.tsx`, procure por "15% de Desconto" e ajuste.

## 📱 Responsividade

O design foi otimizado para:
- ✅ Mobile (320px - 480px)
- ✅ Tablet (480px - 768px)
- ✅ Desktop (768px+)

## ♿ Acessibilidade

- Contraste de cores WCAG AA
- Focus states visíveis
- Suporte a leitores de tela
- Respeita preferências de movimento reduzido
- Semântica HTML correta

## 🚢 Variáveis de Ambiente (Opcional)

Crie um arquivo `.env.local` na raiz:

```
TWILIO_ACCOUNT_SID=seu_sid
TWILIO_AUTH_TOKEN=seu_token
TWILIO_WHATSAPP_NUMBER=+55XXXXXXXXX

# Ou sua ferramenta de CRM
CRM_API_KEY=sua_chave
CRM_WEBHOOK_URL=sua_url
```

## 🐛 Troubleshooting

**Problema**: "Module not found"
**Solução**: Execute `npm install`

**Problema**: Porta 3000 já em uso
**Solução**: `npm run dev -- -p 3001`

**Problema**: Build falha na Vercel
**Solução**: Verifique se `tsconfig.json` está correto e limpe cache em Vercel

## 📞 Próximos Passos

1. **Integrar WhatsApp** - Configure Twilio ou Evolution API
2. **Conectar CRM** - Envie dados para seu CRM favorito
3. **Adicionar Analytics** - Implemente Google Analytics ou Hotjar
4. **Customizar Design** - Ajuste cores e conteúdo
5. **Testar Mobile** - Valide em vários dispositivos

## 📄 Licença

Projeto livre para uso comercial.

## 💬 Suporte

Para dúvidas sobre deployment na Vercel: https://vercel.com/docs

Para problemas com Next.js: https://nextjs.org/docs
