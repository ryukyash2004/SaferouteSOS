"use client";

import type { EmergencyContact } from '@/lib/types';

const CONTACTS_STORAGE_KEY = 'saferouteSOS_emergencyContacts';

export const getContacts = (): EmergencyContact[] => {
  if (typeof window === 'undefined') return [];
  const storedContacts = localStorage.getItem(CONTACTS_STORAGE_KEY);
  return storedContacts ? JSON.parse(storedContacts) : [];
};

export const saveContacts = (contacts: EmergencyContact[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
};

export const addContact = (contact: Omit<EmergencyContact, 'id'>): EmergencyContact => {
  const contacts = getContacts();
  const newContact: EmergencyContact = { ...contact, id: Date.now().toString() };
  const updatedContacts = [...contacts, newContact];
  saveContacts(updatedContacts);
  return newContact;
};

export const updateContact = (updatedContact: EmergencyContact): void => {
  const contacts = getContacts();
  const updatedContacts = contacts.map(c => c.id === updatedContact.id ? updatedContact : c);
  saveContacts(updatedContacts);
};

export const deleteContact = (contactId: string): void => {
  const contacts = getContacts();
  const updatedContacts = contacts.filter(c => c.id !== contactId);
  saveContacts(updatedContacts);
};
