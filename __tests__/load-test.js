import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 1000 }
  ],
};

export default function() {
  const randomProductId = (Math.random() * (1000011 - 1) + 1).toFixed(0);
  let res = http.get(`http://localhost:3000/reviews/${randomProductId}`);
  check(res, {
    'status was 200': (r) => r.status == 200,
    'transaction time OK': (r) => r.timings.duration < 2000,
  });
}