"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users } from 'lucide-react';
import type { EmergencyContact } from '@/lib/types';
import { getContacts, addContact as saveNewContact, updateContact as saveUpdatedContact, deleteContact as removeContact } from '@/lib/services/contact-service';
import ContactList from '@/components/contacts/contact-list';
import ContactFormDialog from '@/components/contacts/contact-form-dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  const refreshContacts = () => {
    setContacts(getContacts());
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setIsFormOpen(true);
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleDeleteContact = (contactId: string) => {
    removeContact(contactId);
    refreshContacts();
  };

  const handleSaveContact = (contactData: Omit<EmergencyContact, 'id'> | EmergencyContact) => {
    if ('id' in contactData && contactData.id) {
      saveUpdatedContact(contactData as EmergencyContact);
    } else {
      saveNewContact(contactData as Omit<EmergencyContact, 'id'>);
    }
    refreshContacts();
    setIsFormOpen(false);
    setEditingContact(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Contacts</h1>
          <p className="text-muted-foreground">Manage the people who will be notified in an emergency.</p>
        </div>
        <Button onClick={handleAddContact} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Contact
        </Button>
      </div>

      {contacts.length === 0 ? (
        <Card className="text-center py-10">
          <CardHeader>
            <div className="mx-auto bg-secondary p-3 rounded-full w-fit">
              <Users className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="mt-4">No Contacts Yet</CardTitle>
            <CardDescription>Add emergency contacts to ensure someone is notified if you send an SOS.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleAddContact}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add Your First Contact
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ContactList
          contacts={contacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />
      )}

      <ContactFormDialog
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSaveContact}
        contact={editingContact}
      />
    </div>
  );
}
