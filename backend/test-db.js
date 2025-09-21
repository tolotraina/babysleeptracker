const mysql = require('mysql2/promise');
require('dotenv').config();

async function testConnection() {
  console.log('🧪 Testing MySQL database connection...\n');

  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'baby_sleep_tracker',
    waitForConnections: true,
    connectionLimit: 10,
  };

  try {
    // Test basic connection
    console.log('1. Testing basic connection...');
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
    });
    
    console.log('✅ Connected to MySQL server successfully!');
    
    // Check if database exists
    console.log('\n2. Checking if database exists...');
    const [databases] = await connection.execute(
      `SHOW DATABASES LIKE '${config.database}'`
    );
    
    if (databases.length > 0) {
      console.log(`✅ Database '${config.database}' exists!`);
    } else {
      console.log(`❌ Database '${config.database}' does not exist.`);
      console.log('💡 Run: CREATE DATABASE baby_sleep_tracker;');
    }
    
    // Test database connection
    console.log('\n3. Testing database connection...');
    const dbConnection = await mysql.createConnection(config);
    console.log('✅ Database connection successful!');
    
    // Check if table exists
    console.log('\n4. Checking if table exists...');
    const [tables] = await dbConnection.execute(
      `SHOW TABLES LIKE 'sleep_entries'`
    );
    
    if (tables.length > 0) {
      console.log('✅ Table sleep_entries exists!');
    } else {
      console.log('❌ Table sleep_entries does not exist.');
      console.log('💡 Run the SQL schema creation script.');
    }
    
    // Close connections
    await connection.end();
    await dbConnection.end();
    
    console.log('\n🎉 All tests passed! Database is ready.');
    
  } catch (error) {
    console.error('\n❌ Connection failed:');
    console.error('Error:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.log('- Check if MySQL server is running');
    console.log('- Verify DB_HOST, DB_USER, DB_PASSWORD in .env');
    console.log('- Check if database exists');
    process.exit(1);
  }
}

testConnection();