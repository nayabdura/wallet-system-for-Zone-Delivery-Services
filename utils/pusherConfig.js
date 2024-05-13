import Pusher from 'pusher-js';

const pusher = new Pusher(process.env.YOUR_PUSHER_KEY, {
  cluster: process.env.YOUR_CLUSTER,
});

export default pusher;