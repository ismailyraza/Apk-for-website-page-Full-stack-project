const backup = require('mongodb-backup');

const backupOptions = {
  uri: 'mongodb://localhost:27017/your-database-name',
  root: __dirname, // Directory where backups will be stored
  callback: (err) => {
    if (err) {
      console.error('Backup failed:', err);
    } else {
      console.log('Backup completed successfully');
    }
  },
};

backup(backupOptions);
const restore = require('mongodb-restore');

const restoreOptions = {
  uri: 'mongodb://localhost:27017/your-database-name',
  root: __dirname, // Directory where backups are stored
  callback: (err) => {
    if (err) {
      console.error('Data recovery failed:', err);
    } else {
      console.log('Data recovery completed successfully');
    }
  },
};

restore(restoreOptions);
