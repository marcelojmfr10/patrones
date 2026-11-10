/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";

// 1. Interfaz NotificationChannel
// Define el método `send`, que cada canal de comunicación implementará.
interface NotificationChannel {
  send(message: string): void;
}

// 2. Implementaciones de Canales de Comunicación

class EmailChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando correo electrónico: ${message}`);
  }
}

class SMSChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class PushNotificationChannel implements NotificationChannel {
  send(message: string): void {
    console.log(`Enviando Push: ${message}`);
  }
}

// 3. Clase Abstracta Notification
// Define la propiedad `channel` y el método `notify`

abstract class Notification {
  protected channels: NotificationChannel[];

  constructor(channels: NotificationChannel[]) {
    this.channels = channels;
  }

  abstract addChannel(channel: NotificationChannel): void;
  abstract notify(message: string): void;
}

class AlertNotification extends Notification {
  override addChannel(channel: NotificationChannel): void {
    this.channels.push(channel);
  }

  override notify(message: string): void {
    console.log("\n%cNotificación de alerta", COLORS.red);
    this.channels.forEach((channel) => channel.send(message));
  }
}

function main() {
  const channels = [
    new EmailChannel(),
    new SMSChannel(),
    new PushNotificationChannel(),
    new PushNotificationChannel(),
    new PushNotificationChannel(),
    new SMSChannel(),
    new EmailChannel(),
  ];

  const alert = new AlertNotification(channels);
  alert.notify(` Alguien enfrente de la casa`);
  console.log(`\n`);
}

main();
