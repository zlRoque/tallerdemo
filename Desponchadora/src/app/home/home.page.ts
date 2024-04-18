import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';

declare var google;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  map = null;
  addingMarker = false;
  newMarker: Marker = null;
  markers: Marker[] = [
    {
      position: {
        lat: 31.676489171048345,
        lng: -106.43794268857972,
      },
      title: 'Desponchadora 24 Horas la cuesta'
    },
    {
      position: {
        lat: 31.69000184503477,
        lng: -106.3912258341967
      },
      title: 'Desponchadora el guero'
    },
    {
      position: {
        lat: 31.664290467961965,
        lng: -106.38573267034735
      },
      title: 'Desponchadora y Venta de Calanche'
    },
    {
      position: {
        lat: 31.671669830437455,
        lng: -106.4357359035754
      },
      title: 'Desponchadora el gordito'
    },
  ];


  constructor( private LocalStorageService: LocalStorageService) { }

  ngOnInit() {
    this.loadMap();
    this.requestLocationPermission(),
    this.LocalStorageService.hasItem() 
   ;
  }
 

  requestLocationPermission() {
    // Aquí puedes implementar la lógica para solicitar permiso de ubicación al usuario
    // Por ejemplo, puedes usar el servicio Geolocation de Capacitor para solicitar permiso
    // y luego centrar el mapa en la ubicación del usuario
    navigator.geolocation.getCurrentPosition((position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.map.setCenter(location);
    });
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = { lat: 31.687876437071733, lng: -106.42212404533151 };

    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
      this.renderMarkers();
    });

    google.maps.event.addListener(this.map, 'click', (event) => {
      if (this.addingMarker) {
        const clickedLocation = event.latLng.toJSON();
        this.newMarker = {
          position: {
            lat: clickedLocation.lat,
            lng: clickedLocation.lng
          },
          title: 'Nuevo marcador'
        };
        this.addMarker(this.newMarker);
      }
    });
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

  enableAddingMarker() {
    this.addingMarker = true;
  }

  saveMarker() {
    if (this.newMarker) {
      // Aquí puedes implementar la lógica para guardar el nuevo marcador
      alert('Marcador guardado enn ' + this.newMarker.position.lat + ', ' + this.newMarker.position.lng);
      this.newMarker = null;
      this.addingMarker = false;
    }
  }
}
