import maplibregl from 'maplibre-gl'

import 'maplibre-gl/dist/maplibre-gl.css'

const map = new maplibregl.Map({
  container: 'map',
  style: 'https://demotiles.maplibre.org/style.json',
  center: [-118.805, 34.027],
  zoom: 12
})

map.once('load', () => {
  map.addSource(
    'trailheads', {
      type: 'geojson',
      data: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0/query?f=pgeojson&where=1=1',
      cluster: true,
      clusterRadius: 20,
      clusterMaxZoom: 14
    }
  )

  map.addLayer({
    id: 'trailheads-circle',
    type: 'circle',
    source: 'trailheads',
    paint: {
      "circle-color": 'hsla(0,0%,0%,0.75)',
      'circle-stroke-width': 1.5,
      'circle-stroke-color': 'white',
      'circle-radius': ['case', ['get', 'cluster'], 10, 5]
    }
  })

  map.addLayer({
    id: 'trailheads-cluster-count',
    type: 'symbol',
    source: 'trailheads',
    layout: {
      'text-field': ['get', 'point_count'],
      'text-offset': [0, 0.1]
    },
    paint: {
      'text-color': 'white'
    }
  })
})
