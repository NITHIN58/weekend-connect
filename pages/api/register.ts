// POST /api/register - Register for an event

import { getFirestore, doc, setDoc, collection, getDocs, query, where } from 'firebase/firestore';

const db = getFirestore();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { eventId, name, email } = req.body;

      if (!eventId || !name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const registrationRef = doc(db, 'registrations', `${eventId}-${email}`);
      await setDoc(registrationRef, {
        eventId: parseInt(eventId),
        name,
        email,
        createdAt: new Date(),
      });
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error creating registration:', error);
      res.status(500).json({ error: error.message || 'Failed to create registration' });
    }
  } else if (req.method === 'GET') {
    try {
      const { eventId } = req.query;
      if (!eventId) {
        return res.status(400).json({ error: 'Missing required eventId' });
      }

      const registrationsRef = collection(db, 'registrations');
      const registrationsSnapshot = await getDocs(query(registrationsRef, where('eventId', '==', eventId)));
      res.status(200).json({ count: registrationsSnapshot.size });
    } catch (error) {
      console.error('Error fetching registrations count:', error);
      res.status(500).json({ error: error.message || 'Failed to fetch registrations count' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

