import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Nếu dùng react-router

const NotFoundPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#f8f8f8"
      textAlign="center"
      px={2}
    >
      <Typography variant="h1" component="div" color="error" fontWeight="bold" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! Trang bạn tìm không tồn tại.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        sx={{ mt: 3 }}
      >
        Quay lại trang chủ
      </Button>
    </Box>
  );
};

export default NotFoundPage;
