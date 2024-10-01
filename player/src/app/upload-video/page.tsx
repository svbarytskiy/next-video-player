"use client"
import { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { IFormInput } from "./types"

const UploadVideo: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('video', data.video[0])

        try {
            const res = await fetch('http://localhost:4200/api/upload', {
                method: "POST",
                body: formData

            })
            if (res.ok) {
                console.log('Video uploaded')
            } else {
                console.log('Failed to load')
            }
        } catch (error) {
            console.error(error + 'Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md m-auto p-4 bg-gray-800 rounded shadow mt-20">
            <div className="mb-4">
                <label>
                    <span className="mb-2 block">Upload video:</span>
                    <input type="file" accept="video/*" {...register("video", {
                        required: 'Please select a video'
                    })} />
                </label>
                {errors.video && <span className="text-red-500">
                    {errors.video.message}
                </span>}
            </div>
            <button disabled={isLoading} className="p-3 rounded bg-primary transition duratшon-100 hoverPrimary hover:bg-white">Upload</button>
        </form>
    )
}

export default UploadVideo