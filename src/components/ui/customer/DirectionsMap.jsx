import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

const centerIcon = L.icon({
    iconUrl: '/images/center-location.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
})

const userIcon = L.icon({
    iconUrl: '/images/user-location.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
})

export const DirectionsMap = () => {
    const mapRef = useRef(null)
    const userMarkerRef = useRef(null)
    const routingControlRef = useRef(null)

    useEffect(() => {
        mapRef.current = L.map('map', {
            center: [10.016027, 105.764018],
            zoom: 15,
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mapRef.current)

        const centerMarker = L.marker([10.016027, 105.764018], { icon: centerIcon }).addTo(
            mapRef.current
        )
        centerMarker.bindPopup('Trung tâm tiêm chủng').openPopup()

        const findPathBtn = L.control({ position: 'topleft' })
        findPathBtn.onAdd = function () {
            const div = L.DomUtil.create('div', 'findpath')
            div.innerHTML = '<button id="find-path">Chỉ đường</button>'
            return div
        }
        findPathBtn.addTo(mapRef.current)

        const stopPathBtn = L.control({ position: 'topleft' })
        stopPathBtn.onAdd = function () {
            const div = L.DomUtil.create('div', 'stoppath')
            div.innerHTML =
                '<button id="stop-finding" style="display: none;">Ngừng chỉ đường</button>'
            return div
        }
        stopPathBtn.addTo(mapRef.current)

        const handleFindPath = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLatLng = L.latLng(position.coords.latitude, position.coords.longitude)

                if (userMarkerRef.current) {
                    mapRef.current.removeLayer(userMarkerRef.current)
                }
                userMarkerRef.current = L.marker(userLatLng, { icon: userIcon })
                    .addTo(mapRef.current)
                    .bindPopup('Vị trí của bạn')
                    .openPopup()

                const centerLatLng = L.latLng(10.015992, 105.764056)

                routingControlRef.current = L.Routing.control({
                    waypoints: [userLatLng, centerLatLng],
                    routeWhileDragging: false,
                }).addTo(mapRef.current)

                document.getElementById('find-path').style.display = 'none'
                document.getElementById('stop-finding').style.display = 'block'
            })
        }

        const handleStopFinding = () => {
            if (routingControlRef.current) {
                mapRef.current.removeControl(routingControlRef.current)
                routingControlRef.current = null
            }
            document.getElementById('stop-finding').style.display = 'none'
            document.getElementById('find-path').style.display = 'block'
        }

        document.getElementById('find-path').onclick = handleFindPath

        document.getElementById('stop-finding').onclick = handleStopFinding

        return () => {
            mapRef.current.remove()
        }
    }, [])

    return (
        <div>
            <div id="map" style={{ height: '500px' }}></div>
        </div>
    )
}
