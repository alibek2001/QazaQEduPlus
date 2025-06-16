import React, { useState } from 'react';
import { authService } from '../services/authService';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid, 
  Link, 
  InputAdornment, 
  IconButton,
  Divider,
  Alert
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email as EmailIcon, 
  Lock as LockIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (error) setError('');
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (!email.includes('@')) {
      setError('Пожалуйста, введите корректный email');
      return;
    }

    try {
      setError('');
      
      // Выполняем вход через API
      await authService.login({
        email,
        password
      });
      
      // Перенаправляем на главную страницу после успешного входа
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Ошибка входа. Проверьте правильность email и пароля.');
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Grid container spacing={4} sx={{ mt: 4, justifyContent: 'center' }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              pr: { md: 8 },
            }}
          >
            <Typography component="h1" variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              Добро пожаловать!
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Войдите в свой аккаунт, чтобы продолжить обучение и получить доступ к персонализированным курсам и материалам.
            </Typography>
            <Box
              component="img"
              src="https://source.unsplash.com/random/600x400/?education,learning"
              alt="Education"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                display: { xs: 'none', md: 'block' }
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              maxWidth: '500px',
              mx: 'auto',
              width: '100%'
            }}
          >
            <Typography component="h2" variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
              Вход в аккаунт
            </Typography>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            
            <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{ width: '100%' }}
                value={email}
                onChange={handleEmailChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Пароль"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                sx={{ width: '100%' }}
                value={password}
                onChange={handlePasswordChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <Box sx={{ textAlign: 'right', mt: 1 }}>
                <Link component={RouterLink} to="/forgot-password" variant="body2">
                  Забыли пароль?
                </Link>
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, mb: 2, py: 1.5 }}
              >
                Войти
              </Button>
              
              <Box sx={{ mt: 2, mb: 3 }}>
                <Divider>
                  <Typography variant="body2" color="text.secondary">
                    Или войдите через
                  </Typography>
                </Divider>
              </Box>
              
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{ py: 1.5 }}
                  >
                    Google
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FacebookIcon />}
                    sx={{ py: 1.5 }}
                  >
                    Facebook
                  </Button>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2" align="center">
                  Нет аккаунта?{' '}
                  <Link component={RouterLink} to="/register">
                    Зарегистрироваться
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
