import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CATEGORIES = [
  'Программирование',
  'Математика',
  'Физика',
  'Химия',
  'Биология',
  'История',
  'Литература',
  'Иностранные языки',
  'Искусство',
  'Музыка',
  'Спорт',
  'Бизнес',
  'Маркетинг',
  'Финансы',
  'Психология',
  'Другое'
];

const LEVELS = [
  'Начинающий',
  'Средний',
  'Продвинутый',
  'Все уровни'
];

const CreateCourse: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: '',
    duration: '',
    price: '',
    image: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Convert duration and price to numbers
      const courseData = {
        ...formData,
        duration: parseFloat(formData.duration),
        price: formData.price ? parseFloat(formData.price) : 0
      };
      
      const response = await axios.post('/api/courses', courseData);
      
      if (response.data.success) {
        navigate('/teacher/dashboard', { 
          state: { success: true, message: 'Курс успешно создан!' } 
        });
      } else {
        setError(response.data.message || 'Ошибка при создании курса');
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Ошибка при создании курса');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Создание нового курса
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Заполните информацию о вашем новом курсе. Вы сможете добавить лекции после создания курса.
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Название курса"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Например: Основы программирования на Python"
              />
            </Grid>
            
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Описание курса"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                multiline
                rows={4}
                placeholder="Подробно опишите, чему научатся студенты на вашем курсе"
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
                <InputLabel id="category-label">Категория</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  label="Категория"
                  onChange={handleSelectChange}
                >
                  {CATEGORIES.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
                <InputLabel id="level-label">Уровень сложности</InputLabel>
                <Select
                  labelId="level-label"
                  name="level"
                  value={formData.level}
                  label="Уровень сложности"
                  onChange={handleSelectChange}
                >
                  {LEVELS.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Продолжительность (в часах)"
                name="duration"
                type="number"
                value={formData.duration}
                onChange={handleChange}
                required
                inputProps={{ min: 0, step: 0.5 }}
              />
            </Grid>
            
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Цена (в тенге, 0 для бесплатного курса)"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                inputProps={{ min: 0, step: 100 }}
              />
            </Grid>
            
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="URL изображения курса"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </Grid>
            
            <Grid size={{ xs: 12 }}>
              <Box display="flex" justifyContent="space-between">
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  onClick={() => navigate('/teacher/dashboard')}
                >
                  Отмена
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Создать курс'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateCourse;
