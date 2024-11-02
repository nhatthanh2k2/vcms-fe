export const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            beginAtZero: true,
            grid: {
                display: true, 
                color: '#e0e0e0', 
            },
            ticks: {
                color: '#333333', 
                font: {
                    size: 12, 
                    weight: 'bold', 
                },
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: true, 
                color: '#e0e0e0', 
            },
            ticks: {
                color: '#333333', 
                font: {
                    size: 12, 
                    weight: 'bold', 
                },
                callback: (value) => `${value} VNĐ`, 
            },
        },
    },
    // plugins: {
    //     legend: {
    //         display: true, // Hiển thị phần chú thích
    //         labels: {
    //             color: '#333333', // Màu chữ trong phần chú thích
    //             font: {
    //                 size: 14, // Kích thước chữ chú thích
    //                 weight: 'bold', // Độ đậm của chữ chú thích
    //             },
    //         },
    //     },
    //     tooltip: {
    //         enabled: true, // Hiển thị thông tin chi tiết khi hover
    //         callbacks: {
    //             label: (context) => `${context.raw.toLocaleString()} VNĐ`, // Định dạng hiển thị thông tin tooltip
    //         },
    //     },
    // },
    // layout: {
    //     padding: 10, // Khoảng cách padding bên trong biểu đồ
    // },
}

export const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: { beginAtZero: true },
    },
}
