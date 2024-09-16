const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Environment" },
        { name: "Education" },
        { name: "Humanitarian" }

      ],
    });
    console.log("Success");
  } catch (error) {
    console.log("Error seeding the database categoties", error);
  } finally {
    await database.$disconnect();
  }
}

main();