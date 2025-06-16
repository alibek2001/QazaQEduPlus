import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h1" color="primary" sx={{ fontWeight: 700, fontSize: '8rem' }}>
          404
        </Typography>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
          Страница не найдена
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: '600px', mb: 4 }}>
          Извините, но страница, которую вы ищете, не существует или была перемещена.
          Пожалуйста, вернитесь на главную страницу или воспользуйтесь навигацией.
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={RouterLink}
          to="/"
          sx={{ px: 4, py: 1.5 }}
        >
          Вернуться на главную
        </Button>
      </Paper>
    </Container>
  );
};

export default NotFound;
