import cron from 'cron';

const cronTimer = '*/20 * * * *';

const createNewJob = (callback: () => void) => {
  const job = new cron.CronJob(cronTimer, callback);
  job.start();

  console.log('Job started');
  return job;
};

export default createNewJob;
