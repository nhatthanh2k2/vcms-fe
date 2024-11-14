import { newsService } from '@/services'
import { Modal } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { MyToast } from '../../common'
import 'quill/dist/quill.snow.css'
import Quill from 'quill'

export const NewsDetailModal = ({ visibleNewsDetailModal, hanldeCloseNewsDetailModal, newsId }) => {
    const [newsDetail, setNewsDetail] = useState(null)
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [content, setContent] = useState('')
    const quillRef = useRef(null)

    useEffect(() => {
        if (newsId) {
            newsService
                .getMyNewsDetailById(newsId)
                .then((response) => {
                    setNewsDetail(response.data.result)
                    setTitle(response.data.result?.newsTitle || '')
                    setImage(response.data.result?.newsImage || '')
                })
                .catch((error) => MyToast('error', 'Xảy ra lỗi khi lấy bài viết.'))
        }
    }, [newsId])

    useEffect(() => {
        if (newsDetail) {
            if (quillRef.current) {
                quillRef.current.root.innerHTML = newsDetail.newsContent
            } else {
                const quill = new Quill('#editorUpdate', {
                    theme: 'snow',
                    modules: {
                        toolbar: true,
                    },
                    placeholder: 'Nhập nội dung bài viết...',
                })

                quill.root.innerHTML = newsDetail.newsContent
                quillRef.current = quill
            }
        }
    }, [newsDetail])

    return (
        <Modal
            open={visibleNewsDetailModal}
            onCancel={hanldeCloseNewsDetailModal}
            footer={null}
            title={<div className="text-center font-bold text-2xl">Chi tiết bài viết</div>}
            width={1200}
            style={{
                top: 40,
                body: {
                    height: '500px', // Set the height for the modal body
                    overflowY: 'auto',
                },
            }}
        >
            <div className="h-125">
                <div className="flex flex-col space-y-2 font-semibold">
                    <label className="block mb-1 font-medium">Tiêu đề:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered input-info w-full h-12"
                    />
                </div>
                <div className="flex">
                    <div className="mt-2 w-2/3">
                        <label className="block mb-1 font-medium">Nội dung bài viết:</label>
                        <div id="editorUpdate"></div>
                    </div>

                    <div className="mt-2 w-1/3">
                        <img
                            src={image ? import.meta.env.VITE_VCMS_IMAGE + '/news/' + image : ''}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}
