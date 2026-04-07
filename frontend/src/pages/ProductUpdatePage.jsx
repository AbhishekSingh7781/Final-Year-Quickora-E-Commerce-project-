import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clearSelectedProduct, fetchProductByIdAsync, selectSelectedProduct, resetProductUpdateStatus, selectProductUpdateStatus } from '../features/products/ProductSlice'
import { updateProductByIdAsync } from '../features/products/ProductSlice'
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography, useMediaQuery, useTheme, Box } from '@mui/material'
import { useForm } from "react-hook-form"
import { selectBrands } from '../features/brands/BrandSlice'
import { selectCategories } from '../features/categories/CategoriesSlice'
import { toast } from 'react-toastify'
import { Navbar } from '../features/common/Navbar'
import { Footer } from '../features/common/Footer'

export const ProductUpdatePage = () => {

    const {register,handleSubmit,watch,formState: { errors }} = useForm()

    const {id}=useParams()
    const dispatch=useDispatch()
    const selectedProduct=useSelector(selectSelectedProduct)
    const brands=useSelector(selectBrands)
    const categories=useSelector(selectCategories)
    const productUpdateStatus=useSelector(selectProductUpdateStatus)
    const navigate=useNavigate()
    const theme=useTheme()
    const is1100=useMediaQuery(theme.breakpoints.down(1100))
    const is480=useMediaQuery(theme.breakpoints.down(480))

    useEffect(()=>{
        if(id){
            dispatch(fetchProductByIdAsync(id))
        }
    },[id])

    useEffect(()=>{
        if(productUpdateStatus==='fullfilled'){
            toast.success("Product Updated")
            navigate("/admin/dashboard")
        }
    },[productUpdateStatus])

    useEffect(()=>{
        return ()=>{
            dispatch(clearSelectedProduct())
            dispatch(resetProductUpdateStatus())
        }
    },[])

    const handleProductUpdate=(data)=>{
        const productUpdate={...data,_id:selectedProduct._id,images:[data?.image0,data?.image1,data?.image2,data?.image3]}
        delete productUpdate?.image0
        delete productUpdate?.image1
        delete productUpdate?.image2
        delete productUpdate?.image3

        dispatch(updateProductByIdAsync(productUpdate))
    }

  return (
    <Box sx={{ backgroundColor: '#f1f3f6', minHeight: '100vh' }}>
    <Navbar />
    <Stack p={'0 16px'} justifyContent={'center'} alignItems={'center'} flexDirection={'row'} >
        {
            selectedProduct &&
        <Stack width={is1100?"100%":"60rem"} rowGap={4} mt={is480?4:6} mb={6} component={'form'} noValidate onSubmit={handleSubmit(handleProductUpdate)}> 
            <Typography variant='h4' sx={{ fontWeight: 600 }}>Update Product</Typography>
            
            {/* field area */}
            <Stack rowGap={3} sx={{ backgroundColor: 'white', p: 4, borderRadius: '2px', boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)' }}>
                <Stack>
                    <Typography variant='h6' fontWeight={400} gutterBottom>Title</Typography>
                    <TextField {...register("title",{required:'Title is required',value:selectedProduct.title || ''})}/>
                </Stack> 

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <FormControl fullWidth>
                        <InputLabel id="brand-selection">Brand</InputLabel>
                        <Select defaultValue={selectedProduct.brand?._id || ''} {...register("brand",{required:"Brand is required"})} labelId="brand-selection" label="Brand">
                            {brands.map((brand)=>(
                                <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel id="category-selection">Category</InputLabel>
                        <Select defaultValue={selectedProduct.category?._id || ''} {...register("category",{required:"category is required"})} labelId="category-selection" label="Category">
                            {categories.map((category)=>(
                                <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                <Stack>
                    <Typography variant='h6' fontWeight={400}  gutterBottom>Description</Typography>
                    <TextField multiline rows={4} {...register("description",{required:"Description is required",value:selectedProduct.description || ''})}/>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Stack flex={1}>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Price (₹)</Typography>
                        <TextField type='number' {...register("price",{required:"Price is required",value:selectedProduct.price || 0})}/>
                    </Stack>
                    <Stack flex={1}>
                        <Typography variant='h6' fontWeight={400}  gutterBottom>Discount %</Typography>
                        <TextField type='number' {...register("discountPercentage",{required:"discount percentage is required",value:selectedProduct.discountPercentage || 0})}/>
                    </Stack>
                </Stack>
                <Stack>
                    <Typography variant='h6'  fontWeight={400} gutterBottom>Stock Quantity</Typography>
                    <TextField type='number' {...register("stockQuantity",{required:"Stock Quantity is required",value:selectedProduct.stockQuantity || 0})}/>
                </Stack>
                <Stack>
                    <Typography variant='h6'  fontWeight={400} gutterBottom>Thumbnail</Typography>
                    <TextField {...register("thumbnail",{required:"Thumbnail is required",value:selectedProduct.thumbnail || ''})}/>
                </Stack>

                <Stack>
                    <Typography variant='h6'  fontWeight={400} gutterBottom>Product Images</Typography>
                    <Stack rowGap={2}>
                        {
                            selectedProduct.images?.map((image,index)=>(
                                <TextField key={index} {...register(`image${index}`,{required:"Image is required",value:image || ''})}/>
                            ))
                        }
                    </Stack>
                </Stack>
                
                <Stack flexDirection={'row'} alignSelf={'flex-end'} columnGap={is480?1:2} pt={2}>
                    <Button size={is480?'medium':'large'} variant='contained' type='submit' sx={{ backgroundColor: '#fb641b', '&:hover': { backgroundColor: '#e65100' } }}>Update Product</Button>
                    <Button size={is480?'medium':'large'} variant='outlined' color='error' component={Link} to={'/admin/dashboard'}>Cancel</Button>
                </Stack>
            </Stack>
        </Stack>
        }
    </Stack>
    <Footer />
    </Box>
  )
}