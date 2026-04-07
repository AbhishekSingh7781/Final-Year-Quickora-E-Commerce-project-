import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
  fetchAllOrdersAsync, 
  selectOrders, 
  updateOrderAsync,
  selectOrderStatus 
} from '../features/order/OrderSlice'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Container,
  CircularProgress
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import { useForm } from "react-hook-form"
import { Navbar } from '../features/common/Navbar';

export const AdminOrdersPage = () => {
  const dispatch = useDispatch()
  const orders = useSelector(selectOrders)
  const status = useSelector(selectOrderStatus)
  const [editIndex, setEditIndex] = useState(-1)

  const { register, handleSubmit } = useForm()

  useEffect(() => {
    dispatch(fetchAllOrdersAsync({ sort: {}, pagination: {} }))
  }, [dispatch])

  const handleUpdateOrder = (data) => {
    const orderId = orders[editIndex].id;
    dispatch(updateOrderAsync({ id: orderId, status: data.status }));
    setEditIndex(-1);
  }

  const editOptions = ['pending', 'dispatched', 'out for delivery', 'delivered', 'cancelled']

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return { bgcolor: '#fef3c7', color: '#92400e' };
      case 'dispatched': return { bgcolor: '#e0f2fe', color: '#075985' };
      case 'out for delivery': return { bgcolor: '#fae8ff', color: '#86198f' };
      case 'delivered': return { bgcolor: '#dcfce7', color: '#166534' };
      case 'cancelled': return { bgcolor: '#fee2e2', color: '#991b1b' };
      default: return { bgcolor: '#f1f3f6', color: '#475569' };
    }
  }

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', pb: 10 }}>
      <Navbar />
      <Container maxWidth="xl" sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, fontFamily: "'Outfit', sans-serif" }}>Manage Orders</Typography>
        
        {status === 'loading' && editIndex === -1 ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>
        ) : (
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: '24px', border: '1px solid #f1f3f6', overflow: 'hidden' }}>
            <Table>
              <TableHead sx={{ bgcolor: '#f1f3f6' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Items</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Total</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Payment</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={order.id} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                    <TableCell><Typography variant="caption" sx={{ fontWeight: 600 }}>#{order.id.slice(-6)}</Typography></TableCell>
                    <TableCell>
                      <Stack spacing={1}>
                        {order.items.map((item, idx) => (
                          <Stack key={idx} direction="row" spacing={1} alignItems="center">
                            <Avatar src={item.product.thumbnail} sx={{ width: 32, height: 32 }} />
                            <Typography variant="caption" sx={{ fontWeight: 500 }}>{item.product.title} (x{item.quantity})</Typography>
                          </Stack>
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>
                       <Typography variant="body2" sx={{ fontWeight: 600 }}>{order.selectedAddress.name}</Typography>
                    </TableCell>
                    <TableCell><Typography variant="body2" sx={{ fontWeight: 800 }}>₹{Math.round(order.totalAmount)}</Typography></TableCell>
                    <TableCell>
                       <Typography variant="caption" sx={{ color: '#64748b' }}>
                          {order.selectedAddress.city}, {order.selectedAddress.state}
                       </Typography>
                    </TableCell>
                    <TableCell><Typography variant="caption" sx={{ fontWeight: 700, textTransform: 'uppercase' }}>{order.paymentMethod}</Typography></TableCell>
                    <TableCell><Typography variant="caption">{new Date(order.createdAt).toLocaleDateString()}</Typography></TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <FormControl size="small" fullWidth>
                          <Select
                            defaultValue={order.status}
                            {...register('status', { required: true })}
                            sx={{ borderRadius: '10px' }}
                          >
                            {editOptions.map(option => (
                              <MenuItem key={option} value={option}>{option}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      ) : (
                        <Chip 
                          label={order.status} 
                          size="small" 
                          sx={{ 
                            ...getStatusColor(order.status), 
                            fontWeight: 700, 
                            textTransform: 'capitalize',
                            borderRadius: '8px'
                          }} 
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Box component="form" onSubmit={handleSubmit(handleUpdateOrder)}>
                        {editIndex === index ? (
                          <IconButton type="submit" sx={{ color: '#10b981' }}>
                            <CheckCircleOutlinedIcon />
                          </IconButton>
                        ) : (
                          <IconButton onClick={() => setEditIndex(index)} sx={{ color: '#6366f1' }}>
                            <EditOutlinedIcon />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </Box>
  )
}
