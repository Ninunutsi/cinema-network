interface OrderContact {
  fullName: string;
  email: string;
  mobileNumber: string;
}

interface OrderTicket {
  id: number;
  seatCode: string;
  ticketType: {
    slug: string;
    name: string;
  };
  price: number;
}

export interface TicketOrder {
  id: number;
  reference: string;
  status: string;
  totalPrice: number;
  paidAt: string;
  refundedAt: string | null;
  isUpcoming: boolean;
  isRefundable: boolean;
  cardLastFour: string;
  contact: OrderContact;
  session: {
    id: number;
    startsAt: string;
    date: string;
    time: string;
    timeBand: string;
    price: number;
    seatsLeft: number;
    isSoldOut: boolean;
    hall: {
      id: number;
      name: string;
    };
    venue: {
      id: number;
      slug: string;
      name: string;
      city: string;
      formats: {
        id: number;
        slug: string;
        name: string;
        priceUplift: number;
      }[];
    };
    format: {
      id: number;
      slug: string;
      name: string;
      priceUplift: number;
    };
    language: {
      id: number;
      slug: string;
      name: string;
      code: string;
    };
    movie: {
      id: number;
      slug: string;
      title: string;
      kind: string;
      runtimeMinutes: number;
      posterUrl: string;
      backdropUrl: string;
      releaseDate: string;
      isComingSoon: boolean;
      isFeatured: boolean;
      fromPrice: number;
      ageRating: {
        code: string;
        minAge: number;
        description: string;
      };
      genres: {
        id: number;
        slug: string;
        name: string;
      }[];
      formats: {
        id: number;
        slug: string;
        name: string;
        priceUplift: number;
      }[];
    };
  };
  tickets: OrderTicket[];
}

export type TicketsFilter = "upcoming" | "past";
