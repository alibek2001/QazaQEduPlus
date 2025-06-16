import React, { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import { 
  Box, 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Button,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Chip,
  Stack,
  Divider
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { 
  Search as SearchIcon,
  FilterList as FilterListIcon,
  AccessTime as AccessTimeIcon,
  BarChart as BarChartIcon,
  Star as StarIcon
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Courses: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [level, setLevel] = useState('all');
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Загрузка курсов из API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await courseService.getCourses({
          category: category !== 'all' ? category : undefined,
          level: level !== 'all' ? level : undefined,
          search: searchTerm || undefined
        });
        setCourses(data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Не удалось загрузить курсы. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [category, level, searchTerm]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleLevelChange = (event: SelectChangeEvent) => {
    setLevel(event.target.value);
    setPage(1);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleEnroll = async (courseId: string | number) => {
    try {
      await courseService.enrollCourse(courseId);
      alert('Вы успешно записались на курс!');
    } catch (err: any) {
      console.error('Error enrolling in course:', err);
      alert(err.response?.data?.message || 'Не удалось записаться на курс. Пожалуйста, попробуйте позже.');
    }
  };

  // Pagination
  const coursesPerPage = 6;
  const totalPages = Math.ceil(courses.length / coursesPerPage);
  const displayedCourses = courses.slice(
    (page - 1) * coursesPerPage,
    page * coursesPerPage
  );

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'programming', label: 'Программирование' },
    { value: 'mathematics', label: 'Математика' },
    { value: 'languages', label: 'Языки' },
    { value: 'science', label: 'Наука' },
    { value: 'humanities', label: 'Гуманитарные науки' },
    { value: 'business', label: 'Бизнес' }
  ];

  const levels = [
    { value: 'all', label: 'Все уровни' },
    { value: 'beginner', label: 'Начинающий' },
    { value: 'intermediate', label: 'Средний' },
    { value: 'advanced', label: 'Продвинутый' }
  ];

  const getLevelColor = (level: string): 'success' | 'primary' | 'error' | 'default' => {
    switch(level) {
      case 'beginner':
        return 'success';
      case 'intermediate':
        return 'primary';
      case 'advanced':
        return 'error';
      default:
        return 'default';
    }
  };

  const getLevelLabel = (level: string) => {
    switch(level) {
      case 'beginner':
        return 'Начинающий';
      case 'intermediate':
        return 'Средний';
      case 'advanced':
        return 'Продвинутый';
      default:
        return level;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Header */}
      <Box 
        sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 8,
          mb: 4,
          width: '100%'
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
            Наши курсы
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            paragraph
            sx={{ opacity: 0.9, maxWidth: '800px', mx: 'auto' }}
          >
            Выберите из широкого спектра курсов, разработанных экспертами в своих областях
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {/* Search and Filters */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            <Box sx={{ gridColumn: { xs: '1', md: '1' } }}>
              <TextField
                fullWidth
                placeholder="Поиск курсов..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box sx={{ gridColumn: { xs: '1', md: '2' } }}>
              <FormControl fullWidth>
                <InputLabel id="category-label">Категория</InputLabel>
                <Select
                  labelId="category-label"
                  value={category}
                  label="Категория"
                  onChange={handleCategoryChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <FilterListIcon />
                    </InputAdornment>
                  }
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ gridColumn: { xs: '1', md: '3' } }}>
              <FormControl fullWidth>
                <InputLabel id="level-label">Уровень</InputLabel>
                <Select
                  labelId="level-label"
                  value={level}
                  label="Уровень"
                  onChange={handleLevelChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <BarChartIcon />
                    </InputAdornment>
                  }
                >
                  {levels.map((lvl) => (
                    <MenuItem key={lvl.value} value={lvl.value}>
                      {lvl.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>

        {/* Results count */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            Найдено курсов: {courses.length}
          </Typography>
        </Box>
        
        {/* Loading and Error states */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <Typography>Загрузка курсов...</Typography>
          </Box>
        )}
        
        {error && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <Typography color="error">{error}</Typography>
          </Box>
        )}

        {/* Courses Grid */}
        {displayedCourses.length > 0 ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {displayedCourses.map((course) => (
              <Box key={course.id}>
                <Card 
                  sx={{ 
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
                    <Box sx={{ mb: 1 }}>
                      <Chip 
                        label={getLevelLabel(course.level)} 
                        size="small" 
                        color={getLevelColor(course.level)}
                        sx={{ fontWeight: 500 }}
                      />
                    </Box>
                    <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {course.description}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AccessTimeIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary">
                          {course.duration}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <StarIcon fontSize="small" sx={{ mr: 0.5, color: '#FFD700' }} />
                        <Typography variant="body2" color="text.secondary">
                          {course.rating}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {course.students} студентов
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      component={RouterLink} 
                      to={`/courses/${course.id}`}
                      sx={{ ml: 1, mb: 1 }}
                    >
                      Подробнее
                    </Button>
                    <Button 
                      size="small" 
                      variant="contained" 
                      color="primary"
                      sx={{ ml: 'auto', mr: 1, mb: 1 }}
                      onClick={() => handleEnroll(course.id)}
                    >
                      Записаться
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{ py: 8, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              Курсы не найдены
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Попробуйте изменить параметры поиска
            </Typography>
          </Box>
        )}
        
        {/* Pagination */}
        {courses.length > coursesPerPage && (
          <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
              size="large"
              showFirstButton 
              showLastButton
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Courses;
