import { COLORS } from "./../helpers/colors.ts";
/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

interface Location {
  display(coordinates: { x: number; y: number }): void;
}

class LocationIcon implements Location {
  private type: string;
  private iconImage: string;

  constructor(type: string, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coordinates: { x: number; y: number }): void {
    console.log(
      `Coords: ${this.type} en ${coordinates.x}, ${coordinates.y} con ícono %c[${this.iconImage}]`,
      COLORS.green,
    );
  }
}

// fábrica de flyweights
class LocationFactory {
  private icons: Record<string, LocationIcon> = {};

  // type: por ejemplo escuela, hospital, parque
  getLocationIcon(type: string): LocationIcon {
    if (!this.icons[type]) {
      console.log(`%cCreando una instancia del ícono de ${type}`, COLORS.red);
      const iconImage = `imagen_de_${type.toLowerCase()}.png`;
      this.icons[type] = new LocationIcon(type, iconImage);
    }

    return this.icons[type];
  }
}

class MapLocation {
  private coordinates: { x: number; y: number };
  private icon: LocationIcon;

  constructor(x: number, y: number, icon: LocationIcon) {
    this.coordinates = { x, y };
    this.icon = icon;
  }

  display() {
    this.icon.display(this.coordinates);
  }
}

function main() {
  const factory = new LocationFactory();
  const locations = [
    new MapLocation(10, 20, factory.getLocationIcon("hospital")),
    new MapLocation(30, 50, factory.getLocationIcon("hospital")),
    new MapLocation(60, 50, factory.getLocationIcon("hospital")),
    new MapLocation(600, 150, factory.getLocationIcon("escuela")),
    new MapLocation(600, 151, factory.getLocationIcon("escuela")),
    new MapLocation(600, 152, factory.getLocationIcon("escuela")),
    new MapLocation(600, 153, factory.getLocationIcon("escuela")),
    new MapLocation(600, 154, factory.getLocationIcon("escuela")),
    new MapLocation(600, 155, factory.getLocationIcon("escuela")),
    new MapLocation(600, 155, factory.getLocationIcon("hospital")),
    new MapLocation(200, 155, factory.getLocationIcon("parque")),
    new MapLocation(200, 206, factory.getLocationIcon("parque")),
    new MapLocation(200, 305, factory.getLocationIcon("parque")),
  ];

  locations.forEach((location) => location.display());
}

main();
