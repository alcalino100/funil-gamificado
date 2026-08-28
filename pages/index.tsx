import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'

interface FormData {
  nome: string
  email: string
  telefone: string
  empresa: string
  faturamento: string
  desafio: string
  investimento: string
}

const stages = [
  {
    id: 1,
    title: 'Bem-vindo! 👋',
    subtitle: 'Vamos começar a jornada',
    field: 'nome',
    label: 'Qual é seu nome?',
    placeholder: 'Digite seu nome completo',
    type: 'text',
    icon: '👤'
  },
  {
    id: 2,
    title: 'Segundo passo! 📧',
    subtitle: 'Precisamos de contato',
    field: 'email',
    label: 'Qual é seu melhor email?',
    placeholder: 'seu@email.com',
    type: 'email',
    icon: '💌'
  },
  {
    id: 3,
    title: 'Seguindo firme! 📱',
    subtitle: 'Vamos nos comunicar',
    field: 'telefone',
    label: 'Qual é seu WhatsApp?',
    placeholder: '(11) 99999-9999',
    type: 'tel',
    icon: '📞'
  },
  {
    id: 4,
    title: 'Quase lá! 🏢',
    subtitle: 'Conhecendo seu negócio',
    field: 'empresa',
    label: 'Qual é o nome da sua empresa?',
    placeholder: 'Nome da empresa',
    type: 'text',
    icon: '🏭'
  },
  {
    id: 5,
    title: 'Bora qualificar! 💰',
    subtitle: 'Entendo seu tamanho',
    field: 'faturamento',
    label: 'Qual é o faturamento mensal aproximado?',
    options: [
      'Até R$ 10 mil',
      'R$ 10 mil - R$ 50 mil',
      'R$ 50 mil - R$ 100 mil',
      'R$ 100 mil - R$ 500 mil',
      'Acima de R$ 500 mil'
    ],
    type: 'select',
    icon: '📊'
  },
  {
    id: 6,
    title: 'Seu desafio 🎯',
    subtitle: 'O que mais afeta seu negócio?',
    field: 'desafio',
    label: 'Qual é seu maior desafio?',
    options: [
      'Falta de organização financeira',
      'Dificuldade em análises',
      'Falta de relatórios automáticos',
      'Gestão manual consome tempo',
      'Não vejo ROI dos gastos'
    ],
    type: 'select',
    icon: '⚡'
  }
]

export default function Home() {
  const [currentStage, setCurrentStage] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    faturamento: '',
    desafio: '',
    investimento: ''
  })
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const stage = stages[currentStage]
  const progress = ((currentStage + 1) / stages.length) * 100

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNext = async () => {
    const currentField = stage.field as keyof FormData
    
    if (!formData[currentField]) {
      alert('Por favor, preencha este campo para continuar')
      return
    }

    setPoints(points + 16)

    if (currentStage < stages.length - 1) {
      setCurrentStage(currentStage + 1)
    } else {
      // Último estágio - enviar dados
      await submitForm()
    }
  }

  const submitForm = async () => {
    setLoading(true)
    
    try {
      // Enviar dados para API
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setPoints(100)
        setShowSuccess(true)
      } else {
        alert('Erro ao enviar dados. Tente novamente.')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro de conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1)
      setPoints(Math.max(0, points - 16))
    }
  }

  if (showSuccess) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Funil de Qualificação - Gestão de Gráfico</title>
          <meta name="description" content="Qualifique seu negócio com a gente" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <div className={styles.successScreen}>
          <div className={styles.successContent}>
            <div className={styles.successIcon}>🎉</div>
            <h1 className={styles.successTitle}>Parabéns!</h1>
            <p className={styles.successSubtitle}>Você completou 100% da qualificação</p>
            
            <div className={styles.pointsDisplay}>
              <span className={styles.pointsNumber}>{points}</span>
              <span className={styles.pointsLabel}>pontos conquistados</span>
            </div>

            <div className={styles.discountBadge}>
              <span className={styles.discountTitle}>Sua Recompensa</span>
              <span className={styles.discountValue}>15% de Desconto</span>
              <span className={styles.discountText}>no seu primeiro mês</span>
            </div>

            <div className={styles.successMessage}>
              <p>✅ Dados recebidos com sucesso!</p>
              <p>📞 Entraremos em contato pelo WhatsApp em breve</p>
              <p>⏰ Tempo médio de retorno: 2 horas</p>
            </div>

            <button 
              className={styles.whatsappButton}
              onClick={() => window.open('https://wa.me/55', '_blank')}
            >
              💬 Abrir WhatsApp
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Funil de Qualificação - Gestão de Gráfico</title>
        <meta name="description" content="Qualifique seu negócio com a gente" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.mainContent}>
        {/* Header com Logo */}
        <div className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>📊</span>
            <span className={styles.logoText}>Gestão Gráfico</span>
          </div>
          <div className={styles.badge}>
            {currentStage + 1} de {stages.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          <div className={styles.progressText}>
            {points} / 100 pontos
          </div>
        </div>

        {/* Stage Content */}
        <div className={styles.stageContainer}>
          <div className={styles.stageIcon}>{stage.icon}</div>
          
          <h1 className={styles.stageTitle}>{stage.title}</h1>
          <p className={styles.stageSubtitle}>{stage.subtitle}</p>

          <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>{stage.label}</label>
              
              {stage.type === 'select' ? (
                <div className={styles.optionsGrid}>
                  {stage.options?.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`${styles.optionButton} ${formData[stage.field as keyof FormData] === option ? styles.optionButtonActive : ''}`}
                      onClick={() => handleInputChange({ target: { name: stage.field, value: option } } as any)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              ) : (
                <input
                  type={stage.type}
                  name={stage.field}
                  value={formData[stage.field as keyof FormData]}
                  onChange={handleInputChange}
                  placeholder={stage.placeholder}
                  className={styles.input}
                />
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleBack}
                className={styles.buttonSecondary}
                disabled={currentStage === 0}
              >
                ← Voltar
              </button>
              <button
                type="submit"
                className={styles.buttonPrimary}
                disabled={loading}
              >
                {loading ? 'Enviando...' : currentStage === stages.length - 1 ? 'Finalizar 🎯' : 'Próximo →'}
              </button>
            </div>
          </form>

          {/* Stage Dots */}
          <div className={styles.stageDots}>
            {stages.map((_, index) => (
              <div
                key={index}
                className={`${styles.dot} ${index === currentStage ? styles.dotActive : ''} ${index < currentStage ? styles.dotCompleted : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <p>🔒 Seus dados estão seguros e protegidos</p>
        </div>
      </div>
    </div>
  )
}
