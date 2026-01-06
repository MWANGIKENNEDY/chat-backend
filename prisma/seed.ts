import 'dotenv/config';
import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// Validate DATABASE_URL is defined
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});
const prisma = new PrismaClient({ adapter });

const users = [
  { name: 'Alice Johnson' },
  { name: 'Bob Smith' },
  { name: 'Charlie Brown' },
  { name: 'Diana Prince' },
  { name: 'Edward Norton' },
  { name: 'Fiona Green' },
  { name: 'George Wilson' },
  { name: 'Hannah Davis' },
  { name: 'Ian Mitchell' },
  { name: 'Julia Roberts' }
];

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing users (optional)
  await prisma.user.deleteMany();
  console.log('🗑️  Cleared existing users');

  // Create users
  for (const userData of users) {
    const user = await prisma.user.create({
      data: userData
    });
    console.log(`✅ Created user: ${user.name} (ID: ${user.id})`);
  }

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });