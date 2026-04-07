import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { addProductAsync, resetProductAddStatus, selectProductAddStatus } from '../features/products/ProductSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme, Box } from '@mui/material'
import { useForm } from "react-hook-form"
import { selectBrands } from '../features/brands/BrandSlice'
import { selectCategories } from '../features/categories/CategoriesSlice'
import { toast } from 'react-toastify'
import { Navbar } from '../features/common/Navbar'
import { Footer } from '../features/common/Footer'

export const AddProductPage = () => {
    const {register,handleSubmit,reset,formState: { errors }} = useForm()
    const dispatch=useDispatch()
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const productAddStatus=useSelector(selectProductAddStatus)
    const navigate=useNavigate()
    const theme=useTheme()
    const is1100=useMediaQuery(theme.breakpoints.down(1100))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    useEffect(()=>{
        if(productAddStatus==='fullfilled'){
            reset()
            toast.success("New product added")
            navigate("/admin/dashboard")
        }
    },[productAddStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(resetProductAddStatus())
        }
    },[])

    const handleAddProduct=(data)=>{
        const newProduct={...data,_id: Math.random().toString(36).substr(2, 9), images:[data.image0,data.image1,data.image2,data.image3]}
        delete newProduct.image0
        delete newProduct.image1
        delete newProduct.image2
        delete newProduct.image3

        dispatch(addProductAsync(newProduct))
    }

    return (
    <Box sx={{ backgroundColor: '#f1f3f6', minHeight: '100vh' }}>
        <Navbar />
        <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} >
            <Stack width={is1100?"100%":"60rem"} rowGap={4} mt={is480?4:6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleAddProduct)}> 
                <Typography variant='h4' sx={{ fontWeight: 600 }}>Add New Product</Typography>
                
                {/* field area */}
                <Stack rowGap={3} sx={{ backgroundColor: 'white', p: 4, borderRadius: '2px', boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)' }}>
                    <Stack>
                        <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                        <TextField {...register("title",{required:'Title is required'})} placeholder="e.g. Apple iPhone 15 Pro"/>
                    </Stack> 

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <FormControl fullWidth>
                            <InputLabel id="brand-selection">Brand</InputLabel>
                            <Select {...register("brand",{required:"Brand is required"})} labelId="brand-selection" label="Brand">
                                {brands.map((brand)=>(
                                    <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="category-selection">Category</InputLabel>
                            <Select {...register("category",{required:"category is required"})} labelId="category-selection" label="Category">
                                {categories.map((category)=>(
                                    <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>

                    <Stack>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Description</Typography>
                        <TextField multiline rows={4} {...register("description",{required:"Description is required"})} placeholder="Add product details..."/>
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Stack flex={1}>
                            <Typography variant='h6' fontWeight={400}  gutterBottom>Price (₹)</Typography>
                            <TextField type='number' {...register("price",{required:"Price is required"})} defaultValue={0}/>
                        </Stack>
                        <Stack flex={1}>
                            <Typography variant='h6' fontWeight={400}  gutterBottom>Discount (%)</Typography>
                            <TextField type='number' {...register("discountPercentage",{required:"discount percentage is required"})} defaultValue={0}/>
                        </Stack>
                    </Stack>

                    <Stack>
                        <Typography variant='h6'  fontWeight={400} gutterBottom>Stock Quantity</Typography>
                        <TextField type='number' {...register("stockQuantity",{required:"Stock Quantity is required"})} defaultValue={10}/>
                    </Stack>

                    <Stack>
                        <Typography variant='h6'  fontWeight={400} gutterBottom>Thumbnail URL</Typography>
                        <TextField {...register("thumbnail",{required:"Thumbnail is required"})} placeholder="https://..."/>
                    </Stack>

                    <Stack>
                        <Typography variant='h6'  fontWeight={400} gutterBottom>Product Images (Gallery)</Typography>
                        <Stack rowGap={2}>
                            <TextField {...register("image0",{required:"Image 1 is required"})} placeholder="Image 1 URL"/>
                            <TextField {...register("image1",{required:"Image 2 is required"})} placeholder="Image 2 URL"/>
                            <TextField {...register("image2",{required:"Image 3 is required"})} placeholder="Image 3 URL"/>
                            <TextField {...register("image3",{required:"Image 4 is required"})} placeholder="Image 4 URL"/>
                        </Stack>
                    </Stack>
                    
                    <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2} pt={2}>
                        <Button size={is480?'medium':'large'} variant='contained' type='submit' sx={{ backgroundColor: '#fb641b', '&:hover': { backgroundColor: '#e65100' } }}>Add Product</Button>
                        <Button size={is480?'medium':'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
        <Footer />
    </Box>
    )
}