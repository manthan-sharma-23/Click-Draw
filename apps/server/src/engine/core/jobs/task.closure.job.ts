import cron from 'node-cron';

cron.schedule(' */2 * * * * *', () => {
  console.log('A cron job that runs every 2 seconds');
});
