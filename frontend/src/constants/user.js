export const userExample = {
  id: 1,
  firstName: "Izzy",
  lastName: "Vickers",
  email: "izzy@gmail.com",
  username: "izzyvickers",
  bio: "I am a software engineer turned musician",
  isVerified: true,
  avatar:
    "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611704.jpg?w=740&t=st=1727365641~exp=1727366241~hmac=9e4ba6e22ae261c2d643eb541ecd70240381ffe90ed5e0a529e008cef6e997c4",

  projects: [
    {
      id: 1,
      userId: 1,
      title: "Project 1",
      description: "This is project 1",
      status: "active",
      projectAmount: 100,
      paymentStatus: "unpaid",
      clients: [
        {
          name: "The best client",
          email: "client@gmail.com",
          isVerified: true
        }
      ],
      comments: [
        {
          text: "This hasn't been started yet",
          clientId: [
            {
              name: "The best client",
              email: "client@gmail.com",
              isVerified: true
            }
          ],
          projectId: 1,
          timestamp: "01:34",
          isCompleted: false,
          type: "revision"
        },
        {
          text: "This is just a comment about the song",
          clientId: [
            {
              name: "The best client",
              email: "client@gmail.com",
              isVerified: true
            }
          ],
          projectId: 1,
          timestamp: null,
          isCompleted: true,
          type: "general feedback"
        }
      ]
    }
  ],

  clients: [
    {
      name: "The best client",
      email: "client@gmail.com",
      isVerified: true
    }
  ]
};
