import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  success: boolean
  message: string
  leadId?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' })
  }

  try {
    const { nome, email, telefone, empresa, faturamento, desafio } = req.body

    // Validações básicas
    if (!nome || !email || !telefone || !empresa) {
      return res.status(400).json({ success: false, message: 'Campos obrigatórios não preenchidos' })
    }

    // Formatar número de telefone (remover caracteres especiais)
    const telefoneLimpo = telefone.replace(/\D/g, '')
    
    // Preparar mensagem para WhatsApp
    const mensagem = `
🎯 *NOVO LEAD QUALIFICADO*

👤 *Nome:* ${nome}
📧 *Email:* ${email}
📱 *Telefone:* ${telefone}
🏢 *Empresa:* ${empresa}
💰 *Faturamento:* ${faturamento || 'Não informado'}
⚡ *Desafio:* ${desafio || 'Não informado'}

✅ Lead 100% qualificado via funil gamificado
🔗 Responda para iniciar atendimento
    `.trim()

    // Aqui você pode integrar com:
    // 1. Twilio (para enviar WhatsApp)
    // 2. Evolution API
    // 3. WhatsApp Business API
    // 4. Sua ferramenta de CRM favorita

    // Exemplo com Twilio (descomente e configure):
    /*
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const twilio = require('twilio')(accountSid, authToken)

    await twilio.messages.create({
      body: mensagem,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:+55${telefoneLimpo}`
    })
    */

    // Por enquanto, vamos armazenar em um arquivo de log (substitua pela sua integração)
    console.log('📊 NOVO LEAD RECEBIDO:')
    console.log(mensagem)

    // Você também pode:
    // - Enviar para seu CRM (Pipedrive, RD Station, etc)
    // - Salvar em um banco de dados
    // - Enviar email para você
    // - Integrar com Zapier/Make

    // Simulando sucesso
    res.status(200).json({
      success: true,
      message: 'Lead recebido com sucesso',
      leadId: `LEAD_${Date.now()}`
    })

  } catch (error) {
    console.error('Erro ao processar lead:', error)
    res.status(500).json({
      success: false,
      message: 'Erro ao processar sua requisição'
    })
  }
}
