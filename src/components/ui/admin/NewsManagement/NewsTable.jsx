import { newsService } from '@/services'
import { Table } from 'antd'
import React, { useEffect, useState } from 'react'

export const NewsTable = () => {
    const [newsList, setNewsList] = useState([])

    // useEffect(() => {
    //     newsService.getAllNews()
    //     .then((response) => setNewsList(response.data.result))
    //     .catch(())
    // }, [])
    return <Table></Table>
}
