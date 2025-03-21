import React from 'react'
import { Container } from '@mui/material';

function index({ children }) {
  return (
    <Container>
      { children }
    </Container>
  )
}

export default index