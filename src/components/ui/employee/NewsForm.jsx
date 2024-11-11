import React, { useEffect, useRef, useState } from 'react'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'
import { NewsService } from '@/services'
import { MyToast } from '../common'

const options = {
    debug: 'error',
    modules: {
        toolbar: true,
    },
    placeholder: 'Viết nội dung vào đây...',
    theme: 'snow',
}

export const NewsForm = ({ employee }) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)

    const quillRef = useRef(null)

    const handleEditorInit = () => {
        if (quillRef.current) return

        const quill = new Quill('#editor', options)
        quillRef.current = quill

        quill.root.addEventListener(
            'scroll',
            (event) => {
                event.stopImmediatePropagation()
            },
            { passive: true }
        )

        quill.on('text-change', () => {
            setContent(quill.root.innerHTML)
        })
    }

    useEffect(() => {
        handleEditorInit()
    }, [])

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('newsTitle', title)
        formData.append('newsContent', content)
        formData.append('newsImage', image)
        formData.append('employeeId', employee.employeeProfile.employeeId)

        try {
            const response = await NewsService.createNews(formData)
            console.log(response)

            if (response.data.code === 1000) {
                MyToast('success', 'Tạo bài viết thành công.')
                setTitle('')
                setContent('')
                const quillEditor = document.querySelector('.ql-editor')
                if (quillEditor) {
                    quillEditor.innerHTML = ''
                }

                setImage(null)

                document.querySelector('input[type="file"]').value = null
            } else {
                MyToast('error', 'Tạo bài viết thất bại.')
            }
        } catch (error) {
            if (error.response) {
                MyToast('error', 'Xảy ra lỗi khi tạo bài viết.')
            }
        }
    }

    return (
        <section className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl md:text-2xl pl-2 my-2 border-l-4 text-orange-600  font-sans font-bold border-teal-400  dark:text-gray-200">
                Tạo bài viết
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row space-x-4">
                    <div className="flex flex-col space-y-2 font-semibold w-2/3">
                        <label className="block mb-1 font-medium">Tiêu đề bài viết:</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Nhập tiêu đề"
                            className="input input-bordered input-info w-full  h-12"
                        />
                    </div>

                    <div className="flex flex-col space-y-2 font-semibold w-1/3">
                        <label className="block mb-1 font-medium">Hình ảnh:</label>
                        <input
                            accept="image/*"
                            onChange={handleImageChange}
                            type="file"
                            className="file-input file-input-bordered file-input-info  w-full max-w-xs"
                        />
                    </div>
                </div>

                <div className="mt-2">
                    <label className="block mb-1 font-medium">Nội dung bài viết:</label>
                    <div className="min-h-80 z-10" id="editor"></div>
                </div>

                <div className="m-3 flex justify-end">
                    <button
                        type="submit"
                        className="bg-white text-gray-800 font-bold rounded-full border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
                    >
                        <span className="mr-2">Tạo bài</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <g fill="none" fillRule="evenodd">
                                <path d="M0 0h24v24H0z" />
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    d="M4 5a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 20 7.828V19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z"
                                />
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeWidth={2}
                                    d="M15 4v2a2 2 0 0 0 2 2h2M12 9v6M9 12h6"
                                />
                            </g>
                        </svg>
                    </button>
                </div>
            </form>
        </section>
    )
}
