import { COLORS } from "./../helpers/colors.ts";
/**
 * ! Patrón Observer
 * El patrón Observer es un patrón de diseño de comportamiento que establece
 * una relación de uno a muchos entre un objeto, llamado sujeto,
 * y otros objetos, llamados observadores, que son notificados
 * y actualizados automáticamente por el sujeto
 * cuando se producen cambios en su estado.
 *
 * * Es útil cuando necesitamos que varios objetos estén
 * * pendientes de los cambios
 *
 * !No confundirlo con RXJS Observables
 *
 * https://refactoring.guru/es/design-patterns/observer
 */

interface Observer {
  notify(videoTitle: string): void;
}

class YouTubeChannel {
  private subscribers: Observer[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  subscribe(observer: Observer): void {
    this.subscribers.push(observer);
    console.log(`Nuevo suscriptor al canal %c${this.name}`, COLORS.green);
  }

  unsubscribe(observer: Observer): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== observer);
    console.log(`Un suscriptor se ha dado de baja ${this.name}`);
  }

  uploadVideo(videoTitle: string): void {
    console.log(
      `Canal ${this.name} ha subido un nuevo vídeo %c${videoTitle}`,
      COLORS.orange,
    );

    for (const subscriber of this.subscribers) {
      subscriber.notify(videoTitle);
    }
  }
}

class Subscriber implements Observer {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  notify(videoTitle: string): void {
    console.log(
      `%c${this.name} ha sido notificado: Nuevo vídeo %c${videoTitle}`,
      COLORS.orange,
      COLORS.pink,
    );
  }
}

function main() {
  const channel = new YouTubeChannel("Cocinando con Julia");
  const gabriela = new Subscriber("Gabriela");
  const maria = new Subscriber("María");
  const oscar = new Subscriber("Óscar");

  channel.subscribe(gabriela);
  channel.subscribe(oscar);

  channel.uploadVideo("Receta de ceviche peruano");
  channel.subscribe(maria);
  channel.uploadVideo("Receta de pizza");

  channel.unsubscribe(maria);
  channel.uploadVideo("Receta de pasta al pomodoro");
  channel.unsubscribe(oscar);
  channel.uploadVideo("Receta de tiramisu");
  channel.unsubscribe(gabriela);
  channel.uploadVideo("Receta de pastel tres leches");

  console.log("\n\n");
}

main();
