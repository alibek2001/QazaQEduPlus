import React from 'react'
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Paper,
    Stack,
    Divider,
} from '@mui/material'
import {
    School as SchoolIcon,
    Psychology as PsychologyIcon,
    Devices as DevicesIcon,
    ArrowForward as ArrowForwardIcon,
    AccessTime as AccessTimeIcon,
} from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

const Home: React.FC = () => {
    const features = [
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            title: 'Интерактивные курсы',
            description: 'Более 100 курсов с интерактивными заданиями и видеолекциями',
        },
        {
            icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
            title: 'ИИ-ассистент',
            description: 'Персональный ИИ-ассистент для помощи в обучении и ответов на вопросы',
        },
        {
            icon: <DevicesIcon sx={{ fontSize: 40 }} />,
            title: 'Доступ с любого устройства',
            description: 'Учитесь в любое время и в любом месте с любого устройства',
        },
    ]

    const popularCourses = [
        {
            id: 1,
            title: 'Основы программирования',
            description: 'Изучите основы программирования с нуля и создайте свои первые приложения',
            image: 'https://source.unsplash.com/random/300x200/?programming',
            level: 'Начинающий',
            duration: '8 недель',
        },
        {
            id: 2,
            title: 'Математика для всех',
            description: 'Курс математики, который поможет вам освоить ключевые концепции',
            image: 'https://source.unsplash.com/random/300x200/?math',
            level: 'Средний',
            duration: '10 недель',
        },
        {
            id: 3,
            title: 'Английский язык',
            description: 'Изучите английский язык с нуля до уровня свободного общения',
            image: 'https://source.unsplash.com/random/300x200/?english',
            level: 'Начинающий',
            duration: '12 недель',
        },
    ]

    return (
        <Box>
            {/* Hero Section */}
            <Paper
                sx={{
                    position: 'relative',
                    height: '70vh',
                    color: 'white',
                    mb: 4,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(https://source.unsplash.com/random/1920x1080/?education)',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Container maxWidth='lg'>
                    <Box sx={{ maxWidth: { xs: '100%', md: '60%' } }}>
                        <Typography
                            component='h1'
                            variant='h2'
                            color='inherit'
                            gutterBottom
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                            }}
                        >
                            Образование будущего с QazaQEduPlus
                        </Typography>
                        <Typography
                            variant='h5'
                            color='inherit'
                            paragraph
                            sx={{
                                mb: 4,
                                fontSize: { xs: '1rem', sm: '1.25rem' },
                            }}
                        >
                            Инновационная платформа для обучения с использованием искусственного интеллекта.
                            Персонализированные курсы, интерактивные материалы.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button
                                variant='contained'
                                size='large'
                                component={RouterLink}
                                to='/courses'
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                }}
                            >
                                Начать обучение
                            </Button>
                            <Button
                                variant='outlined'
                                size='large'
                                component={RouterLink}
                                to='/about'
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    color: 'white',
                                    borderColor: 'white',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                Узнать больше
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Paper>

            {/* Features Section */}
            <Box sx={{ bgcolor: 'background.default', py: 8, width: '100%' }}>
                <Container maxWidth='lg'>
                    <Typography
                        component='h2'
                        variant='h3'
                        align='center'
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 6, color: 'primary.dark' }}
                    >
                        Почему выбирают нас
                    </Typography>
                    <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
                        {features.map((feature, index) => (
                            <Grid item xs={12} md={4} key={index}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 2,
                                        boxShadow: 3,
                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                mb: 3,
                                                color: 'primary.main',
                                                bgcolor: 'primary.light',
                                                width: 80,
                                                height: 80,
                                                borderRadius: '50%',
                                                alignItems: 'center',
                                                mx: 'auto',
                                            }}
                                        >
                                            {feature.icon}
                                        </Box>
                                        <Typography
                                            gutterBottom
                                            variant='h5'
                                            component='h3'
                                            sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}
                                        >
                                            {feature.title}
                                        </Typography>
                                        <Typography variant='body1' color='text.secondary'>
                                            {feature.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            <Divider />

            {/* Popular Courses Section */}
            <Box sx={{ bgcolor: '#f5f8ff', py: 8, width: '100%' }}>
                <Container maxWidth='lg'>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}
                    >
                        <Typography
                            component='h2'
                            variant='h3'
                            gutterBottom
                            sx={{ fontWeight: 700, mb: 0, color: 'primary.dark' }}
                        >
                            Популярные курсы
                        </Typography>
                        <Button
                            component={RouterLink}
                            to='/courses'
                            endIcon={<ArrowForwardIcon />}
                            variant='contained'
                            color='primary'
                            sx={{ fontWeight: 600, borderRadius: 2, px: 3 }}
                        >
                            Все курсы
                        </Button>
                    </Box>
                    <Grid container spacing={4}>
                        {popularCourses.map((course) => (
                            <Grid item key={course.id} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        boxShadow: 3,
                                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'translateY(-10px)',
                                            boxShadow: '0 12px 20px rgba(0, 0, 0, 0.15)',
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component='img'
                                        height='180'
                                        image={course.image}
                                        alt={course.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                                        <Typography
                                            gutterBottom
                                            variant='h5'
                                            component='h3'
                                            sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}
                                        >
                                            {course.title}
                                        </Typography>
                                        <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
                                            {course.description}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                mt: 'auto',
                                            }}
                                        >
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    fontWeight: 600,
                                                    color: 'primary.main',
                                                    bgcolor: 'primary.light',
                                                    px: 2,
                                                    py: 0.5,
                                                    borderRadius: 5,
                                                }}
                                            >
                                                {course.level}
                                            </Typography>
                                            <Typography
                                                variant='body2'
                                                sx={{
                                                    color: 'text.secondary',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <AccessTimeIcon fontSize='small' sx={{ mr: 0.5 }} />
                                                {course.duration}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                    <CardActions sx={{ p: 2, pt: 0 }}>
                                        <Button
                                            size='medium'
                                            component={RouterLink}
                                            to={`/courses/${course.id}`}
                                            variant='outlined'
                                            color='primary'
                                            sx={{ borderRadius: 2, fontWeight: 600 }}
                                        >
                                            Подробнее
                                        </Button>
                                        <Button
                                            size='medium'
                                            variant='contained'
                                            color='primary'
                                            sx={{ ml: 'auto', borderRadius: 2, fontWeight: 600 }}
                                        >
                                            Записаться
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    py: 8,
                    mt: 4,
                }}
            >
                <Container maxWidth='md' sx={{ textAlign: 'center' }}>
                    <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                        Готовы начать свой путь к знаниям?
                    </Typography>
                    <Typography variant='h6' paragraph sx={{ mb: 4, opacity: 0.9 }}>
                        Присоединяйтесь к тысячам студентов, которые уже используют QazaQEduPlus для
                        достижения своих образовательных целей
                    </Typography>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='large'
                        component={RouterLink}
                        to='/register'
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                        }}
                    >
                        Зарегистрироваться бесплатно
                    </Button>
                </Container>
            </Box>
        </Box>
    )
}

export default Home
