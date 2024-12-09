import React, { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export const VaccineFieldEditor = ({ label, items, setItems }) => {
    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const formatItemsToHTML = (items) => {
        return items.map((item) => `<p>${item}</p>`).join('')
    }

    const parseHTMLToItems = (html) => {
        const tempDiv = document.createElement('div')
        tempDiv.innerHTML = html
        return Array.from(tempDiv.querySelectorAll('p'))
            .map((p) => p.textContent)
            .filter((text) => text.trim() !== '')
    }

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Nhập nội dung...',
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['clean'],
                    ],
                },
            })

            if (items && items.length) {
                quillRef.current.root.innerHTML = formatItemsToHTML(items)
            }

            quillRef.current.on('text-change', () => {
                if (setItems) {
                    const newItems = parseHTMLToItems(quillRef.current.root.innerHTML)
                    if (JSON.stringify(newItems) !== JSON.stringify(items)) {
                        setItems(newItems)
                    }
                }
            })
        }

        return () => {
            if (quillRef.current) {
                quillRef.current = null
            }
        }
    }, [])

    return (
        <div>
            <label className="block mb-2 font-semibold text-gray-700">{label}</label>
            <div ref={editorRef} className="border rounded-md h-50 text-sm" />
        </div>
    )
}
