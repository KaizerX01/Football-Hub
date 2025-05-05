// seed-teams.ts
import 'dotenv/config'; // Load environment variables
import { seedTeams } from './lib/seedTeams';

// Execute the seed function
seedTeams()
  .then(() => {
    console.log('Seeding completed successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Failed to seed database:', err);
    process.exit(1);
  });
