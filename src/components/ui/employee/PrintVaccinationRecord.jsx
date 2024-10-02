import React, { useState } from 'react'

export const PrintVaccinationRecord = () => {
    const [invoices, setInvoices] = useState([
        { id: 1, customerName: 'Alice Johnson', amount: 150, date: '2023-06-15' },
        { id: 2, customerName: 'Bob Williams', amount: 200, date: '2023-06-16' },
        { id: 3, customerName: 'Charlie Brown', amount: 100, date: '2023-06-17' },
    ])

    const handlePrint = (id) => {
        console.log(`Printing invoice for ID: ${id}`)
    }

    return (
        <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Print Invoices</h2>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 text-left">Customer Name</th>
                        <th className="p-2 text-left">Amount</th>
                        <th className="p-2 text-left">Date</th>
                        <th className="p-2 text-left">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b">
                            <td className="p-2">{invoice.customerName}</td>
                            <td className="p-2">${invoice.amount}</td>
                            <td className="p-2">{invoice.date}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => handlePrint(invoice.id)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Print
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}
