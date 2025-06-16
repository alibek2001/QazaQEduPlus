import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Divider
} from '@mui/material';
import { 
  School as SchoolIcon, 
  Psychology as PsychologyIcon, 
  Devices as DevicesIcon
} from '@mui/icons-material';

const SimplifiedHome: React.FC = () => {

  const features = [
    {
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      title: 'Интерактивные курсы',
      description: 'Более 100 курсов с интерактивными заданиями и видеолекциями'
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
      title: 'ИИ-ассистент',
      description: 'Персональный ИИ-ассистент для помощи в обучении и ответов на вопросы'
    },
    {
      icon: <DevicesIcon sx={{ fontSize: 40 }} />,
      title: 'Доступ с любого устройства',
      description: 'Учитесь в любое время и в любом месте с любого устройства'
    }
  ];

  const popularCourses = [
    {
      id: 1,
      title: 'Основы программирования',
      description: 'Изучите основы программирования с нуля и создайте свои первые приложения',
      image: 'https://source.unsplash.com/random/300x200/?programming',
      level: 'Начинающий',
      duration: '8 недель'
    },
    {
      id: 2,
      title: 'Математика для всех',
      description: 'Курс математики, который поможет вам освоить ключевые концепции',
      image: 'https://source.unsplash.com/random/300x200/?math',
      level: 'Средний',
      duration: '10 недель'
    },
    {
      id: 3,
      title: 'Английский язык',
      description: 'Изучите английский язык с нуля до уровня свободного общения',
      image: 'https://source.unsplash.com/random/300x200/?english',
      level: 'Начинающий',
      duration: '12 недель'
    }
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ 
        bgcolor: 'primary.main', 
        color: 'white', 
        p: 2, 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          QazaQEduPlus
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit">Главная</Button>
          <Button color="inherit">Курсы</Button>
          <Button color="inherit">О нас</Button>
          <Button color="inherit" variant="outlined" sx={{ borderColor: 'white' }}>
            Войти
          </Button>
          <Button color="secondary" variant="contained">
            Регистрация
          </Button>
        </Box>
      </Box>

      {/* Hero Section */}
      <Paper 
        sx={{ 
          position: 'relative',
          height: '70vh',
          color: 'white',
          mb: 4,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://source.unsplash.com/random/1920x1080/?education)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ width: '100%', maxWidth: { xs: '100%', md: '80%' } }}>
            <Typography 
              component="h1" 
              variant="h2" 
              color="inherit" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
              }}
            >
              Образование будущего с QazaQEduPlus
            </Typography>
            <Typography 
              variant="h5" 
              color="inherit" 
              paragraph
              sx={{ 
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              Инновационная платформа для обучения с использованием искусственного интеллекта.
              Персонализированные курсы, интерактивные материалы и поддержка 24/7.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1rem'
                }}
              >
                Начать обучение
              </Button>
              <Button 
                variant="outlined" 
                size="large" 
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1rem',
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Узнать больше
              </Button>
            </Stack>
          </Box>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8, width: '100%' }}>
        <Typography 
          component="h2" 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 600, mb: 6 }}
        >
          Почему выбирают нас
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', width: '100%' }}>
          {features.map((feature, index) => (
            <Card 
              key={index}
              sx={{ 
                width: '100%',
                maxWidth: '350px', 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    mb: 2,
                    color: 'primary.main'
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      <Divider />

      {/* Popular Courses Section */}
      <Container maxWidth="lg" sx={{ py: 8, width: '100%' }}>
        <Typography 
          component="h2" 
          variant="h3" 
          gutterBottom
          sx={{ fontWeight: 600, mb: 4 }}
        >
          Популярные курсы
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', width: '100%' }}>
          {popularCourses.map((course) => (
            <Card 
              key={course.id}
              sx={{ 
                width: '100%',
                maxWidth: '350px',
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)'
                }
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={course.image}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="primary">
                    {course.level}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.duration}
                  </Typography>
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button size="small" variant="contained" fullWidth>
                  Подробнее
                </Button>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          mt: 4
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
            Готовы начать свой путь к знаниям?
          </Typography>
          <Typography variant="h6" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Присоединяйтесь к тысячам студентов, которые уже используют QazaQEduPlus для достижения своих образовательных целей
          </Typography>
          <Button 
            variant="contained" 
            color="secondary" 
            size="large" 
            sx={{ 
              px: 4, 
              py: 1.5,
              fontSize: '1rem'
            }}
          >
            Зарегистрироваться бесплатно
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto', 
          backgroundColor: 'primary.dark',
          color: 'white'
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} QazaQEduPlus. Все права защищены.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default SimplifiedHome;
