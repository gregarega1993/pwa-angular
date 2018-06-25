import { Injectable } from '@angular/core';
import { SwUpdate, SwPush } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class NotificationsService {
  constructor(
    private update: SwUpdate,
    private push: SwPush,
    private snackbar: MatSnackBar
  ) {
    //checks for updates in the service worker
    update.available.subscribe(update => {
      const snack = snackbar.open("Update Available", "Reload");
      snack.onAction().subscribe(() => {
        window.location.reload();
      })
    });

    //listens for incoming messages
    push.messages.subscribe(msg => {
      snackbar.open(JSON.parse(JSON.stringify(msg)).message);
    })

    //public vapid key generated in the server using web-push library
    push.requestSubscription({
      serverPublicKey: "BKuQ7vBGclIkE5WbnHKYXPy0d3NImSBm2HIsBrB6q-AIvTwn0J1Nh7NHeEMMZYaiQlHbnVSNHTYR5oNfChPNMpo"
    })
    .then(pushSubscription => {
      var response = pushSubscription.toJSON();
      console.log(response);

      const endpoint = response.endpoint;
      const authKey = response.keys.auth;
      const key = response.keys.p256dh;

      console.log("Standard PUSH notification");
      console.log("web-push send-notification --endpoint=\"" + endpoint + "\" --key=\"" + key + "\" --auth=\"" + authKey + "\" --payload=\'{\"message\": \"Hello World this is a notification\" }\'" + " --vapid-subject=\"https://umwerk-node-server-ga6067.c9users.io/\" --vapid-pubkey=BKuQ7vBGclIkE5WbnHKYXPy0d3NImSBm2HIsBrB6q-AIvTwn0J1Nh7NHeEMMZYaiQlHbnVSNHTYR5oNfChPNMpo --vapid-pvtkey=pZ7Xp9jp2N11D-Uss0ovBzYiZ-3pkCSfL4wRonaPo4s");
      console.log("Browser Notification API");
      console.log("web-push send-notification --endpoint=\"" + endpoint + "\" --key=\"" + key + "\" --auth=\"" + authKey + "\" --payload=\'{\"message\": \"Hello World this is a notification\", \"notification\": { \"title\": \"This is a notification title\", \"body\": \"This is a notification description\" } }\'" + " --vapid-subject=\"https://umwerk-node-server-ga6067.c9users.io/\" --vapid-pubkey=BKuQ7vBGclIkE5WbnHKYXPy0d3NImSBm2HIsBrB6q-AIvTwn0J1Nh7NHeEMMZYaiQlHbnVSNHTYR5oNfChPNMpo --vapid-pvtkey=pZ7Xp9jp2N11D-Uss0ovBzYiZ-3pkCSfL4wRonaPo4s");
    })
  }
}
