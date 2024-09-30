const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  const josephine = await prisma.user.upsert({
    where: { email: "Josephine@prisma.io" },
    update: {},
    create: {
      id: "6b16b835-9ad6-4b4a-830a-6bb4de5dd329",
      email: "Josephine@prisma.io",
      name: "Josephine",
      role: "Admin",
    },
    articles: {
      create: [
        {
          title:
            "The Secret Life of Ocean Giants: How Whales Shape Marine Ecosystems",
          content:
            "Whales, the gentle giants of the sea, do far more than grace the ocean with their majestic presence. These colossal creatures play a vital role in maintaining the health of marine ecosystems. From their nutrient-rich waste that fertilizes phytoplankton to their role in carbon sequestration, whales contribute to the ocean's delicate balance.",
          isPublished: true,
          userId: "6b16b835-9ad6-4b4a-830a-6bb4de5dd329",
        },
      ],
    },
  });
  const michael = await prisma.user.upsert({
    where: { email: "Michael@prisma.io" },
    update: {},
    create: {
      id: "d934cb1e-1527-4dbd-bf57-50d45f29349",
      email: "Michael@prisma.io",
      name: "Michael",
      role: "User",
    },
  });
  const 
  console.log({ michael, josephine });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
