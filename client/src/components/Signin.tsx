import { userState } from '@/stores/userStore'
import React from 'react'
import { useRecoilState } from 'recoil'
import { z } from "zod"
import {useFormik} from "formik"
import axios from "axios"
import { toast } from 'react-toastify'
import "react-toastify/ReactToastify.css"
import { Card, CardContent, CardHeader } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import {toFormikValidationSchema} from "zod-formik-adapter"
import { useNavigate } from 'react-router-dom'

const signInSchema = z.object({
    username: z.string().min(6,{message:"Invalid Email Address"}),
    password: z.string().min(6, {message:"Password must be of six characters long"})
});

type SignInFormValues= z.infer<typeof signInSchema>

const Signin: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    const formik= useFormik<SignInFormValues>({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema:toFormikValidationSchema(signInSchema),
        validateOnChange: false,
        validateOnBlur:false,
        onSubmit:async(values,{setSubmitting,setErrors}) => {
            try {
                const response = await axios.post("http://localhost:7001/api/auth/login", values);
                const { role, username } = response.data;

                setUser({ isAuthenticated: true, role, username })
                if (role === 'Admin')
                    navigate('/admin-dashboard');
                else if (role === 'Teacher')
                    navigate('/teacher-dashboard');
                toast.success("Sign-in successful");
            } catch (error) {
                setErrors({ username: "Invalid email or password" })
                toast.error("Sign-in failed. Please check credentials")
            } finally {
                setSubmitting(false);
            }
        }
    })
    return (
        <div className='flex items-center justify-center min-h-screen lg:bg-gray-100 px-4 sm:px-6 lg:px-8'>
            <Card className='w-full max-w-md'>
                <CardHeader className='text-center'>
                    <h2 className='text-2xl font-bold'>Sign In</h2>
                </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit} className='space-y-4'>
                            <div>
                                <Label>
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    name='username'
                                    type='text'
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.username && <p className='text-sm text-red-500'>{formik.errors.username}</p>}
                            </div>

                            {/* password */}
                            <div>
                                <Label>
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name='password'
                                    type='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.errors.password && <p className='text-sm text-red-500'>{formik.errors.password}</p>}
                            </div>
                            <div className='flex items-center justify-center'>
                                <Button
                                    type='submit'
                                    disabled={formik.isSubmitting}
                                    className='w-full py-4 bg-green-800 hover:bg-green-700'
                                >
                                    {formik.isSubmitting?"Signing In...":"Sign In"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
            </Card>
        </div>
    )
}

export default Signin
