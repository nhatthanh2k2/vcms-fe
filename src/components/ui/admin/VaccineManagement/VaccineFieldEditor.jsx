import { Tooltip } from 'antd'
import React from 'react'

export const VaccineFieldEditor = ({ label, items, setItems }) => {
    const handleAddItem = () => {
        setItems([...items, ''])
    }

    const handleRemoveItem = (index) => {
        const newItems = items.filter((_, idx) => idx !== index)
        setItems(newItems)
    }

    const handleItemChange = (index, value) => {
        const newItems = [...items]
        newItems[index] = value
        setItems(newItems)
    }

    return (
        <div className="flex flex-col space-y-2">
            <label className="font-semibold">{label}:</label>
            {items.map((item, index) => (
                <div key={index} className="flex space-x-2">
                    {/* <input
                        type="text"
                        className="input input-bordered input-success w-full input-sm text-wrap"
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                    /> */}
                    <div
                        contentEditable
                        suppressContentEditableWarning={true} // Để tránh cảnh báo của React
                        onInput={(e) => handleItemChange(index, e.target.value)}
                        style={{
                            whiteSpace: 'pre-wrap',
                            marginTop: '10px',
                            padding: '4px 8px',
                            border: '1px solid #34D399',
                            borderRadius: '8px',
                            minHeight: '32px',
                            color: '#000',
                            fontSize: '14px',
                            width: '100%',
                            boxSizing: 'border-box',
                        }}
                    >
                        {item}
                    </div>
                    <div
                        onClick={() => handleRemoveItem(index)}
                        className="flex items-center cursor-pointer"
                    >
                        <Tooltip placement="top" title={'Xóa'}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="red"
                                stroke="red"
                                viewBox="0 -5 32 32"
                            >
                                <path
                                    fill="red"
                                    fillRule="evenodd"
                                    strokeWidth={0.64}
                                    d="M22.708 7.28a1.016 1.016 0 0 0-1.427 0l-2.3 2.3-2.239-2.24a1.002 1.002 0 1 0-1.415 1.42l2.239 2.23-2.268 2.27a1.013 1.013 0 0 0 0 1.43c.394.39 1.033.39 1.427 0l2.268-2.27 2.239 2.24a1.002 1.002 0 1 0 1.415-1.42l-2.239-2.23 2.3-2.3c.395-.4.395-1.03 0-1.43ZM29.998 18c0 1.1-.896 2-2.002 2H10.467l-8.151-9.02L10.438 2h17.558c1.106 0 2.002.9 2.002 2v14ZM27.996 0H10.051c-.28-.02-.566.07-.78.28L.285 10.22a.989.989 0 0 0-.287.76c-.015.28.076.56.287.77l8.986 9.94c.196.19.452.29.708.29V22h18.017A4.002 4.002 0 0 0 32 18V4c0-2.21-1.793-4-4.004-4Z"
                                />
                            </svg>
                        </Tooltip>
                    </div>
                </div>
            ))}

            <button className="btn">
                Thêm {label.toLowerCase()}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <g stroke="#1C274C" strokeLinecap="round" strokeWidth={1.5}>
                        <path d="M15 12h-3m0 0H9m3 0V9m0 3v3M7 3.338A9.954 9.954 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
                    </g>
                </svg>
            </button>
        </div>
    )
}
