// src/lib/seedTeams.ts
import 'dotenv/config'; // Load environment variables
import { localApiClient } from './LocalApiClient';
import { db } from '../db';
import { teams } from '../db/schema';

export async function seedTeams() {
  try {
    const res = await localApiClient.get(`/teams?limit=2000&offset=0`);
    const rawTeams = res.data?.teams;
    
    if (!Array.isArray(rawTeams)) {
      throw new Error('Invalid teams data');
    }
    
    const formatted = rawTeams.map((team: any) => ({
      id: String(team.id),
      name: team.name,
    }));
    
    // Insert teams using Drizzle
    const insertedTeams = await db.insert(teams).values(formatted).returning();
    
    console.log(`✅ Seeded ${insertedTeams.length} teams into the DB.`);
    return insertedTeams;
  } catch (err) {
    console.error('❌ Failed to seed teams:', err);
    throw err;
  }
}

// Only run if file is executed directly (not imported)
if (require.main === module) {
  seedTeams().catch(console.error);
}