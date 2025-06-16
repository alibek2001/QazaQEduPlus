import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Paper, 
  Avatar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText
} from '@mui/material';
import { 
  CheckCircle as CheckCircleIcon, 
  School as SchoolIcon, 
  Psychology as PsychologyIcon, 
  SupportAgent as SupportAgentIcon,
  People as PeopleIcon,
  Lightbulb as LightbulbIcon
} from '@mui/icons-material';

const About: React.FC = () => {
  // Sample data
  const benefits = [
    {
      title: 'Персонализированное обучение',
      description: 'Наша платформа адаптируется к вашему стилю обучения и темпу, обеспечивая максимальную эффективность',
      icon: <SchoolIcon fontSize="large" />
    },
    {
      title: 'ИИ-ассистент',
      description: 'Получите мгновенную помощь от нашего ИИ-ассистента, который доступен 24/7 для ответов на ваши вопросы',
      icon: <PsychologyIcon fontSize="large" />
    },
    {
      title: 'Сообщество единомышленников',
      description: 'Присоединяйтесь к сообществу студентов и преподавателей, чтобы обмениваться знаниями и опытом',
      icon: <PeopleIcon fontSize="large" />
    },
    {
      title: 'Инновационные методики',
      description: 'Мы используем современные методики обучения, которые делают процесс увлекательным и эффективным',
      icon: <LightbulbIcon fontSize="large" />
    }
  ];

  const team = [
    {
      name: 'Алексей Петров',
      position: 'Основатель и CEO',
      bio: 'Эксперт в области образовательных технологий с более чем 15-летним опытом',
      avatar: 'https://source.unsplash.com/random/100x100/?man,1'
    },
    {
      name: 'Мария Иванова',
      position: 'Директор по образованию',
      bio: 'Доктор педагогических наук, автор инновационных методик обучения',
      avatar: 'https://source.unsplash.com/random/100x100/?woman,1'
    },
    {
      name: 'Дмитрий Сидоров',
      position: 'Технический директор',
      bio: 'Специалист по ИИ и машинному обучению, разработчик образовательных платформ',
      avatar: 'https://source.unsplash.com/random/100x100/?man,2'
    },
    {
      name: 'Елена Смирнова',
      position: 'Руководитель отдела поддержки',
      bio: 'Эксперт по клиентскому сервису с фокусом на образовательную сферу',
      avatar: 'https://source.unsplash.com/random/100x100/?woman,2'
    }
  ];

  return (
    <Box>
      {/* Header */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            component="h1" 
            variant="h2" 
            align="center" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            О платформе QazaQEduPlus
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            paragraph
            sx={{ opacity: 0.9, maxWidth: '800px', mx: 'auto' }}
          >
            Мы создаем будущее образования с помощью искусственного интеллекта и инновационных методик обучения
          </Typography>
        </Container>
      </Box>

      {/* History and Stats */}
      <Box sx={{ bgcolor: '#fff', py: 8, width: '100%' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.dark' }}>
                Наша история
              </Typography>
              <Typography paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
                QazaQEduPlus была основана в 2020 году с целью сделать качественное образование доступным для всех жителей Казахстана.
              </Typography>
              <Typography paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
                Мы начали с небольшой команды энтузиастов, которые верили в силу онлайн-образования. Сегодня мы выросли в платформу, которая помогает тысячам студентов получать новые навыки и знания.
              </Typography>
              <Typography sx={{ fontSize: '1.1rem' }}>
                Наша платформа постоянно развивается, и мы стремимся внедрять самые современные технологии, включая искусственный интеллект, для улучшения качества обучения.
              </Typography>
            </Box>
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'primary.dark' }}>
                Наша статистика
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                {[
                  { number: '10,000+', label: 'Студентов' },
                  { number: '50+', label: 'Преподавателей' },
                  { number: '100+', label: 'Курсов' },
                  { number: '95%', label: 'Довольных студентов' },
                ].map((stat, index) => (
                  <Box key={index}>
                    <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 3, 
                        textAlign: 'center',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderRadius: 2,
                        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                        background: index % 2 === 0 ? 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)' : 'white'
                      }}
                    >
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 1,
                          color: index % 2 === 0 ? 'white' : 'primary.main'
                        }}
                      >
                        {stat.number}
                      </Typography>
                      <Typography 
                        variant="subtitle1"
                        sx={{ 
                          fontWeight: 600,
                          color: index % 2 === 0 ? 'white' : 'text.primary'
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Paper>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Mission */}
      <Box sx={{ bgcolor: '#f0f7ff', py: 8, width: '100%' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, color: 'primary.dark' }}>
              Наша миссия
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: '800px', mx: 'auto', color: 'text.secondary', mb: 5 }}>
              Мы стремимся сделать качественное образование доступным для всех, используя инновационные технологии и методики обучения
            </Typography>
          </Box>

          <Paper 
            elevation={3} 
            sx={{ 
              p: 5, 
              bgcolor: 'primary.main', 
              color: 'white',
              borderRadius: 4,
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
              backgroundImage: 'linear-gradient(135deg, #3f51b5 0%, #2196f3 100%)'
            }}
          >
            <List sx={{ py: 2 }}>
              {[
                'Предоставлять высококачественное образование, доступное каждому',
                'Использовать искусственный интеллект для персонализации обучения',
                'Создавать сообщество, где студенты могут учиться друг у друга',
                'Постоянно совершенствовать наши курсы и методики обучения',
                'Поддерживать студентов на каждом этапе их образовательного пути'
              ].map((item, index) => (
                <ListItem key={index} sx={{ py: 2 }}>
                  <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                    <CheckCircleIcon sx={{ fontSize: 28 }} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item} 
                    primaryTypographyProps={{ 
                      fontWeight: 500, 
                      fontSize: '1.1rem' 
                    }} 
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Container>
      </Box>

      {/* Benefits */}
      <Box sx={{ bgcolor: '#fff', py: 8, width: '100%' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ fontWeight: 700, mb: 6, color: 'primary.dark' }}
          >
            Почему выбирают нас
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 4 }}>
            {benefits.map((benefit, index) => (
              <Box key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box sx={{ 
                        color: 'white', 
                        mr: 3, 
                        bgcolor: 'primary.main',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}>
                        {benefit.icon}
                      </Box>
                      <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: 'text.primary' }}>
                        {benefit.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary" sx={{ ml: 11 }}>
                      {benefit.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Our Team */}
      <Box sx={{ bgcolor: '#f0f7ff', py: 8, mb: 8, width: '100%' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            align="center" 
            gutterBottom 
            sx={{ fontWeight: 700, mb: 6, color: 'primary.dark' }}
          >
            Наша команда
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {team.map((member, index) => (
              <Box key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)'
                    }
                  }}
                >
                  <Avatar 
                    src={member.avatar} 
                    alt={member.name}
                    sx={{ 
                      width: 140, 
                      height: 140, 
                      mb: 3,
                      border: '5px solid',
                      borderColor: 'primary.main',
                      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Typography variant="h5" component="div" gutterBottom sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 600, mb: 2, bgcolor: 'primary.light', px: 2, py: 0.5, borderRadius: 5 }}>
                    {member.position}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {member.bio}
                  </Typography>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Support */}
      <Container maxWidth="md" sx={{ mb: 8, textAlign: 'center' }}>
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 4,
            borderRadius: 4,
            bgcolor: 'background.paper',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
          }}
        >
          <SupportAgentIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Нужна помощь?
          </Typography>
          <Typography variant="body1" paragraph sx={{ maxWidth: '600px' }}>
            Наша команда поддержки всегда готова помочь вам с любыми вопросами. Свяжитесь с нами по электронной почте или через форму обратной связи.
          </Typography>
          <Typography variant="h6" color="primary">
            support@qazaqeduplus.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
