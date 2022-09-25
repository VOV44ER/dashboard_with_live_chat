import { GridRowId } from '@mui/x-data-grid';
import axios from './axiosHelper';
import { CreateNewContact, CreateNewTemplate } from '../models/types';

export const chatApi = {
  getConversations() {
    return axios.get('/message/v1/conversations');
  },
  getMessages({ id, page }: { id: string, page: number }) {
    return axios.get(`/message/v1/messages/${id}`, {
      params: {
        page,
        limit: 20,
      },
    });
  },
  sendMessage(body: { to: string, body: string }) {
    return axios.post('/message/v1/messages', body);
  },
  markAsRead(id: string) {
    return axios.post(`/message/v1/conversations/${id}/markAsRead`);
  },
};

export const loginApi = {
  signIn(body: { username: string, password: string }) {
    return axios.post('/account/v1/accounts/login', body);
  },
  getMe() {
    return axios.get('/account/v1/accounts/me');
  },
};

export const templatesApi = {
  getTemplates() {
    return axios.get('/message/v1/message-templates');
  },
  deleteTemplate(id: GridRowId) {
    return axios.delete(`/message/v1/message-templates/${id}`);
  },
  createTemplate(body: CreateNewTemplate) {
    return axios.post('/message/v1/message-templates', body);
  },
};

export const contactsApi = {
  getContacts() {
    return axios.get('/message/v1/contacts');
  },
  deleteContact(id: GridRowId) {
    return axios.delete(`/message/v1/contacts/${id}`);
  },
  createContact(body: CreateNewContact) {
    return axios.post('/message/v1/contacts', body);
  },
};

export const campaignsApi = {
  getCampaigns() {
    return axios.get('/message/v1/campaigns');
  },
  createCampaign(body: { name: string; type: string; templateId: string }) {
    return axios.post('/message/v1/campaigns', body);
  },
};
