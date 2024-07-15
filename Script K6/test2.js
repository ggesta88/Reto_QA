import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

// Defino métrica Trend para registrar los tiempos de espera
let myTrend = new Trend('waiting_time');

export let options = {
    scenarios: {
        default: {
            executor: 'constant-vus',
            vus: 20,
            duration: '10m',
        },
    },
};

export default function () {
    // Visitar la página principal
    let res = http.get('https://petstore.octoperf.com/actions/Catalog.action');
    check(res, { 
        'Estatus de la respuesta': (r) => r.status === 200 
    });

    // Navegar a la sección de FISH
    res = http.get('https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=FISH');
    check(res, {
         'Estatus de la respuesta': (r) => r.status === 200 
        });

    // Seleccionar el producto con ProductID: FI-SW-01
    res = http.get('https://petstore.octoperf.com/actions/Catalog.action?viewProduct=&productId=FI-SW-01');
    check(res, { 
        'Estatus de la respuesta': (r) => r.status === 200
     });

    // Registrar el tiempo de espera en la métrica personalizada
    myTrend.add(res.timings.waiting);

    // Esperar entre cada una de las solicitudes
    sleep(1);
}
