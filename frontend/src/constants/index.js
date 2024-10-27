export const navLinks = [
  {
    title: "Product",
    route: "#"
  },
  {
    title: "Pricing",
    route: "#"
  },
  {
    title: "Blog",
    route: "#"
  }
];
export const pricingPlans = [
  {
    name: "The SonExperience",
    plans: {
      monthly: {
        planId: 1,
        price: 15,
        extraStoragePrice: 7,
        storage: "256GB",
        features: [
          "Unlimited projects and clients",
          "Unlimited files and uploads",
          "Projects and payments management",
          "Lossless audio streaming",
          "Free service updates and access to email support",
          "Up to 256GB Storage Included"
        ],
        extras: [
          "$7/mo for every additional 256GB of storage added to your monthly plan*",
          "No hidden fees! Upgrade storage as needed while keeping all other services unlimited"
        ],
        link: "#"
      },
      yearly: {
        planId: 2,
        price: 149.4,
        extraStoragePrice: 69.72,
        storage: "256GB",
        features: [
          "Save 17% all around with the yearly plan!",
          "Unlimited projects and clients",
          "Unlimited files and uploads",
          "Projects and payments management",
          "Lossless audio streaming",
          "Free service updates and access to email support",
          "Up to 256GB Storage Included"
        ],
        extras: [
          "$69.72/yr for every additional 256GB of storage added to your monthly plan ($5.81/mo for 12 months)*",
          "No hidden fees! Upgrade storage as needed while keeping all other services unlimited"
        ],
        link: "#"
      }
    }
  },
  {
    name: "The SonExsphere",
    monthly: null,
    yearly: null,
    price: 0,
    storage: null,
    features: [
      "Eliminate monthly billing",
      "Host your own Projects and Clients",
      "Build from our most current source code",
      "Add your own storage and services",
      "Not managed by Sonex"
    ],
    extras: null,
    link: "#"
  }
];

export const features = [
  {
    id: 1,
    title: "All-in-One Platform",
    points: [
      "Store your audio sessions, handle payments, and communicate all in one place",
      "Unlimited Projects, Unlimited Clients—no extra cost."
    ]
  },
  {
    id: 2,
    title: "Seamless Client Collaboration",
    points: [
      "Clients can upload files, request revisions, and pay—without needing to log in",
      "Centralized revisions and payment tracking"
    ]
  },
  {
    id: 3,
    title: "Open-Source Flexibility",
    points: [
      "Access and customize Sonex's code to build features that fit your needs",
      "Built by developers and audio pros, maintained by a passionate community"
    ]
  },
  {
    id: 4,
    title: "No Lost Revisions, No Late Payments",
    points: [
      "Keep client revisions organized in one place",
      "Files are locked behind your custom paywall, released upon final payment"
    ]
  }
];

export const users = [
  {
    id: "engineer",
    tabTitle: "an Audio Engineer",
    header: "Audio Engineers",
    contentTitle: "Manage your clients and sessions",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui at beatae veritatis, dignissimos, rem illum a explicabo excepturi minus provident iusto ipsam omnis, praesentium nostrum.",
    images: ["https://placehold.co/1200x900"]
  },
  {
    id: "producer",
    tabTitle: "a Music Producer",
    header: "Music Producers",
    contentTitle: "Store and Host Your Beats",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui at beatae veritatis, dignissimos, rem illum a explicabo excepturi minus provident iusto ipsam omnis, praesentium nostrum.",
    images: ["https://placehold.co/1200x900"]
  },
  {
    id: "podcast",
    tabTitle: "a Podcast Editor",
    header: "Podcast Editors",
    contentTitle: "Showcase your podcast editing skills",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui at beatae veritatis, dignissimos, rem illum a explicabo excepturi minus provident iusto ipsam omnis, praesentium nostrum.",
    images: ["https://placehold.co/1200x900"]
  },
  {
    id: "songwriter",
    tabTitle: "a Songwriter",
    header: "Songwriters",
    contentTitle: "Write, then sell your references",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui at beatae veritatis, dignissimos, rem illum a explicabo excepturi minus provident iusto ipsam omnis, praesentium nostrum.",
    images: ["https://placehold.co/1200x900"]
  }
];

export const faqs = [
  {
    question: "Why should I use Sonex?",
    answer:
      "Sonex simplifies project management for audio professionals, eliminating the need to juggle multiple services for storage, collaboration, and payments. It’s the all-in-one solution for managing your clients and their projects!"
  },
  {
    question: "How do I collaborate with clients on Sonex?",
    answer:
      "Create a project, add your client(s), and start collaborating. Clients can upload files, request revisions, and pay—all without needing to create an account or log in."
  },
  {
    question: "What can my clients expect?",
    answer:
      "Clients get a straightforward experience: they can upload, review, and download files without losing quality. They’ll never have to log in—just verify via email."
  },
  {
    question: "How does the payment process work?",
    answer:
      "Set your own price for your projects (or don't). Once project is completed, files are locked behind a paywall until the client submits their payment. After successful payment, they’ll get immediate access to download the files. "
  },
  {
    question: "Are there any hidden fees?",
    answer:
      "Nope! We only charge for the storage you use, Stripe's payment processing fee, and our small roughly 1.5% service charge. This means you keep all money you earn for your projects."
  },
  {
    question: "Can I expand my storage?",
    answer:
      "Absolutely! You can add more storage for just $7 per additional 256 GB while keeping all other services unlimited."
  },
  {
    question: "What if I want to host my own version of Sonex?",
    answer:
      "You can host your own version of Sonex for free! Simply access the source code, and manage your hosting, security, and scaling however you like."
  }
];
