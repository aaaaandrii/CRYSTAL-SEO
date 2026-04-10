import { FAQItem } from '@/types';

export const faqItems: FAQItem[] = [
  {
    question: 'How does this 5D optical storage work?',
    answer:
      "The storage medium works by using an extremely fast and precise femtosecond laser to create tiny pits within the fused silica glass containing self-assembled nanostructures (nanogratings). The nanogratings, with features as small as 20 nm, are the smallest embedded structures ever produced by light. They change how light travels through them much in the same way that polarized sunglasses do, allowing scientists to read information about each depending on how the light is transformed. The changes to the light convey five 'dimensions' of information (thus the name), based on each nanostructure's orientation, the strength of the light that it refracts, and its location in space on the x, y, and z axes.",
    category: 'technology',
  },
  {
    question: 'How do nanogratings work?',
    answer:
      'The nanograting produces birefringence in glass, which is characterized by two parameters: slow axis orientation (4th dimension, coinciding also with the orientation of nanograting), and strength of retardance (5th dimension coinciding also with the size of nanograting). During recording the slow axis orientation and strength of retardance are controlled respectively by the polarization and intensity of light. If you add the two optical dimensions to three spatial co-ordinates the result is "5D data storage".',
    category: 'technology',
  },
  {
    question: 'How does this compare to conventional optical storage media?',
    answer:
      'By comparison, CDs only have two "dimensions" of information — reflecting or not reflecting laser light to convey the 1s and 0s of binary data in a single layer of plastic. In DVDs, the data is stored by burning tiny pits on multiple layers on the plastic disc, which means you are using three spatial dimensions to store information. With our technology, we exploit two additional, optical dimensions with fused silica glass.',
    category: 'technology',
  },
  {
    question: 'How is it different from storing information on hard drives?',
    answer:
      'Semiconductor data storage such as flash drives and solid-state drives provide a lifespan around ten years. For magnetization-based memory, such as HDD, needs to transfer data every couple of years in order to prevent data loss, while the data stored in conventional optical discs such as CD, DVD, HD DVD and Blu-ray only last tens of years. Other devices such as holographic memory can only reach the lifetime of a few decades.',
    category: 'storage',
  },
  {
    question: 'Why do we need this type of storage?',
    answer:
      'Despite all technological progress it is still difficult to securely store large amounts of information over even relatively short timescales of 100 years. Our 5D data storage technology eliminates this problem by storing high capacity digital information that could survive the human race.',
    category: 'storage',
  },
  {
    question: 'How big is the 5D disc itself?',
    answer:
      'The technology exploits high purity glass substrates, which can reach various sizes up several meters. We are currently using 25 mm diameter discs, which are easy to handle and investigate. However, in future as we move towards commercialization, we might look into standard sizes of optical discs i.e. 12 cm diameter, which should ultimately fit about 360 TB.',
    category: 'technology',
  },
  {
    question: 'How much can each disc store?',
    answer:
      'The current achievable density is several TB per disc (CD size of 12 cm, 1.2 mm thickness), which is of the same order as magnetic disk data storage. In a couple of years, we hope to achieve about 20 TB per disc. We estimate the ultimate capacity of 360 TB per disc using this technology.',
    category: 'storage',
  },
  {
    question: 'How robust is it?',
    answer:
      'The 5D storage has extremely high data stability because the information is recorded in structural modifications within fused quartz glass, one of the most chemically and thermally durable materials on Earth. The discs can withstand fire and temperatures of up to 1000°C. The glass can withstand direct impact of up to ½ ton.',
    category: 'storage',
  },
  {
    question: 'How long will the data last?',
    answer:
      'The decay time of nanogratings is about 10²⁰ years at room temperature, indicating unprecedented stability. Even at elevated temperatures of 190°C the extrapolated decay time is comparable with the age of the Universe — 13.8 billion years.',
    category: 'storage',
  },
  {
    question: 'How would instructions for accessing the information be communicated to whoever discovers these devices in the future?',
    answer:
      'The technology of 5D writing allows high-resolution drawings and graphics to be printed in the same disc at the data. Visual instructions for reading the disc can be imprinted, and holograms can be recorded using the same technology in the disc.',
    category: 'technology',
  },
];
