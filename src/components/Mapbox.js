import React, { Component } from "react";
import mapboxgl from "mapbox-gl";
import "./map.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default class Mapbox extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     lng: 5,
        //     lat: 34,
        //     zoom: 2,
        // };
    }

    componentDidMount() {
        // console.log(this.mapContainer);
        const map = new mapboxgl.Map({
            container: this.mapContainer,
            // container: "map",
            style: "mapbox://styles/tousif101/ck7xbws0z19701iltec3ijruk",
            scrollZoom: false,
        });
        // Add navigation control (the +/- zoom buttons)
        // map.addControl(new mapboxgl.NavigationControl(), "top-right");
        // area that will be displayed on the map
        const bounds = new mapboxgl.LngLatBounds();

        this.props.locations.forEach((loc) => {
            // create marker
            const element = document.createElement("div");
            element.className = "marker";
            // add marker
            new mapboxgl.Marker({
                element: element,
                anchor: "bottom",
            })
                .setLngLat(loc.coordinates)
                .addTo(map);

            // add popup
            new mapboxgl.Popup({ offset: 30 })
                .setLngLat(loc.coordinates)
                .setHTML(`<p> Day ${loc.day}: ${loc.description}</p>`)
                .addTo(map);
            // extend map bounds to include current locations
            bounds.extend(loc.coordinates);
        });

        map.fitBounds(bounds, {
            padding: {
                top: 200,
                bottom: 150,
                left: 100,
                right: 100,
            },
        });
    }

    render() {
        return (
            <div
                style={{
                    position: "relative",
                    height: "35rem",
                    // marginTop: "calc(0px - var(--section-rotate))",
                }}
            >
                <div id="map" ref={(el) => (this.mapContainer = el)} />
            </div>
        );
    }
}
