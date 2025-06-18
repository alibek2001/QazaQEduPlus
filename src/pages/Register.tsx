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
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  Email as EmailIcon, 
  Person as PersonIcon,
  Lock as LockIcon,
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  School as SchoolIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const navigate = useNavigate();

  const steps = ['Личная информация', 'Учетные данные', 'Завершение'];

  const handleNext = () => {
    if (activeStep === 0) {
      if (!firstName || !lastName) {
        setError('Пожалуйста, заполните все поля');
        return;
      }
      setError('');
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 1) {
      if (!email || !password || !confirmPassword) {
        setError('Пожалуйста, заполните все поля');
        return;
      }
      if (!email.includes('@')) {
        setError('Пожалуйста, введите корректный email');
        return;
      }
      if (password.length < 6) {
        setError('Пароль должен содержать не менее 6 символов');
        return;
      }
      if (password !== confirmPassword) {
        setError('Пароли не совпадают');
        return;
      }
      setError('');
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!agreeToTerms && activeStep === 2) {
      setError('Пожалуйста, примите условия использования');
      return;
    }

    try {
      setError('');
      
      // Регистрация пользователя через API
      await authService.register({
        firstName,
        lastName,
        email,
        password,
        role
      });
      
      // Перенаправление на главную страницу после успешной регистрации
      navigate('/');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      console.error('Registration error:', error);
      setError(error.response?.data?.message || 'Ошибка при регистрации. Пожалуйста, попробуйте позже.');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ width: '100%' }}
              id="firstName"
              label="Имя"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                if (error) setError('');
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ width: '100%' }}
              id="lastName"
              label="Фамилия"
              name="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (error) setError('');
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Роль</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                value={role}
                label="Роль"
                onChange={(e) => setRole(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <SchoolIcon />
                  </InputAdornment>
                }
              >
                <MenuItem value="student">Студент</MenuItem>
                <MenuItem value="teacher">Преподаватель</MenuItem>
              </Select>
              <FormHelperText>Выберите вашу роль на платформе</FormHelperText>
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ width: '100%' }}
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
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
              sx={{ width: '100%' }}
              name="password"
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
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
            <TextField
              margin="normal"
              required
              fullWidth
              sx={{ width: '100%' }}
              name="confirmPassword"
              label="Подтвердите пароль"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError('');
              }}
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
                      onClick={handleClickShowConfirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </>
        );
      case 2:
        return (
          <Box sx={{ mt: 1, width: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Подтверждение регистрации
            </Typography>
            <Typography variant="body1" paragraph>
              Пожалуйста, проверьте введенные данные:
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Имя:
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2" fontWeight="medium">
                  {firstName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Фамилия:
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2" fontWeight="medium">
                  {lastName}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Email:
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2" fontWeight="medium">
                  {email}
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Роль:
                </Typography>
              </Grid>
              <Grid size={{ xs: 6 }}>
                <Typography variant="body2" fontWeight="medium">
                  {role === 'student' ? 'Студент' : 'Преподаватель'}
                </Typography>
              </Grid>
            </Grid>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={agreeToTerms} 
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    if (error) setError('');
                  }} 
                  name="agreeToTerms" 
                  color="primary" 
                />
              }
              label={
                <Typography variant="body2">
                  Я принимаю {' '}
                  <Link component={RouterLink} to="/terms" target="_blank">
                    условия использования
                  </Link>
                  {' '} и {' '}
                  <Link component={RouterLink} to="/privacy" target="_blank">
                    политику конфиденциальности
                  </Link>
                </Typography>
              }
              sx={{ mt: 2 }}
            />
          </Box>
        );
      default:
        return 'Неизвестный шаг';
    }
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 8 }}>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid size={{ xs: 12, sm: 6 }}>
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
              Присоединяйтесь к QazaQEduPlus
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Создайте аккаунт, чтобы получить доступ к тысячам курсов, интерактивным материалам и персональному ИИ-ассистенту.
            </Typography>
            <Box
              component="img"
              src="https://source.unsplash.com/random/600x400/?education,students"
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
        <Grid size={{ xs: 12, sm: 6 }}>
          <Paper
            elevation={6}
            sx={{ p: 4, maxWidth: '500px', width: '100%', mx: 'auto' }}
          >
            <Typography component="h2" variant="h4" align="center" gutterBottom sx={{ fontWeight: 600 }}>
              Регистрация
            </Typography>
            <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 2 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                  sx={{ px: 3 }}
                >
                  Назад
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ px: 3 }}
                  >
                    Зарегистрироваться
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{ px: 3 }}
                  >
                    Далее
                  </Button>
                )}
              </Box>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="body2">
                  Уже есть аккаунт?{' '}
                  <Link component={RouterLink} to="/login" variant="body2" sx={{ fontWeight: 600 }}>
                    Войти
                  </Link>
                </Typography>
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <Divider>
                  <Typography variant="body2" color="text.secondary">
                    Или зарегистрируйтесь через
                  </Typography>
                </Divider>
              </Box>
              
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    sx={{ py: 1.5 }}
                  >
                    Google
                  </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
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
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
