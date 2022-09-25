export interface Conversation {
  id: string;
  unreadCount: number;
  canSendMessages: boolean;
  lastMessages: {
    createdAt: string;
    content: string;
    sentBy: string;
    deliveryStatus: string;
  }[];
  owner: {
    number: string;
  };
  partner: {
    number: string;
  };
  lastMessage: {
    createdAt: string;
    content: string;
    sentBy: string;
    deliveryStatus: string;
  };
}

export interface Message {
  id?: string;
  owner?: string;
  partner?: string;
  content: string;
  createdAt: string;
  sentBy: string;
  deliveryStatus: string;
}

export interface Template {
  id: string;
  name: string;
  createdAt: string;
  iso639LanguageCode: string;
  type: string;
  category: string;
  status: string;
  bodyText: string;
  exampleParameters: string[];
}

export interface CreateNewTemplate {
  name: string;
  iso639LanguageCode: string;
  type: string;
  category: string;
  bodyText: string;
  exampleParameters: string[];
}

export interface CreateNewContact {
  name: string;
  phoneNumber: string;
  tags: string[];
}

export interface Contact {
  createdAt: string;
  id: string;
  name: string;
  phoneNumber: string;
  source: string
  tags: string[];
  whatsappVerified: boolean;
}

export interface Campaign {
  audience: number;
  createdAt: string;
  id: string;
  name: string;
  submitted: number;
  templateId: string;
  templateText: string;
  type: string;
}

export interface User {
  id: string;
  phoneNumber: string;
  username: string;
  whatsappAppSecret: string;
  whatsappBusinessAccountId: string;
  whatsappPermanentToken: string;
  whatsappPhoneNumberId: string;
}
