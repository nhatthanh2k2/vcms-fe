import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css' // Import CSS cho Leaflet
import 'leaflet-routing-machine' // Import thư viện chỉ đường
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const centerIcon = L.icon({
    iconUrl: '/images/center-location.png',
    iconSize: [40, 40], // Kích thước icon hiển thị trên bản đồ
    iconAnchor: [20, 40], // Điểm neo để đảm bảo icon đúng vị trí
    popupAnchor: [0, -40], // Vị trí popup
})

const userIcon = L.icon({
    iconUrl: '/images/user-location.png',
    iconSize: [40, 40], // Kích thước icon hiển thị trên bản đồ
    iconAnchor: [20, 40], // Điểm neo để đảm bảo icon đúng vị trí
    popupAnchor: [0, -40], // Vị trí popup
})

export const DirectionsMap = () => {
    const mapRef = useRef(null)
    const userMarkerRef = useRef(null) // Lưu marker của người dùng
    const routingControlRef = useRef(null) // Lưu control đường đi

    useEffect(() => {
        // Tạo bản đồ Leaflet
        mapRef.current = L.map('map', {
            center: [10.016027, 105.764018], // Tọa độ trung tâm
            zoom: 15,
        })

        // Thêm lớp bản đồ từ OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mapRef.current)

        // Thêm marker cho trung tâm tiêm chủng
        const centerMarker = L.marker([10.016027, 105.764018], { icon: centerIcon }).addTo(
            mapRef.current
        )
        centerMarker.bindPopup('Trung tâm tiêm chủng').openPopup()

        // Thêm nút tìm đường
        const findPathBtn = L.control({ position: 'topleft' })
        findPathBtn.onAdd = function () {
            const div = L.DomUtil.create('div', 'findpath')
            div.innerHTML = '<button id="find-path">Find Path</button>'
            return div
        }
        findPathBtn.addTo(mapRef.current)

        // Thêm nút dừng tìm đường
        const stopPathBtn = L.control({ position: 'topleft' })
        stopPathBtn.onAdd = function () {
            const div = L.DomUtil.create('div', 'stoppath')
            div.innerHTML =
                '<button id="stop-finding" style="display: none;">Stop Finding Path</button>'
            return div
        }
        stopPathBtn.addTo(mapRef.current)

        // Xử lý sự kiện khi nhấn nút tìm đường
        const handleFindPath = () => {
            // Lấy vị trí người dùng
            navigator.geolocation.getCurrentPosition((position) => {
                const userLatLng = L.latLng(position.coords.latitude, position.coords.longitude)

                // Hiển thị marker của người dùng
                if (userMarkerRef.current) {
                    mapRef.current.removeLayer(userMarkerRef.current) // Xóa marker cũ nếu có
                }
                userMarkerRef.current = L.marker(userLatLng, { icon: userIcon })
                    .addTo(mapRef.current)
                    .bindPopup('Vị trí của bạn')
                    .openPopup()

                const centerLatLng = L.latLng(10.015992, 105.764056) // Tọa độ trung tâm

                // Tạo đường chỉ dẫn
                routingControlRef.current = L.Routing.control({
                    waypoints: [userLatLng, centerLatLng],
                    routeWhileDragging: false,
                }).addTo(mapRef.current)

                // Ẩn nút tìm đường và hiển thị nút dừng
                document.getElementById('find-path').style.display = 'none'
                document.getElementById('stop-finding').style.display = 'block'
            })
        }

        // Xử lý sự kiện khi nhấn nút dừng tìm đường
        const handleStopFinding = () => {
            if (routingControlRef.current) {
                mapRef.current.removeControl(routingControlRef.current) // Dừng chỉ đường
                routingControlRef.current = null // Đặt lại control
            }
            document.getElementById('stop-finding').style.display = 'none' // Ẩn nút dừng
            document.getElementById('find-path').style.display = 'block' // Hiện lại nút tìm đường
        }

        // Thêm sự kiện click cho nút tìm đường
        document.getElementById('find-path').onclick = handleFindPath

        // Thêm sự kiện click cho nút dừng tìm đường
        document.getElementById('stop-finding').onclick = handleStopFinding

        return () => {
            mapRef.current.remove() // Dọn dẹp khi component bị unmount
        }
    }, [])

    return (
        <div>
            <div id="map" style={{ height: '500px' }}></div>
        </div>
    )
}
