import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Paper,
  Avatar,
  Divider,
  Snackbar,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const TeacherProfile: React.FC = () => {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: '',
    specialization: '',
    experience: '',
    education: '',
    phone: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.put('/api/teachers/profile', formData);
      
      if (response.data.success) {
        setSuccess(true);
      } else {
        setError(response.data.message || 'Ошибка обновления профиля');
      }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      setError(error.response?.data?.message || 'Ошибка обновления профиля');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccess(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80, 
              mr: 2,
              bgcolor: 'primary.main'
            }}
          >
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" component="h1">
              Профиль преподавателя
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Обновите информацию о себе, которая будет видна студентам
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Имя"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Фамилия"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Номер телефона"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Специализация"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Например: Математика, Программирование, Иностранные языки"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Образование"
                name="education"
                value={formData.education}
                onChange={handleChange}
                placeholder="Например: МГУ, факультет математики, 2010-2015"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Опыт работы"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Например: 5 лет преподавания в университете"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="О себе"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Расскажите о своем опыте и подходе к преподаванию"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Box display="flex" justifyContent="space-between">
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  href="/teacher/dashboard"
                >
                  Назад
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Сохранить изменения'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar 
        open={success} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Профиль успешно обновлен!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TeacherProfile;
